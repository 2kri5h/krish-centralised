from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class APIRootView(APIView):
    def get(self, request):
        return Response({
            "message": "Welcome to the SARC API",
            "version": "1.0.0",
            "endpoints": {
                "auth": "/api/auth/",
                "health": "/api/health/"
            }
        })

class HealthCheckView(APIView):
    def get(self, request):
        return Response({
            "status": "healthy",
            "message": "API is running correctly"
        }) 