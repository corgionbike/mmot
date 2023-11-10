from django.apps import AppConfig


class NewsConfig(AppConfig):
    name = 'news'
    verbose_name = "Новости"

    # здесь инициализируем приложение
    def ready(self):
        import news.signals.signals
