from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostsView.as_view()),
    path('interest/', views.UpdateInterestedReaction.as_view()),
    path('save/', views.UpdateSavedReaction.as_view()),
    path('events/', views.EventsView.as_view()),
    path('research/', views.ResearchView.as_view()),
    path('notifications/', views.NotificationsView.as_view()),
    path('announcements/', views.AnnouncementsView.as_view()),
]
