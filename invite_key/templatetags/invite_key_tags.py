from django import template

register = template.Library()


@register.inclusion_tag('invite_key/_site_invite_form.html', takes_context=True)
def site_invite_form(context):
    user = context.get('user')
    return {'user': user}


@register.inclusion_tag('invite_key/_game_invite_form.html', takes_context=False)
def game_invite_form():
    return {}


@register.inclusion_tag('invite_key/profile/_game_invite_list.html', takes_context=True)
def profile_game_invite_list(context):
    user = context.get('user')
    invites = user.game_invite_key.filter().select_related('game')
    # invites = GameInviteKey.objects.filter(owner=user)
    return {'invites': invites}

