from django.urls import path
from .views import RegisterView, LoginView, home_view, logout_view, VerifyOTPView, forgot_password, VerifyForgotPasswordOTPView,SendPasswordResetLinkView
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),  # Ensure this path is defined
    path('home/', home_view, name='home'),
    path('logout/', logout_view, name='logout'),

    path('verify/', VerifyOTPView.as_view(), name='verify_otp'),
    path('forgotverify/', VerifyForgotPasswordOTPView.as_view(), name='verify_otp'),

    path('forgot/', forgot_password, name='forgot-password'),

    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('send-reset-password-link/', SendPasswordResetLinkView.as_view(), name='send_reset_password_link'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),  # Add this line

    # path('verify/', verify_otp, name='verify_otp')
]
