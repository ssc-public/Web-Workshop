from django.contrib.auth.models import User
# from jsonfield import JSONField
from django.db import models
from jsonfield import JSONField


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    address = models.CharField(max_length=200, default="")
    is_activated = models.BooleanField(default=False, verbose_name="active")
    phone_no = models.CharField(max_length=10)
    credit = models.FloatField(default=0)
    cart = JSONField()

    def __str__(self):
        return self.user.username


class ForgotPasswordToken(models.Model):
    uid = models.CharField(max_length=100)
    token = models.CharField(max_length=100)
    expiration_date = models.DateTimeField()

class ActivateUserToken(models.Model):
    token = models.CharField(max_length=100)
    eid = models.CharField(max_length=100, null=True)

