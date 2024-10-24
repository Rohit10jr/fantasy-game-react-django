import pyotp
from django.core.mail import send_mail

def generate_otp():
    totp = pyotp.TOTP(pyotp.random_base32(), interval=300)
    return totp.now()

def send_otp_email(email, otp):
    send_mail(
        'Verify your email',
        f'Your OTP code is: {otp}',
        'rohit.devmind@gmail.com',  # Replace with your sender email
        [email],
        fail_silently=False,
    )
