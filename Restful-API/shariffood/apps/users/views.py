from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
import secrets
from .models import ForgotPasswordToken
from .serializers import ForgotPasswordSerializer, ChangePasswordSerializer
from django.utils import timezone
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.response import Response
from .service import send_email
from rest_framework import permissions, status


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


class ChangePassword(GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.data
        if not request.user.check_password(data['password']):
            return Response(data={'errors': 'incorrect current password'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        request.user.password = make_password(data['new_password'])
        request.user.save()
        return Response(data={'detail': 'password changed successfully'}, status=status.HTTP_200_OK)
