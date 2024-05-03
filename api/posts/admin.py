from django.contrib import admin
from .models import Post, PostsReaction, PostsSave, Notifications, Events, Announcements, Research

admin.site.register(Post)
admin.site.register(PostsReaction)
admin.site.register(PostsSave)
admin.site.register(Notifications)
admin.site.register(Events)
admin.site.register(Announcements)
admin.site.register(Research)
