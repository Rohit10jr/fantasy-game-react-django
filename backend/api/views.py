from django.http import Http404
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import CustomUser,PurchaseToken
from .serializers import RegisterSerializer, LoginSerializer, TokenSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.mail import send_mail
from .utils import generate_otp, send_otp_email
import pyotp
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
import pyotp
from rest_framework.decorators import api_view,permission_classes
from rest_framework.exceptions import ValidationError
from django.utils import timezone
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes


# rohit@mail.com 1234, ro@mail.com 1234ro@mail.com

# ace1@gmail.com51119

# Register and Login Class View when using templates 
'''
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    template_name = 'register.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.POST)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            login(request, user)  # Log the user in after registration
            return redirect('home')  # Redirect to the home page after registration
        return render(request, self.template_name, {'form': serializer})

class LoginView(APIView):
    permission_classes = [AllowAny]
    template_name = 'login.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.POST)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)  # Log the user in
            return redirect('home')  # Redirect to the home page after login
        return render(request, self.template_name, {'form': serializer})

'''

# Register and Login Class View for the React picks and prizes API  
# '''
# class RegisterView(generics.CreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = RegisterSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         token = Token.objects.create(user=user)
#         return Response({
#             'user': RegisterSerializer(user).data,
#             'token': token.key
#         }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print("in")
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': {
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            },
            'token': token.key
        }, status=status.HTTP_200_OK)
    

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # user = serializer.save(is_active=False)
        user = serializer.save()

        otp = user.set_otp()

        # totp = pyotp.TOTP(pyotp.random_base32(), interval=300)
        # print('totp',str(totp.now()))

        # # Generate the OTP
        # otp = str(totp.now())[-4:]
        # print('otp',otp)
        # Send OTP via email
        send_mail(
            'Verify your email',
            f'Your OTP code is: {otp}',
            'your email id', 
            [user.email],
            fail_silently=False,
        )

        # Store OTP in the session 
        # request.session['otp'] = otp 
        # request.session['user_email'] = user.email  

        return Response({
        'message': 'User registered successfully. Please verify your email with the OTP sent.',
        'otp': otp,  
    }, status=status.HTTP_201_CREATED)



class VerifyOTPView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({'error': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)

            if user.is_active:
                return Response({'message': 'User already verified.'}, status=status.HTTP_400_BAD_REQUEST)
            
            if user.verify_otp(otp):
                # OTP is correct, activate the user
                user.is_active = True  
                user.otp = None
                user.otp_expiration = None
                user.otp_secret = None
                user.save()

                return Response({'message': 'OTP verified successfully. User activated.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)

        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)


class VerifyForgotPasswordOTPView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({'error': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)

            # Verify the OTP without activating the user
            if user.verify_otp(otp):
                # OTP is correct, proceed with password reset
                # For security, don't expose the email in the response
                return Response({'message': 'OTP verified successfully. You can now reset your password.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)

        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        

class SendPasswordResetLinkView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')

        try:
            user = CustomUser.objects.get(email=email)

            # Generate password reset token and URL
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Build the password reset link (assuming frontend route for password reset)
            reset_link = f"{request.build_absolute_uri(reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token}))}"
            
            # Send email with the reset link
            send_mail(
                'Password Reset Link',
                f'Click the link to reset your password: {reset_link}',
                'noreply@yourdomain.com',
                [user.email],
                fail_silently=False,
            )

            return Response({'message': 'Password reset link sent. Check your email.'}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = request.data.get('email')

    try:
        # Check if the user with the given email exists
        user = CustomUser.objects.get(email=email)

        # Generate and store the OTP in the user model
        otp = user.set_otp()  
        
        send_mail(
            'Forgot Password OTP',
            f'Your OTP code for password reset is: {otp}',
            'rohit.devmind@gmail.com',
            [user.email],
            fail_silently=False,
        )

        # Respond to the frontend
        return Response({'message': 'OTP has been sent to your email.'}, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)




@api_view(['POST'])
@permission_classes([AllowAny])
def help(request):
    # Retrieve email, title, and message from the request data
    email = request.data.get('email')
    title = request.data.get('issue')
    message = request.data.get('description')

    if not email or not title or not message:
        return Response({"error": "Email, title, and message fields are required."}, status=400)

    # Send email to the support team
    try:
        send_mail(
            subject=title,
            message=message,
            from_email='rohit.devmind@gmail.com',
            recipient_list=[email], 
            fail_silently=False,
        )
        return Response({"success": "Help request sent successfully."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)



# token purchase CRUD
class TokenCreateView(generics.CreateAPIView):
    queryset = PurchaseToken.objects.all()
    serializer_class = TokenSerializer
    permission_classes = [IsAuthenticated]


class UserTokenListView(generics.ListAPIView):
    serializer_class = TokenSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # return super().get_queryset()
        # data = PurchaseToken.objects.filter(user=self.request.user)
        # print(data)
        return PurchaseToken.objects.filter(user=self.request.user)
    

class TokenDetailView(generics.RetrieveUpdateDestroyAPIView):
    # queryset = PurchaseToken.objects.all()
    serializer_class = TokenSerializer
    permission_classes =  [IsAuthenticated]

    # def get_queryset(self):
    #     queryset = PurchaseToken.objects.filter(user=self.request.user)
    #     return PurchaseToken.objects.filter(user=self.request.user)

    def get_object(self):
        queryset = PurchaseToken.objects.filter(user=self.request.user)
        token = queryset.first()
        if token is None:
            raise Http404("No token found for this user.")
        return token











# @api_view(['POST'])
# def verify_otp(request):
#     email = request.data.get('email')
#     otp = request.data.get('otp')

#     try:       
#         user = User.objects.get(email=email)

#         totp = pyotp.TOTP(user.otp_secret, interval=300)  # same secret used when sending OTP

#         if totp.verify(otp):
#             user.is_active = True  
#             user.save()
#             return Response({'message': 'OTP verified successfully. Email verified.'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'message': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

#     except User.DoesNotExist:
#         return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)























# using utils


# class RegisterView(generics.CreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = RegisterSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
        
#         user = serializer.save(is_active=False)  # Create inactive user
#         otp = generate_otp()  # Generate OTP
#         send_otp_email(user.email, otp)  # Send OTP via email
        
#         request.session['otp'] = otp  # Store OTP in session
#         request.session['user_email'] = user.email

#         return Response({
#             'message': 'User registered successfully. Please verify your email with the OTP sent.'
#         }, status=status.HTTP_201_CREATED)


# class VerifyOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         otp_input = request.data.get('otp')
#         user_email = request.session.get('user_email')

#         if not otp_input or not user_email:
#             return Response({'error': 'OTP and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

#         # Retrieve OTP from session
#         saved_otp = request.session.get('otp')

#         if otp_input == saved_otp:
#             # Activate the user
#             user = CustomUser.objects.get(email=user_email)
#             user.is_active = True
#             user.save()

#             # Optionally, create a token for the user
#             token = Token.objects.create(user=user)

#             # Clean up session
#             del request.session['otp']
#             del request.session['user_email']

#             return Response({
#                 'message': 'OTP verified successfully. Your account is now active.',
#                 'token': token.key
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)



# '''

@login_required
def home_view(request):
    return render(request, 'home.html')

def logout_view(request):
    logout(request)
    return redirect('login')
