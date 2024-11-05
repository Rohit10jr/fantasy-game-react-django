from django.urls import path
from .views import RegisterView, LoginView, home_view, logout_view, VerifyOTPView, forgot_password, VerifyForgotPasswordOTPView,SendPasswordResetLinkView, help
from .views import *
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),  # Ensure this path is defined
    path('home/', home_view, name='home'),
    path('logout/', logout_view, name='logout'),

    path('verify/', VerifyOTPView.as_view(), name='verify_otp'),
    path('forgotverify/', VerifyForgotPasswordOTPView.as_view(), name='verify_otp'),

    path('forgot/', forgot_password, name='forgot-password'),
    path('help/', help, name='help'),

    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('send-reset-password-link/', SendPasswordResetLinkView.as_view(), name='send_reset_password_link'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'), 


    path('tokens/create/', TokenCreateView.as_view(), name='token-create'),
    path('tokens/', UserTokenListView.as_view(), name='token-list'),
    path('tokens/<int:pk>/', TokenDetailView.as_view(), name='token-detail'),

    # path('verify/', verify_otp, name='verify_otp')
]
