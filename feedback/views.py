from django.contrib import messages
from django.core.mail import mail_admins
from django.shortcuts import render, redirect
from django.utils.translation import ugettext_lazy as _

from .forms import FeedbackForm


def _send_mail_admins(subject, message, email):
    subject = 'Обратная связь с пользователем {0} ({1})'.format(subject, email)
    mail_admins(subject, message)


def feedback(request):
    form = FeedbackForm(data=request.POST or None, files=request.FILES or None, user=request.user)
    if form.is_valid():
        f = form.save()
        messages.success(request, _('Сообщение успешно отправлено!'))
        _send_mail_admins(f.name, f.text, f.email)
        return redirect('feedback')
    return render(request, 'feedback/feedback_form.html', {
        'form': form,
    })
