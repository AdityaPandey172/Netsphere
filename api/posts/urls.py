from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostsView.as_view()),
    path('interest/', views.UpdateInterestedReaction.as_view()),
    path('save/', views.UpdateSavedReaction.as_view()),
]
