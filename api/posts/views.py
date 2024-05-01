from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
import random
from datetime import datetime, timedelta
from .models import Post
from users.models import User


class PostsView(APIView):
    def get(self, request):
        # posts = [
        #     {   
        #         "id": "1",
        #         "name": "John Doe",
        #         "description": "johndoe@example.com",
        #         "message": "Excited to start this new journey!",
        #         "photoUrl": "https://example.com/photos/johndoe.jpg",
        #         "timestamp": "2024-04-29T12:00:00Z"
        #     },
        #     {
        #         "id": "2",
        #         "name": "Jane Smith",
        #         "description": "janesmith@example.com",
        #         "message": "Looking forward to learning more!",
        #         "photoUrl": "",
        #         "timestamp": "2024-04-29T12:05:00Z"
        #     },
        #     {   
        #         "id": "3",
        #         "name": "Sam Brown",
        #         "description": "sambrown@example.com",
        #         "message": "Here's my latest project, take a look.",
        #         "photoUrl": "https://example.com/photos/sambrown.jpg",
        #         "timestamp": "2024-04-29T12:10:00Z"
        #     },
        #     {
        #         "id": "4",
        #         "name": "Alice Green",
        #         "description": "alicegreen@example.com",
        #         "message": "Can't believe this is happening!",
        #         "photoUrl": "",
        #         "timestamp": "2024-04-29T12:15:00Z"
        #     },
        #     {   
        #         "id": "5",
        #         "name": "Robert Frost",
        #         "description": "robertfrost@example.com",
        #         "message": "A lovely day to work on some code!",
        #         "photoUrl": "https://example.com/photos/robertfrost.jpg",
        #         "timestamp": "2024-04-29T12:20:00Z"
        #     }
        # ]
        posts_list = []
        posts = Post.objects.all().order_by('-created_at')
        for post in posts:
            posts_list.append({   
                "id": post.id,
                "name": post.created_by.first_name,
                "description": post.created_by.email,
                "message": post.message,
                "image_url": request.build_absolute_uri(post.image_url) if post.image_url else "",
                "timestamp": post.created_at.time()
            })
        return Response({
            "posts": posts_list
            }, status=status.HTTP_200_OK)

    
    def post(self, request):
        data = request.data
        print("data: ", data)
        post = Post(
            message=data["message"],
            image_url=data["image_url"],
            created_by=User.objects.get(email="admin@netsphere.com")
        )
        post.save()
        return Response(status=status.HTTP_201_CREATED)