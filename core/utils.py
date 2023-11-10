from PIL import Image


def get_background_color(img):
    try:
        im = Image.open(img)
        im = im.convert("P")
        his = im.histogram()

        values = {}

        for i in range(256):
            values[i] = his[i]

        # sort_colors = {color: k for color, k in sorted(values.items(), key=itemgetter(1), reverse=True)[:10]}
        px = 0
        color = 0
        for key, value in values.items():
            if value > px:
                px = value
                color = key
        return '#%03x' % int(color)

    except:
        return '#2196F3'


def comma_splitter(tag_string):
    return [t.strip().lower() for t in tag_string.split(',') if t.strip()]