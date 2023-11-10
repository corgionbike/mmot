from django.apps import AppConfig


class StreamConfig(AppConfig):
    name = 'stream'
    verbose_name = "Стрим"

    # здесь инициализируем приложение
    def ready(self):
        # импортируем сигналы
        pass