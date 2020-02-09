import secrets
import binascii
from django.utils.translation import ugettext_lazy as _
from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication

from .models import Token


class TokenAuth(TokenAuthentication):
    keyword = 'Bearer'

    def authenticate_credentials(self, token):
        stored_tokens = Token.objects.filter(key=Token.objects.get_key(token))
        if not stored_tokens.exists():
            raise exceptions.AuthenticationFailed('is not valid')

        if not stored_tokens.first().user.profile.is_activated:
            raise exceptions.AuthenticationFailed(_('This user is deactivated!'))

        for stored_token in stored_tokens.all():
            try:
                digest = Token.objects.hash_token(token, stored_token.salt)
            except (TypeError, binascii.Error):
                raise exceptions.AuthenticationFailed('is not valid')
            if secrets.compare_digest(digest, stored_token.digest):
                return stored_token.user, stored_token

        raise exceptions.AuthenticationFailed('is not valid')
