from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes, api_view
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.encoding import smart_str, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

# Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# for user authentication
class UserAuthView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        action = request.query_params.get("action")
        
        if action == "login":
            serializer = UserLoginSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                email = serializer.data.get('email')
                password = serializer.data.get('password')
                user = authenticate(email=email, password=password)
                if user is not None:
                    if not user.is_verified:
                        return Response({"error": "Email not verified. Please check your email for verification link."}, status=status.HTTP_401_UNAUTHORIZED)
                    
                    token = get_tokens_for_user(user)
                    # Store user data in token response
                    user_data = UserProfileViewSerializer(user).data
                    return Response({"token": token, "user": user_data, "message": "User login successful"}, status=status.HTTP_200_OK)
                else:
                    return Response({"errors": {"non_field_errors":["Invalid credentials"]}}, status=status.HTTP_404_NOT_FOUND)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif action == "register-verify-email":
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                user.is_verified = False
                user.save()
                
                # Generate verification token
                uid = urlsafe_base64_encode(force_bytes(user.id))
                token = PasswordResetTokenGenerator().make_token(user)
                
                # Create verification link - Fix the URL format
                domain = request.get_host()
                api_url = "https://centralised.sarc-iitb.org" if domain.startswith("centralised") else f"http://{domain}"

                # Make the link point directly to the API endpoint
                verification_link = f"{api_url}/api/auth/verify/{uid}/{token}/"

                # Print the link for debugging
                print(f"DEBUG - Generated verification link: {verification_link}")
                
                # Send verification email
                html_content = Util.get_verification_email_html(user.name, verification_link)
                Util.send_email(
                    to_email=user.email,
                    subject="Verify Your Email - SARC IIT Bombay",
                    html_content=html_content
                )
                
                return Response({"message": "Registration successful. Please check your email to verify your account."}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

# for password change and password reset and sending password reset email
class UserPasswordView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, uid=None, token=None, format=None):
        action = request.query_params.get("action")

        if action == "change":
            # Require authentication for password change
            if not request.user.is_authenticated:
                return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

            serializer = UserChangePasswordSerializer(data=request.data, context={"user": request.user})
            if serializer.is_valid(raise_exception=True):
                return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)

        elif action == "reset-password-email":
            email = request.data.get('email')
            if not email:
                return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                user = User.objects.get(email=email)
                
                # Generate password reset token
                uid = urlsafe_base64_encode(force_bytes(user.id))
                token = PasswordResetTokenGenerator().make_token(user)
                
                # Create reset link
                domain = request.get_host()
                reset_link = f"https://{domain}/reset-password/{uid}/{token}"
                
                # Send password reset email
                html_content = Util.get_password_reset_email_html(user.name, reset_link)
                Util.send_email(
                    to_email=user.email,
                    subject="Reset Your Password - SARC IIT Bombay",
                    html_content=html_content
                )
                
                return Response({"message": "Password reset email sent successfully. Please check your email."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                print(f"Password reset email error: {e}")
                return Response({"error": "Failed to send password reset email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        elif uid and token:
            # Handle password reset with token
            try:
                id = smart_str(urlsafe_base64_decode(uid))
                user = User.objects.get(id=id)
                
                if not PasswordResetTokenGenerator().check_token(user, token):
                    return Response({"error": "Token is invalid or expired"}, status=status.HTTP_400_BAD_REQUEST)
                
                password = request.data.get('password')
                if not password:
                    return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)
                
                user.set_password(password)
                user.save()
                
                return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"Password reset error: {e}")
                return Response({"error": "Invalid password reset link"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

# to get the profile of the user
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileViewSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Register user via API
class RegisterUserAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if User.objects.filter(email=data['email']).exists():
            return Response({"error": "User already exists"}, status=400)

        user = User.objects.create_user(
            email=data['email'],
            name=data['name'],
            phone_number=data.get('phone_number'),
            roll_number=data.get('roll_number'),
            hostel_number=data.get('hostel_number'),
            password=data['password']
        )
        return Response({"message": "User registered successfully"}, status=201)

# Create a VerifyEmailView class
class VerifyEmailView(APIView):
    def get(self, request, uid, token, format=None):
        try:
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            
            if not PasswordResetTokenGenerator().check_token(user, token):
                # Redirect to frontend with error
                return redirect('https://centralised.sarc-iitb.org/login?verification=failed')
            
            user.is_verified = True
            user.save()
            
            # Redirect to frontend with success
            return redirect('https://centralised.sarc-iitb.org/login?verified=true')
        except Exception as e:
            print(f"Email verification error: {e}")
            # Redirect to frontend with error
            return redirect('https://centralised.sarc-iitb.org/login?verification=failed')

# Add this new view class
class ResendVerificationView(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = User.objects.get(email=email)
            
            if user.is_verified:
                return Response({"error": "Email is already verified"}, status=status.HTTP_400_BAD_REQUEST)
                
            # Generate verification token
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            
            # Create verification link
            domain = request.get_host()
            api_url = "https://centralised.sarc-iitb.org" if domain.startswith("centralised") else f"http://{domain}"

            # Make the link point directly to the API endpoint
            verification_link = f"{api_url}/api/auth/verify/{uid}/{token}/"

            # Print the link for debugging
            print(f"DEBUG - Generated verification link: {verification_link}")
            
            # Send verification email
            html_content = Util.get_verification_email_html(user.name, verification_link)
            Util.send_email(
                to_email=user.email,
                subject="Verify Your Email - SARC IIT Bombay",
                html_content=html_content
            )
            
            return Response({"message": "Verification email sent successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Resend verification error: {e}")
            return Response({"error": "Failed to send verification email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Add this debug view to help diagnose verification issues
class DebugVerifyView(APIView):
    def get(self, request, uid, token, format=None):
        try:
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            
            is_valid = PasswordResetTokenGenerator().check_token(user, token)
            
            return Response({
                "uid": uid,
                "token": token,
                "user_id": id,
                "user_email": user.email,
                "is_verified": user.is_verified,
                "token_valid": is_valid
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": str(e),
                "uid": uid,
                "token": token
            }, status=status.HTTP_400_BAD_REQUEST)
