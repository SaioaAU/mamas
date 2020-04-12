from django.shortcuts import render
from django.http import HttpResponse
from .forms import BabyForm
from babies.models import Baby
from django.template import loader

# Create your views here.
def create_baby(request):

    if request.method == 'POST':
        form = BabyForm(request.POST)
        print(form.data)
        if form.is_valid():
            name = form.cleaned_data['name']
            date_of_birth = form.cleaned_data['date_of_birth']
            created_by = request.user
            baby = Baby.objects.create(created_by = created_by, name = name, date_of_birth = date_of_birth )
        else:
            print(form.errors)
    form = BabyForm()
    return render(request, 'form.html', {'form': form})

def baby(request, baby_id):
    baby = Baby.objects.get(id = baby_id)
    template = loader.get_template('babies/baby.html')
    context = {
        'baby': baby,
    }
    return HttpResponse(template.render(context, request))

def index(request):
    current_user = request.user
    babies = Baby.objects.filter(created_by = current_user)
    template = loader.get_template('babies/index.html')
    context = {
        'babies': babies,
    }
    return HttpResponse(template.render(context, request))
