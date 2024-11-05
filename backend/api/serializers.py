from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import CustomUser, PurchaseToken
from django.contrib.auth import get_user_model

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'mobile', 'email', 'password', 'confirm_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            mobile=validated_data['mobile'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # otp = user.set_otp()

        # send the OTP via email here if needed
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError({'detail': 'Invalid credentials'})

        attrs['user'] = user
        return attrs


# token serializer

User = get_user_model()

class TokenSerializer(serializers.ModelSerializer):
    # Accept email instead of user ID
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = PurchaseToken
        fields = ['id', 'user', 'email', 'quantity', 'purchase_date']
        read_only_fields = ['id', 'purchase_date', 'user']

    def create(self, validated_data):
        # Get email and quantity from validated data
        email = validated_data.pop('email')
        # quantity = validated_data.get('quantity')

        # Look up user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        
        # token = PurchaseToken.objects.create(user=user, quantity=quantity)

        token, created = PurchaseToken.objects.get_or_create(user=user)

        token.quantity += validated_data.get('quantity', 0)  # Add new quantity to existing quantity
        
        token.save() 
        return token

