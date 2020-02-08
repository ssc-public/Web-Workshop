from django.contrib.auth.models import User
import secrets
from .models import ForgotPasswordToken
from .serializers import ForgotPasswordSerializer
from django.utils import timezone
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.response import Response
from .service import send_email


class ForgotPasswordView(GenericAPIView):
    serializer_class = ForgotPasswordSerializer

    def post(self, request):
        data = self.get_serializer(request.data).data
        user = get_object_or_404(User, email=data['email'])
        uid = urlsafe_base64_encode(force_bytes(user.id))
        ForgotPasswordToken.objects.filter(uid=uid).delete()
        reset_password_token = ForgotPasswordToken(
            uid=uid,
            token=secrets.token_urlsafe(32),
            expiration_date=timezone.now() + timezone.timedelta(hours=24),
        )
        email = send_email.SendEmail(reset_password_token, user)
        email.send_email()
        reset_password_token.save()
        return Response({'detail': 'Successfully Sent Reset Password Email'}, status=200)


