from django.urls import path
from .views import UserAuthView, UserPasswordResetView, UserChangePasswordView, UserProfileView

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
    path('auth/', UserAuthView.as_view(), name='auth'),
    path("register-verify/<uid>/<token>/", UserAuthView.as_view(), name="auth-verification"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("password/", UserPasswordView.as_view(), name="password"),
    path("password/<uid>/<token>/", UserPasswordView.as_view(), name="password-reset"),

    # API to allow ASMP to register users
    path("register/", RegisterUserAPI.as_view(), name="register-user"),
]