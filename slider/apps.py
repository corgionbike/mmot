from django.apps import AppConfig


class SliderConfig(AppConfig):
    name = 'slider'
    verbose_name = "Слайдер"

    # здесь инициализируем приложение
    def ready(self):
        import slider.signals.signals
