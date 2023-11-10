from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.core.urlresolvers import reverse_lazy

from user_profile.forms import PasswordChangeForm2, SetPasswordForm2, AuthenticationFormNew
from . import views

urlpatterns = [

    url(r'^profile/$', views.profile, name='user_profile'),
    url(r'^profile/edit/$', views.profile_edit, name='user_profile_edit'),
    url(r'^profile/card/(?P<id>\d+)/$', views.profile_user_card, name='profile_user_card'),
]

urlpatterns += [

    url(r'^password/change/$',
       auth_views.password_change,
       {'post_change_redirect': reverse_lazy('auth_password_change_done'),
        'password_change_form': PasswordChangeForm2},
       name='auth_password_change'),
    url(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>.+)/$',
        auth_views.password_reset_confirm,
        {'post_reset_redirect': reverse_lazy('auth_password_reset_complete'),
         'set_password_form': SetPasswordForm2},
        name='auth_password_reset_confirm'),
    url(r'^login/$',
        auth_views.login,
        {'template_name': 'registration/login.html', 'authentication_form': AuthenticationFormNew},
        name='auth_login'),
    url(r'', include('registration.backends.default.urls')),
]



