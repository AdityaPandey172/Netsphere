from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
from .models import User
from .serializers import RegisterUserSerializer

class RegisterUserView(APIView):
    """
    API endpoint for registering a new user.
    """
    def post(self, request):
        # Extract data from the request
        data = request.data
        # Serialize the data
        serializer = RegisterUserSerializer(data=data)
        # Validate the serializer
        serializer.is_valid(raise_exception=True)
        # Save the validated data
        serializer.save()

        # Respond with success message
        print("USER creation successful", serializer)
        return Response(status=201)


class LoginView(APIView):
    """
    API endpoint for user authentication.
    """
    permission_classes = [AllowAny]

    @staticmethod
    def authenticate(data):
        """
        Authenticates user based on provided credentials.
        """
        try:
            user = User.objects.get(email=data["email"])
        except ObjectDoesNotExist:
            # User does not exist
            return None
        
        if check_password(data['password'], user.password):
            # Password matches
            return user

    def post(self, request):
        # Extract data from the request
        data = request.data
        print("data: ", data)
        # Authenticate user
        user = self.authenticate(data)
        if user:
            # Generate token for authenticated user
            token, _ = Token.objects.get_or_create(user=user)
            # Respond with user details and token
            return Response({
                'user': {
                    "email": user.email,
                    "name": f"{user.first_name} {user.last_name}",
                    "role": user.role,
                },
                'token': token.key
            }, status=status.HTTP_200_OK)
        # Authentication failed
        return Response(status=400)


class LogoutView(APIView):
    """
    API endpoint for user logout.
    """
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated]  

    def post(self, request):
        # Delete user's authentication token
        request.user.auth_token.delete()
        # Respond with success message
        return Response(status=status.HTTP_200_OK)
