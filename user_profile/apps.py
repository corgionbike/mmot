from django.apps import AppConfig

class UserProfileConfig(AppConfig):
    name = 'user_profile'
    verbose_name = "Пользовательский профиль"

    # здесь инициализируем приложение
    def ready(self):
        # импортируем сигналы
        import user_profile.signals.signals