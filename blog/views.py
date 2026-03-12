from django.shortcuts import render, get_object_or_404

from . models import Post

# Create your views here.
def home(request):
    post_destaque = Post.objects.filter(destaque=True).order_by('-data_postagem')

    outros_posts = Post.objects.order_by('-data_postagem')[:3]

    context = {
        "post_destaque": post_destaque,
        "outros_posts": outros_posts
    }

    return render(request, 'index.html', context)


def post(request, slug):

    post = get_object_or_404(Post, slug=slug)

    return render(request, 'post.html', {
        'post': post
    })



def posts(request):

    if request.method == 'GET':
        posts = Post.objects.all()
        return render(request, 'posts.html', {'posts':posts})
    
    