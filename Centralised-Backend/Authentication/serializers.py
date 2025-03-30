from rest_framework import serializers
from .models import User
from xml.dom import ValidationErr
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password

# this was the earlier serializer I made where the authentication was just by using tokens. In the new version, I am using token verification using email
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'phone_number', 'roll_number', 'hostel_number']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'name': {'required': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        if not password:
            raise serializers.ValidationError({"password": "Password is required"})
        return attrs
    
    def create(self, validated_data):
        # Create the user
        try:
            user = User.objects.create_user(
                email=validated_data['email'],
                name=validated_data.get('name', ''),
                password=validated_data['password'],
                phone_number=validated_data.get('phone_number', ''),
                roll_number=validated_data.get('roll_number', ''),
                hostel_number=validated_data.get('hostel_number', '')
            )
            return user
        except Exception as e:
            raise serializers.ValidationError(str(e))

class SendRegisterVerifyEmailSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'name', 'phone_number', 'roll_number', 'hostel_number', 'password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError({"password": "Password and Confirm Password do not match"})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        validated_data["is_verified"] = False  # Ensure user is unverified initially
        user = User.objects.create_user(**validated_data)  # create_user() se password hash hokar save hota hai
        return user
        
class UserRegisterEmailSerializer(serializers.Serializer):
    def validate(self, attrs):
        try:
            uid = self.context.get('uid')
            token = self.context.get('token')   

            id = smart_str(urlsafe_base64_decode(uid))

            # we get the user object from the database using the decoded id
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr('Token is not Valid or Expired')
            
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationErr('Token is not Valid or Expired')

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password', 'is_verified']

class VerifiedUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is not exposed

    class Meta:
        model = User
        fields = ['email', 'name', 'phone_number', 'roll_number', 'hostel_number', 'password']

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        validated_data["is_verified"] = True
        return User.objects.create(**validated_data)

class UserProfileViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone_number', 'roll_number', 'hostel_number']

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        user.set_password(password)
        user.save()
        return attrs
    
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id)) # user id ko encode kar rha hai for security
            print("Encoded UID: ", uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print("Password Reset Token: ", token)
            # absolute url
            link = 'http://localhost:3000/api/auth/password/' + uid + '/' + token
            print("Password Reset Link: ", link)
            # send email
            data = {
                'subject': 'Reset Your Password',
                'body': f'Click Following Link to Reset Your Password: {link}',
                'to_email': user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise ValidationErr("You are not a Registered User")
        
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError("Password and Confirm Password doesn't match")
            
            id = smart_str(urlsafe_base64_decode(uid)) # decoding the encoded id
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr('Token is not Valid or Expired')
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationErr('Token is not Valid or Expired')