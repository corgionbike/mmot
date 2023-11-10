from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class EmailBackend(ModelBackend):

    def authenticate(self, username=None, password=None, **kwargs):
            UserModel = get_user_model()
            if username is None:
                username = kwargs.get(UserModel.USERNAME_FIELD)
            try:
                try:
                    if not validate_email(username):
                        user = UserModel._default_manager.get(email=username)
                except ValidationError:
                    user = UserModel._default_manager.get_by_natural_key(username)
                if user.check_password(password):
                    return user
            except UserModel.DoesNotExist:
                # Run the default password hasher once to reduce the timing
                # difference between an existing and a non-existing user (#20760).
                UserModel().set_password(password)
