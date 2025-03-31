# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.views import APIView
# from .serializers import *
# from django.contrib.auth import authenticate
# from .renderers import UserRenderer
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.permissions import IsAuthenticated

# # Generate Token Manually
# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)
#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }

# class UserRegistrationView(APIView):
#     renderer_classes = [UserRenderer]
#     def post(self, request, format=None):
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.save()
#             token = get_tokens_for_user(user)
#             return Response({"token": token, "message": "User registered successfully"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class UserLoginView(APIView):
#     def post(self, request, format=None):
#         serializer = UserLoginSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             email = serializer.data.get('email')
#             password = serializer.data.get('password')
#             user = authenticate(email=email, password=password)
#             if user is not None:
#                 token = get_tokens_for_user(user)
#                 return Response({"token": token, "message": "User login successful"}, status=status.HTTP_200_OK)
#             else:
#                 return Response({"errors": {"non_field_errors":["Invalid credentials"]}}, status=status.HTTP_404_NOT_FOUND)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class UserProfileView(APIView):
#     renderer_classes = [UserRenderer]
#     permission_classes = [IsAuthenticated]
#     def get(self, request, format=None):
#         serializer = UserProfileViewSerializer(request.user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
# class UserChangePasswordView(APIView):
#     renderer_classes = [UserRenderer]
#     permission_classes = [IsAuthenticated]
#     def post(self, request, format=None):
#         serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
#         if serializer.is_valid(raise_exception=True):
#             return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class SendPasswordResetEmailView(APIView):
#     renderer_classes = [UserRenderer]
#     def post(self, request, format=None):
#         serializer = SendPasswordResetEmailSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             return Response({"message": "Password reset email sent successfully. Please check your webmail."}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class UserPasswordResetView(APIView):
#     renderer_classes = [UserRenderer]
#     def post(self, request, uid, token, format=None):
#         serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
#         if serializer.is_valid(raise_exception=True):
#             return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
























# in the above code, there was separate functions for each functionality. Now I have combined some of them into the same class.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import authenticate
from .utils import Util
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from oauth2_provider.models import AccessToken
from oauth2_provider.views import TokenView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

# Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# for login and registration
@method_decorator(csrf_exempt, name='dispatch')
class UserAuthView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]  # Allow anyone to register
    
    def post(self, request, uid=None, token=None, format=None):
        action = request.query_params.get("action")
        data = request.data
        
        print(f"Action: {action}")
        print(f"Request data: {data}")
        
        if action == "register":
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return Response({"success": True, "message": "User registered successfully"}, status=status.HTTP_201_CREATED)
            print(f"Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
        elif action == "login":
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
            serializer = SendRegisterVerifyEmailSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                # Send verification email
                uid = urlsafe_base64_encode(force_bytes(user.id))
                token = PasswordResetTokenGenerator().make_token(user)
                
                domain = request.get_host()
                Util.send_verification_email(user, uid, token, domain)
                
                return Response({"message": "Registration successful. Please check your email to verify your account."}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif action == "verify-email":
            # This is for the verification link
            try:
                id = smart_str(urlsafe_base64_decode(uid))
                user = User.objects.get(id=id)
                
                if not PasswordResetTokenGenerator().check_token(user, token):
                    return Response({"error": "Token is invalid or expired"}, status=status.HTTP_400_BAD_REQUEST)
                
                user.is_verified = True
                user.save()
                
                return Response({"message": "Email verified successfully. You can now login."}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": "Invalid verification link"}, status=status.HTTP_400_BAD_REQUEST)
        
        elif action == "oauth-login":
            access_token = request.data.get("access_token")
            if not access_token:
                return Response({"error": "Access token is required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                token = AccessToken.objects.get(token=access_token)
                user = token.user
                return Response({
                    "token": get_tokens_for_user(user),
                    "message": "OAuth login successful"
                }, status=status.HTTP_200_OK)
            except AccessToken.DoesNotExist:
                return Response({"error": "Invalid access token"}, status=status.HTTP_400_BAD_REQUEST)
            
        elif action == "asmp-verified":
            serializer = VerifiedUserSerializer(data=data)
            if serializer.is_valid():
                user = serializer.save()
                return Response({"message": "User successfully registered on Centralized Database"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, uid=None, token=None, format=None):
        # Handle email verification via GET request (when user clicks the link)
        if uid and token:
            try:
                id = smart_str(urlsafe_base64_decode(uid))
                user = User.objects.get(id=id)
                
                if not PasswordResetTokenGenerator().check_token(user, token):
                    return Response({"error": "Token is invalid or expired"}, status=status.HTTP_400_BAD_REQUEST)
                
                user.is_verified = True
                user.save()
                
                # Redirect to frontend verification success page
                return redirect(f"http://{request.get_host().split(':')[0]}:3000/login?verified=true")
            except Exception as e:
                return Response({"error": "Invalid verification link"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)


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
            username=data['name'],
            phone_number=data['phone_number'],
            roll_number=data['roll_number'],
            hostel_number=data['hostel_number'],
            password=data['password']
        )
        return Response({"message": "User registered successfully"}, status=201)

# OAuth Token View
class CustomTokenView(TokenView):
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

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
            serializer = SendPasswordResetEmailSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                return Response({"message": "Password reset email sent successfully. Please check your email."}, status=status.HTTP_200_OK)

        elif uid and token:
            # Handle password reset with token
            serializer = UserPasswordResetSerializer(data=request.data, context={"uid": uid, "token": token})
            if serializer.is_valid(raise_exception=True):
                return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
