from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


class SendEmail:
    def __init__(self, reset_password, user):
        self.reset_password = reset_password
        self.user = user

    def send_email(self):
        context = {
            'domain': 'http://shariffood.ir',
            'username': self.user.username,
            'uid': self.reset_password.uid,
            'token': self.reset_password.token,
        }
        email_html_message = render_to_string(
            '/home/rez/PycharmProjects/web_workshop/Restful-API/shariffood/apps/users/service/forget_password.html',
            context)
        email_plaintext_message = render_to_string(
            '/home/rez/PycharmProjects/web_workshop/Restful-API/shariffood/apps/users/service/forget_password.txt',
            context)

        message = EmailMultiAlternatives(
            "Password Reset for {title}".format(title="Sharif Food"),
            email_plaintext_message,
            "shariffood@gmail.com",
            [self.user.email]
        )
        message.attach_alternative(email_html_message, "text/html")
        message.send()
