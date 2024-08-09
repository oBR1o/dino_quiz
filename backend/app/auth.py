from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import requests

def validate_id_token(token):
    response = requests.get(
        'https://www.googleapis.com/oauth2/v3/tokeninfo',
        params={'id_token': token}
        )
    if not response.ok:
        raise ValidationError('token is invalid')

    if response.json()['aud'] != '721256393503-d348vdjblmlubgtusfo5vafj1me8tbev.apps.googleusercontent.com':
        raise ValidationError('token is invalid')


    return {
        'email': response.json()['email'],
        'first_name': response.json()['given_name'],
        'last_name': response.json()['family_name'],
    }

class SocialAuthorizationView(TokenViewBase):
    class CustomSerializer(serializers.Serializer):
        token = serializers.CharField()

        def validate(self, attrs):
            info = validate_id_token(attrs['token'])
            data = {}
            user, created = User.objects.get_or_create(
                username=info['email'],
                defaults={
                    'first_name': info['first_name'],
                    'last_name': info['last_name'],
                }
            )
            refresh = RefreshToken.for_user(user)

            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
            # data['is_staff'] = user.is_staff
            return data
    serializer_class = CustomSerializer