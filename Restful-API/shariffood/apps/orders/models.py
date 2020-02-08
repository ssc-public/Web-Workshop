from ..foods.models import Foods

from django.db import models

ORDER_STATUS = (
    (1, 'پرداخت نشده'),
    (2, 'پرداخت شده'),
    (3, 'آماده ارسال'),
    (4, 'ارسال شده')
)


class Orders(models.Model):
    foods = models.ManyToManyField(Foods)
    owner = models.ForeignKey('users.Profile', related_name='orders', on_delete=models.CASCADE)
    status = models.IntegerField(default=1, choices=ORDER_STATUS)
    date = models.DateTimeField(auto_now=True)
