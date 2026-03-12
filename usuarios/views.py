from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib import auth
from blog.models import Post
from django.utils.text import slugify
from django.contrib.messages import constants
from django.contrib import messages
# Create your views here.


def login(request):

    if request.method == 'GET':

        if request.user.is_authenticated:
            return redirect('post')  # ou 'home', 'painel', etc
        

        return render(request, 'login.html')

        
    
    elif request.method == 'POST':

        usuario = request.POST.get('usuario')
        senha = request.POST.get('password')

        user = authenticate(username=usuario, password=senha)

        if user is not None:
            auth.login(request, user)
            return redirect('post')
        
        else:
            messages.add_message(request, constants.ERROR, 'Usuário ou senha inválidos.')
            return redirect('login')



@login_required       
def posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        return render(request, 'post_admin.html', {'post':posts})
    
@login_required
def deletar(request, slug):

   
    post = get_object_or_404(Post, slug=slug)
    post.delete()
    return redirect('post')



@login_required
def novo_post(request):
    if request.method == 'GET':

        return render(request, 'novo_post.html')
    
    elif request.method == 'POST':

        titulo = request.POST.get('title')
        desc = request.POST.get('description')
        content = request.POST.get('content') 
        categoria = request.POST.get('category')
        destaque = request.POST.get('featured') == '1'
        tempo_leitura = request.POST.get('time_leitura')
        
        slug = slugify(titulo)

        contador = 1
        slug_original = slug

        while Post.objects.filter(slug=slug).exists():
            slug = f"{slug_original}-{contador}"
            contador += 1

        Post.objects.create(
            titulo=titulo,
            desc=desc,
            content=content,
            categoria=categoria,
            destaque=destaque,
            tempo_leitura = tempo_leitura,
            slug=slug
        )
        
        

        return redirect('post')



@login_required
def editar_post(request, slug):
    post = get_object_or_404(Post, slug=slug)

    if request.method == 'GET':
        return render(request, 'editar_post.html', {'post': post})

    elif request.method == 'POST':
        titulo = request.POST.get('title')
        desc = request.POST.get('description')
        content = request.POST.get('content')
        categoria = request.POST.get('category')
        destaque = request.POST.get('featured') == '1'
        tempo_leitura = request.POST.get('time_leitura')

        post.titulo = titulo
        post.desc = desc
        post.content = content
        post.categoria = categoria
        post.destaque = destaque
        post.tempo_leitura = tempo_leitura

        post.save()

        return redirect('post')


    
  
        


