from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.core.cache import cache
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from urllib.request import Request, urlopen
from urllib.error import URLError
from datetime import date, timedelta
import json

SARC_EVENTS_URL = (
    'https://gymkhana.iitb.ac.in/instiapp/api/bodies/'
    'c3bce065-ce18-4967-9c16-6fd259eb4814/events'
)
SARC_CALENDAR_URL = 'https://gymkhana.iitb.ac.in/instiapp//org/sarc'
# The published dates for this entry conflict with the dates in its description.
CONFLICTING_EVENT_ID = 'mock-interview--group-discussion-0aa74bb4'


def next_sarc_events(events, now):
    upcoming = []
    for event in events:
        start = parse_datetime(event.get('start_time') or '')
        end = parse_datetime(event.get('end_time') or '')
        if not start or not end:
            continue
        if (
            event.get('str_id') == CONFLICTING_EVENT_ID
            and end.date() <= date(2026, 10, 25)
        ):
            continue
        if timezone.is_naive(start):
            start = timezone.make_aware(start)
        if timezone.is_naive(end):
            end = timezone.make_aware(end)
        if end < now or end - start > timedelta(days=7):
            continue
        venues = event.get('venues') or []
        upcoming.append({
            'name': str(event.get('name') or '').strip(),
            'start_time': start.isoformat(),
            'end_time': end.isoformat(),
            'venue': venues[0].get('name', '') if venues else '',
            'url': (
                'https://gymkhana.iitb.ac.in/instiapp//event/'
                + event['str_id']
            ) if event.get('str_id') else SARC_CALENDAR_URL,
        })
    return sorted(upcoming, key=lambda event: event['start_time'])[:3]


class SarcUpcomingEventsView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        cached = cache.get('sarc_upcoming_events')
        if cached is not None:
            return Response(cached)
        try:
            source = Request(SARC_EVENTS_URL, headers={'User-Agent': 'SARC-Website/1.0'})
            with urlopen(source, timeout=5) as response:
                source_events = json.load(response)
            if not isinstance(source_events, list):
                raise ValueError('Unexpected InstiApp event response')
            payload = {
                'events': next_sarc_events(source_events, timezone.now()),
                'source': SARC_CALENDAR_URL,
            }
            cache.set('sarc_upcoming_events', payload, 15 * 60)
            return Response(payload)
        except (URLError, TimeoutError, ValueError, json.JSONDecodeError):
            return Response(
                {'events': [], 'source': SARC_CALENDAR_URL},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

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
