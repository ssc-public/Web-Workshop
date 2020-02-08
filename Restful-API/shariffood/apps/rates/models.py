from ..users.models import Profile
from ..restaurants.models import Restaurants
from django.db import models

RATING_CHOICES = zip(range(1, 6), range(1, 6))


class Ratings(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    score = models.IntegerField(default=3, choices=RATING_CHOICES)
