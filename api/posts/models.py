import uuid
from django.db import models
from django.conf import settings


class Post(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Post ID', default=uuid.uuid4, editable=False)
    message = models.TextField(blank=True)
    image_url = models.ImageField(upload_to='images/')
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
