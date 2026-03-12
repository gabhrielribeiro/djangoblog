from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('post/<slug:slug>/', views.post, name='post'),
    path('posts/', views.posts, name='posts')
]
