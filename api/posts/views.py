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
from .models import PostsReaction, PostsSave


class PostsView(APIView):
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts_list = []
        posts = Post.objects.all().order_by('-created_at')
        for post in posts:
            is_interested = PostsReaction.objects.filter(
                post_id=post.id,
                user_id=request.user.id
            )
            is_saved = PostsSave.objects.filter(
                post_id=post.id,
                user_id=request.user.id
            )

            interest_count = PostsReaction.objects.filter(
                post_id=post.id
            ).count()

            saved_count = PostsSave.objects.filter(
                post_id=post.id
            ).count()

            posts_list.append({   
                "id": post.id,
                "name": post.created_by.first_name,
                "description": post.created_by.email,
                "message": post.message,
                "image_url": request.build_absolute_uri(post.image_url) if post.image_url else "",
                "timestamp": post.created_at.time(),
                "saved": saved_count,
                "interested": interest_count,
                "is_interested": True if is_interested else False,
                "is_saved": True if is_saved else False,
            })

        return Response({
            "posts": posts_list
            }, status=status.HTTP_200_OK)

    
    def post(self, request):
        data = request.data
        post = Post(
            message=data["message"],
            image_url=data["image_url"],
            created_by=request.user,
        )
        post.save()
        return Response(status=status.HTTP_201_CREATED)
    

class UpdateInterestedReaction(APIView):
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        data = request.data
        post_reaction_present = PostsReaction.objects.filter(
            post_id=data["id"],
            user_id=request.user.id
        )

        if post_reaction_present:
            if not data["interest"]:
                PostsReaction.objects.filter(post_id=data["id"]).delete()
        else:
            if data["interest"]:
                PostsReaction(
                    post_id=Post.objects.get(id=data["id"]),
                    user_id=request.user,
                    created_by=request.user
                ).save()

        return Response({"message": "Saved Reaction"}, status=200)
    


class UpdateSavedReaction(APIView):
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        data = request.data
        post_saved_present = PostsSave.objects.filter(
            post_id=data["id"],
            user_id=request.user.id
        )

        if post_saved_present:
            if not data["saved"]:
                PostsSave.objects.filter(post_id=data["id"]).delete()
        else:
            if data["saved"]:
                PostsSave(
                    post_id=Post.objects.get(id=data["id"]),
                    user_id=request.user,
                    created_by=request.user
                ).save()

        return Response({"message": "Saved Post"}, status=200)

            

