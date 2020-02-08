from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
import secrets
from .models import ForgotPasswordToken, Profile
from .serializers import ForgotPasswordSerializer, ChangePasswordSerializer, UserSerializer
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


class SignUpView(GenericAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            activate_user_token = ActivateUserToken(
                token=secrets.token_urlsafe(32),
                eid=urlsafe_base64_encode(force_bytes(serializer.validated_data['email'])),
            )
            activate_user_token.save()

            context = {
                'domain': 'shariffood',
                'eid': activate_user_token.eid,
                'token': activate_user_token.token,
            }
            email_html_message = render_to_string('accounts/email/user_activate_email.html', context)
            email_plaintext_message = render_to_string('accounts/email/user_activate_email.txt', context)
            msg = EmailMultiAlternatives(
                _("Activate Account for {title}".format(title="AI Challenge")),
                email_plaintext_message,
                "sharif.aichallenge@gmail.com",
                [serializer.validated_data['email']]
            )
            msg.attach_alternative(email_html_message, "text/html")
            try:
                msg.send()

                serializer.save()
                serializer.instance.is_active = False
                serializer.instance.save()
            except Exception as e:
                print(e)
                print(serializer.validated_data['email'])
                return Response({'detail': _('Invalid email or user has not been saved.')}, status=406)

            return Response({'detail': _('User created successfully. Check your email for confirmation link')},
                            status=200)
        else:
            return Response({'error': _('Error occurred during User creation')}, status=500)
