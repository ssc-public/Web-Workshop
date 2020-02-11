from django.contrib.auth.models import User
# from jsonfield import JSONField
from django.db import models
from jsonfield import JSONField
import secrets
import binascii
from Crypto.Hash import SHA512


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


class TokenManager(models.Manager):
    TOKEN_CHARACTER_LENGTH = 64
    TOKEN_SALT_LENGTH = 16

    def hash_token(self, token, salt):
        hash_object = SHA512.new()
        hash_object.update(binascii.unhexlify(token))
        hash_object.update(binascii.unhexlify(salt))
        return hash_object.hexdigest()

    def create(self, user):
        full_token = secrets.token_hex(int(self.TOKEN_CHARACTER_LENGTH / 2))
        salt = secrets.token_hex(int(self.TOKEN_SALT_LENGTH / 2))
        digest = self.hash_token(full_token, salt)
        auth_token = super(TokenManager, self).create(
            digest=digest,
            key=self.get_key(full_token),
            salt=salt,
            user=user,
        )
        return auth_token, full_token


class Token(models.Model):
    user = models.ForeignKey(User, related_name='tokens', on_delete=models.CASCADE)
    digest = models.CharField(max_length=255)
    key = models.CharField(max_length=255, unique=True)
    salt = models.CharField(max_length=255, unique=True)

    objects = TokenManager()

    class Meta:
        verbose_name = 'token'
        verbose_name_plural = 'tokens'
        ordering = ['-created']
