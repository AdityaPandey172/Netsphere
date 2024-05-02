from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
from .models import User
from .serializers import RegisterUserSerializer


class RegisterUserView(APIView):

    def post(self, request):
        data = request.data
        serializer = RegisterUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        print("USER creation successful", serializer)
        return Response(status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def authenticate(data):
        try:
            user = User.objects.get(email=data["email"])
        except ObjectDoesNotExist:
            return None
        
        if check_password(data['password'], user.password):
            return user


    def post(self, request):
        data = request.data
        print("data: ", data)
        user = self.authenticate(data)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'user':{
                    "email": user.email,
                    "name": f"{user.first_name} {user.last_name}",
                    "role": user.role,
                },
                'token': token.key
                }, status=status.HTTP_200_OK)
        return Response(status=400)
    

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated]  

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
    
