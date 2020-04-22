from django.conf import settings
from django.shortcuts import redirect

def frontend_redirect(request):
    return redirect(settings.FRONTEND_URL)
