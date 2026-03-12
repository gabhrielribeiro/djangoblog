from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView


urlpatterns = [

    path('', views.login, name='login'),
    path('posts/', views.posts, name='post' ),
    path('deletar/<slug:slug>/', views.deletar, name='deletar'),
    path('novo_post/', views.novo_post, name='novo_post'),
    path('editar_post/<slug:slug>/', views.editar_post, name='editar_post'),
    path('logout/', LogoutView.as_view(), name='logout'),

]