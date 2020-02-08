from django.contrib.postgres.fields import ArrayField
# from django.contrib.auth.models import User
from ..users.models import Profile
from django.db import models


class Restaurants(models.Model):
    owner = models.OneToOneField(Profile, on_delete=models.CASCADE, null=False, default=0)
    name = models.CharField(max_length=50, blank=False)
    address = models.CharField(max_length=200, blank=False)
    image = models.ImageField(upload_to='static/restaurant')
    description = models.TextField(blank=False)
    delivery_price = models.IntegerField(default=0)
    working_hours = ArrayField(
        models.CharField(max_length=10),
        verbose_name='Working Hour',
    )
