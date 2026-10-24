from datetime import timedelta

from django.test import SimpleTestCase
from django.utils import timezone

from .views import next_sarc_events


class SarcEventSelectionTests(SimpleTestCase):
    def test_returns_three_nearest_unfinished_events(self):
        now = timezone.now()

        def event(name, start, end, slug):
            return {
                'name': name,
                'start_time': start.isoformat(),
                'end_time': end.isoformat(),
                'str_id': slug,
                'venues': [{'name': 'Lecture Hall Complex'}],
            }

        source = [
            event('Later', now + timedelta(days=8), now + timedelta(days=8, hours=2), 'later'),
            event('Ended', now - timedelta(days=2), now - timedelta(days=1), 'ended'),
            event('Yearlong program', now - timedelta(days=90), now + timedelta(days=90), 'yearlong'),
            event('Third', now + timedelta(days=3), now + timedelta(days=3, hours=2), 'third'),
            event('First', now + timedelta(hours=1), now + timedelta(hours=3), 'first'),
            event('Second', now + timedelta(days=1), now + timedelta(days=1, hours=2), 'second'),
        ]

        selected = next_sarc_events(source, now)

        self.assertEqual([item['name'] for item in selected], ['First', 'Second', 'Third'])
        self.assertEqual(selected[0]['venue'], 'Lecture Hall Complex')
