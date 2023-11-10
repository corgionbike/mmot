from django.apps import AppConfig


class InviteKeyConfig(AppConfig):
    name = 'invite_key'
    verbose_name = "Пригласительные коды"

    # здесь инициализируем приложение
    def ready(self):
        pass
        # импортируем сигналы
        # import invite_key.signals.signals
