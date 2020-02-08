from django.db import models
from ..restaurants.models import Restaurants


class Foods(models.Model):
    CATEGORIES = (
        (0, 'ایرانی'),
        (1, 'فست‌فود'),
        (2, 'نوشیدنی'),
        (3, 'پیش‌غذا')
    )
    name = models.CharField(max_length=50)
    restaurant = models.ForeignKey(Restaurants, related_name='foods', on_delete=models.CASCADE)
    category = models.IntegerField(max_length=1, choices=CATEGORIES, default=0)
