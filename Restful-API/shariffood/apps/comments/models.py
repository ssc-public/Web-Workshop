from django.db import models
from apps.users.models import Profile
from apps.orders.models import Orders


class Comments(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE, default=0)
    date = models.DateTimeField(auto_now=False)
    message = models.TextField(blank=False)