from django.urls import path
from .views import RegisterView, LoginView, home_view, logout_view

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),  # Ensure this path is defined
    path('home/', home_view, name='home'),
    path('logout/', logout_view, name='logout'),
]
