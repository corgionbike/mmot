from .models import GroupGame


def group_games():
    groups = [(None, '---------')]
    for group in GroupGame.objects.all():
        games = [[game.id, game.name] for game in group.games.all()]
        groups.append([group.name, games])
    return groups
