from django.apps import AppConfig


class ForumConfig(AppConfig):
    name = 'group_forum'
    verbose_name = "Форум"

    # здесь инициализируем приложение
    def ready(self):
        pass
        # импортируем сигналы
        import group_forum.signals.signals
