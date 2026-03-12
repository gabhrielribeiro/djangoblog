from django.apps import AppConfig


class UsuariosConfig(AppConfig):
    name = 'usuarios'

    def ready(self):
        try:
            import os
            from django.contrib.auth import get_user_model

            User = get_user_model()

            email = os.getenv("EMAIL_ADMIN")
            senha = os.getenv("SENHA_ADMIN")

            if email and senha:
                if not User.objects.filter(email=email).exists():
                    User.objects.create_superuser(
                        username="admin",
                        email=email,
                        password=senha
                    )
        except Exception:
            pass
