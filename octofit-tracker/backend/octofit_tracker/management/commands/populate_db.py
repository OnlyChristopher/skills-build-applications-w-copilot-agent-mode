from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        marvel = Team.objects.create(name='marvel')
        dc = Team.objects.create(name='dc')

        users = [
            User.objects.create(email='ironman@marvel.com', name='Iron Man', team='marvel'),
            User.objects.create(email='spiderman@marvel.com', name='Spider-Man', team='marvel'),
            User.objects.create(email='batman@dc.com', name='Batman', team='dc'),
            User.objects.create(email='wonderwoman@dc.com', name='Wonder Woman', team='dc'),
        ]

        Activity.objects.create(user='Iron Man', activity_type='run', duration=30, date='2026-02-17')
        Activity.objects.create(user='Spider-Man', activity_type='cycle', duration=45, date='2026-02-17')
        Activity.objects.create(user='Batman', activity_type='swim', duration=25, date='2026-02-17')
        Activity.objects.create(user='Wonder Woman', activity_type='yoga', duration=60, date='2026-02-17')

        Leaderboard.objects.create(team='marvel', points=75)
        Leaderboard.objects.create(team='dc', points=85)

        Workout.objects.create(name='Pushups', description='Do pushups', difficulty='easy')
        Workout.objects.create(name='Squats', description='Do squats', difficulty='medium')
        Workout.objects.create(name='Plank', description='Hold plank', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
