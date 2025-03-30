from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import datetime
from django.conf import settings

class APIRootView(APIView):
    """
    API root view that provides links to all available endpoints
    """
    def get(self, request, format=None):
        base_url = request.build_absolute_uri('/').rstrip('/')
        
        return Response({
            "authentication": {
                "login": f"{base_url}/api/auth/?action=login",
                "register": f"{base_url}/api/auth/?action=register-verify-email",
                "verify_registration": f"{base_url}/api/auth/register-verify/{{uid}}/{{token}}/",
                "password_reset": f"{base_url}/api/auth/password/?action=reset-password-email",
                "profile": f"{base_url}/api/auth/profile/",
            },
            "chatbot": {
                "message": f"{base_url}/api/chatbot/",
            },
            "oauth": {
                "token": f"{base_url}/o/token/",
            },
            "health": f"{base_url}/api/health/",
            "documentation": "API documentation will be available soon",
        })

class HealthCheckView(APIView):
    """
    Simple health check endpoint to verify the API is running
    """
    def get(self, request, format=None):
        return Response({
            "status": "healthy",
            "version": "1.0.0",
            "environment": "production" if not settings.DEBUG else "development",
            "timestamp": datetime.datetime.now().isoformat(),
        }, status=status.HTTP_200_OK) 