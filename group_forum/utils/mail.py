from django.contrib.sites.models import Site
from django.core.mail import EmailMessage
from django.template.loader import render_to_string


def send_templated_email(to, subject, body_template, context, user,
                         from_email=None, ct="html", fail_silently=False):
    if not isinstance(to, list):
        to = [to]

    context['domain'] = Site.objects.get_current().domain
    context['protocol'] = 'http'
    context['user'] = user
    message = render_to_string(body_template, context)
    try:
        email = EmailMessage(subject, message, from_email, to)
        email.content_subtype = ct
        email.send(fail_silently)
    except:
        pass
