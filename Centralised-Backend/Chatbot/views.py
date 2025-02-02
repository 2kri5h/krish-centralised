from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ChatbotMessageView(APIView):
    def get(self, request):
        # Example response data
        response_data = {
            "message": "Hello from the Chatbot!",
            "status": "success",
            "data": {
                "event": "Alumni Meet",
                "date": "2025-08-15",
                "location": "IIT Bombay"
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)