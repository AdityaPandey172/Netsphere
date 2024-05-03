import uuid
from django.db import models
from django.conf import settings


class Post(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Post ID', default=uuid.uuid4, editable=False)
    message = models.TextField(blank=True)
    image_url = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "posts"
        
        
class PostsReaction(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Post Reaction ID', default=uuid.uuid4, editable=False)
    post_id = models.ForeignKey(Post, on_delete=models.SET_NULL, blank=True, null=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts_reaction_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts_reaction_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "posts_reaction"
        

class PostsSave(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Posts Save ID', default=uuid.uuid4, editable=False)
    post_id = models.ForeignKey(Post, on_delete=models.SET_NULL, blank=True, null=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts_save_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts_save_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "posts_save"


class Events(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Events ID', default=uuid.uuid4, editable=False)
    title = models.TextField(blank=True)
    description = models.TextField(blank=True)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    location = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='events_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='events_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "events"


class Research(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Research ID', default=uuid.uuid4, editable=False)
    title = models.TextField(blank=True)
    description = models.TextField(blank=True)
    date = models.DateField(blank=True,  null=True)
    duration = models.CharField(max_length=250, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='research_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='research_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "research"


class Announcements(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Announcements ID', default=uuid.uuid4, editable=False)
    title = models.TextField(blank=True)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='announcements_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='announcements_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "announcements"


class Notifications(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Notifications ID', default=uuid.uuid4, editable=False)
    description = models.TextField(blank=True)
    is_read = models.BooleanField(default=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='notifications_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='notifications_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "notifications"
