from django.db import models

class Post(models.Model):
    titulo = models.CharField(max_length=150)
    desc = models.CharField(max_length=255)
    content = models.TextField()
    tempo_leitura = models.IntegerField()
    data_postagem = models.DateField(auto_now_add=True)
    categoria = models.CharField(max_length=100)
    destaque = models.BooleanField(default=False)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.titulo


