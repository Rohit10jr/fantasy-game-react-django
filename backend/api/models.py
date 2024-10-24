from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import timedelta
import hashlib
import pyotp

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, mobile, password=None):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, mobile=mobile)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, mobile, password=None):
        user = self.create_user(email, first_name, last_name, mobile, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30)
    last_name = models.CharField(_('last name'), max_length=30)
    mobile = models.CharField(_('mobile number'), max_length=15, unique=True)
    # is_active = models.BooleanField(_('active'), default=True)
    is_active = models.BooleanField(_('active'), default=False)
    is_staff = models.BooleanField(_('staff status'), default=False)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)

    otp = models.CharField(max_length=255, null=True, blank=True)  
    otp_expiration = models.DateTimeField(null=True, blank=True)  
    otp_secret = models.CharField(max_length=32, null=True, blank=True)  

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'mobile']

    def set_otp(self):
        """Generate and store hashed OTP with expiration and a fixed secret."""
        if not self.otp_secret:
            # Generate a fixed secret if not already set
            self.otp_secret = pyotp.random_base32()

        # # Generate full OTP
        # totp = pyotp.TOTP(pyotp.random_base32(), interval=300)
        # otp = str(totp.now())  # Generate OTP

        # Define the interval (e.g., 5 minutes = 300 seconds)
        totp = pyotp.TOTP(self.otp_secret, interval=300)

        # Generate full OTP (but store only the hash)
        otp = str(totp.now())[-4:]  # Get the last 4 digits of the OTP for simplicity
        self.otp = hashlib.sha256(otp.encode()).hexdigest()

        
        self.otp_expiration = timezone.now() + timedelta(minutes=5)

   
        self.save()

        return otp  
    
    def verify_otp(self, input_otp):
        """Verify OTP by comparing with the hashed value."""
        if timezone.now() > self.otp_expiration:
            return False  # OTP has expired

        # Hash the input OTP and compare with the stored hash
        # input_otp_hashed = hashlib.sha256(input_otp.encode()).hexdigest()
        input_otp_hashed = hashlib.sha256(str(input_otp).encode()).hexdigest()
        return input_otp_hashed == self.otp

    def __str__(self):
        return self.email
