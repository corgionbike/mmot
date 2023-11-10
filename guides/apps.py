from django.apps import AppConfig


class GuidesConfig(AppConfig):
    name = 'guides'
    verbose_name = "Гайды"

    # здесь инициализируем приложение
    def ready(self):
        # импортируем сигналы
        import guides.signals.signals