from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
import random
from datetime import datetime, timedelta
from .models import Post, PostsReaction, PostsSave, Announcements, Research, Notifications, Events
from users.models import User
from django.utils.dateformat import format
from django.contrib.humanize.templatetags import humanize

# Define API views for different functionalities

class PostsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # GET method to retrieve posts
    def get(self, request):
        # Initialize an empty list to store posts data
        posts_list = []
        # Query all posts and order by creation time descending
        posts = Post.objects.all().order_by('-created_at')
        # Iterate over posts to construct response data
        for post in posts:
            # Check if the current user has reacted to the post or saved it
            is_interested = PostsReaction.objects.filter(post_id=post.id, user_id=request.user.id)
            is_saved = PostsSave.objects.filter(post_id=post.id, user_id=request.user.id)
            # Count the total number of interests and saves for the post
            interest_count = PostsReaction.objects.filter(post_id=post.id).count()
            saved_count = PostsSave.objects.filter(post_id=post.id).count()
            # Construct post data and append to the list
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
        # Return response with posts data
        return Response({"posts": posts_list}, status=status.HTTP_200_OK)

    # POST method to create a new post
    def post(self, request):
        data = request.data
        # Create a new post object with provided data
        post = Post(
            message=data["message"],
            image_url=data["image_url"],
            created_by=request.user,
        )
        # Save the post to the database
        post.save()
        # Return success response
        return Response(status=status.HTTP_201_CREATED)

# Class for updating interested reaction to a post
class UpdateInterestedReaction(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # PATCH method to update interested reaction
    def patch(self, request):
        data = request.data
        # Check if user has already reacted to the post
        post_reaction_present = PostsReaction.objects.filter(post_id=data["id"], user_id=request.user.id)
        # If reaction is present, delete it if interest is False, otherwise create a new reaction
        if post_reaction_present:
            if not data["interest"]:
                PostsReaction.objects.filter(post_id=data["id"]).delete()
        else:
            if data["interest"]:
                PostsReaction(post_id=Post.objects.get(id=data["id"]), user_id=request.user, created_by=request.user).save()
        # Return success response
        return Response({"message": "Saved Reaction"}, status=status.HTTP_200_OK)

# Class for updating saved reaction to a post
class UpdateSavedReaction(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # PATCH method to update saved reaction
    def patch(self, request):
        data = request.data
        # Check if user has already saved the post
        post_saved_present = PostsSave.objects.filter(post_id=data["id"], user_id=request.user.id)
        # If saved post is present, delete it if saved is False, otherwise create a new saved post
        if post_saved_present:
            if not data["saved"]:
                PostsSave.objects.filter(post_id=data["id"]).delete()
        else:
            if data["saved"]:
                PostsSave(post_id=Post.objects.get(id=data["id"]), user_id=request.user, created_by=request.user).save()
        # Return success response
        return Response({"message": "Saved Post"}, status=status.HTTP_200_OK)

# Class for retrieving events
class EventsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # GET method to retrieve events
    def get(self, request):
        # Query all events and order by date descending
        events = Events.objects.all().order_by('-date')
        response = []
        # Iterate over events to construct response data
        for event in events:
            response.append({
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "date": event.date,
                "time": event.time,
                "location": event.location,
                "created_by": event.created_by.first_name,
            })
        # Return response with events data
        return Response(response, status=status.HTTP_200_OK)

# Class for retrieving research
class ResearchView(APIView):
    # GET method to retrieve research
    def get(self, request):
        # Query all research and order by date descending
        research_list = Research.objects.all().order_by('-date')
        response = []
        # Iterate over research items to construct response data
        for research in research_list:
            response.append({
                "id": research.id,
                "title": research.title,
                "description": research.description,
                "date": research.date,
                "duration": research.duration,
                "created_by": research.created_by.first_name,
            })
        # Return response with research data
        return Response(response, status=status.HTTP_200_OK)

# Class for retrieving announcements
class AnnouncementsView(APIView):
    # GET method to retrieve announcements
    def get(self, request):
        # Query all announcements and order by creation time descending
        announcements_list = Announcements.objects.all().order_by('-created_at')
        response = []
        # Iterate over announcements to construct response data
        for announcement in announcements_list:
            response.append({
                "id": announcement.id,
                "title": announcement.title,
                "description": announcement.description,
                "created_by": announcement.created_by.first_name,
                "created_at": humanize.naturaltime(announcement.created_at),
            })
        # Return response with announcements data
        return Response(response, status=status.HTTP_200_OK)

# Class for retrieving notifications
class NotificationsView(APIView):
    # GET method to retrieve notifications
    def get(self, request):
        # Query all notifications and order by creation time descending
        notifications_list = Notifications.objects.all().order_by('-created_at')
        response = []
        # Iterate over notifications to construct response data
        for notification in notifications_list:
            response.append({
                "id": notification.id,
                "description": notification.description,
                "created_by": notification.created_by.first_name,
            })
        # Return response with notifications data
