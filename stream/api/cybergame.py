import json
import urllib.request


def check_id(sid=''):
    if not sid:
        return False
    req = urllib.request.Request(url='http://api.cybergame.tv/w/streams2.php?channel={}'.format(sid))
    try:
        responce = urllib.request.urlopen(req)
        if responce.status == 200:
            with responce as r:
                j = json.loads(r.read().decode('utf-8'))
            if j:
                return True
            return False
    except:
        return False
