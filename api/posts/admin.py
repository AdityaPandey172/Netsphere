from django.contrib import admin
from .models import Post, PostsReaction, PostsSave

admin.site.register(Post)
admin.site.register(PostsReaction)
admin.site.register(PostsSave)
