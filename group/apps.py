from django.apps import AppConfig


class GroupConfig(AppConfig):
    name = 'group'
    verbose_name = "Сообщества"

    # здесь инициализируем приложение
    def ready(self):
        # импортируем сигналы
        import group.signals.signals