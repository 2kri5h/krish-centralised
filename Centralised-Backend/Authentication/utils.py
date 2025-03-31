from django.core.mail import EmailMessage
import os
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class Util:
    @staticmethod
    def send_email(data):
        try:
            email = EmailMessage(
                subject=data['subject'], 
                body=data['body'], 
                from_email=os.environ.get('EMAIL_FROM', 'noreply@sarc-iitb.org'),
                to=[data['to_email']]
            )
            if data.get('html_content'):
                email.content_subtype = "html"
            email.send()
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
            
    @staticmethod
    def send_verification_email(user, uid, token, domain="centralised.sarc-iitb.org"):
        verification_link = f"http://{domain}/verify/{uid}/{token}"
        
        context = {
            'user': user,
            'verification_link': verification_link,
            'domain': domain
        }
        
        html_message = render_to_string('email/verification_email.html', context)
        plain_message = strip_tags(html_message)
        
        data = {
            'subject': 'Verify Your Email - SARC IIT Bombay',
            'body': plain_message,
            'html_content': html_message,
            'to_email': user.email
        }
        
        return Util.send_email(data)
        
    @staticmethod
    def send_password_reset_email(user, uid, token, domain="centralised.sarc-iitb.org"):
        reset_link = f"http://{domain}/api/auth/password/{uid}/{token}/"
        
        context = {
            'user': user,
            'reset_link': reset_link,
            'domain': domain
        }
        
        html_message = render_to_string('email/password_reset_email.html', context)
        plain_message = strip_tags(html_message)
        
        data = {
            'subject': 'Reset Your Password - SARC IIT Bombay',
            'body': plain_message,
            'html_content': html_message,
            'to_email': user.email
        }
        
        return Util.send_email(data)