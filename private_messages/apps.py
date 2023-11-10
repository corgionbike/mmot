from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class PrivateMessagesConfig(AppConfig):
    name = 'private_messages'
    verbose_name = _('Приватные сообщения')

    # здесь инициализируем приложение
    def ready(self):
        # импортируем сигналы
        import private_messages.signals.signals