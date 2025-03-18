from django.contrib import admin
from django.urls import path, include
from oauth2_provider import urls as oauth2_urls
from oauth2_provider.views import TokenView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chatbot/', include('Chatbot.urls')),
    path('api/auth/', include('Authentication.urls')),

    path('o/', include(oauth2_urls)),
    path('o/token/', TokenView.as_view(), name="token"),
]