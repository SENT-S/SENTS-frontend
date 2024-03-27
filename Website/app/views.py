from django.shortcuts import render
from decouple import config


def app(request):
    DEBUG = config('DEBUG', default=False, cast=bool)
    return render(request, 'index.html', {'DEBUG': DEBUG})
