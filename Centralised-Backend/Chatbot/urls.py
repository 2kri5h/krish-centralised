from django.urls import path
from .views import ChatbotMessageView  # Import the new view

urlpatterns = [
    path('chatbot/', ChatbotMessageView.as_view(), name='chatbot-message'),
]