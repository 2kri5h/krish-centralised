from django.urls import path
from .views import APIRootView, HealthCheckView, SarcUpcomingEventsView

urlpatterns = [
    path('', APIRootView.as_view(), name='api-root'),
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('sarc-events/', SarcUpcomingEventsView.as_view(), name='sarc-events'),
] 
