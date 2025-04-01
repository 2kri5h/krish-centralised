from django.urls import path
from .views import (
    UserAuthView, UserProfileView, UserPasswordView, VerifyEmailView, ResendVerificationView, DebugVerifyView
)

"""
Use this commented url code with the commented views.py code. This is the previous code I had written when there were different functions for each of the functionality.
"""
# urlpatterns = [
#     path('register/', UserRegistrationView.as_view(), name='register'),
#     path('login/', UserLoginView.as_view(), name='login'),
#     path('profile/', UserProfileView.as_view(), name='profile'),
#     path('change-password/', UserChangePasswordView.as_view(), name='change-password'),
#     path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
#     path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='password-reset'),
# ]

urlpatterns = [
    path('', UserAuthView.as_view(), name='auth'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('password/', UserPasswordView.as_view(), name='password-change'),
    path('password/<uid>/<token>/', UserPasswordView.as_view(), name='password-reset'),
    path('verify/<uid>/<token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('resend-verification/', ResendVerificationView.as_view(), name='resend-verification'),
    # Add a debug route to help diagnose issues
    path('debug-verify/<uid>/<token>/', DebugVerifyView.as_view(), name='debug-verify'),
]