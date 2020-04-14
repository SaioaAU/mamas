from django.shortcuts import render, redirect
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
            return redirect(baby)
        else:
            print(form.errors)
    form = BabyForm()
    return render(request, 'form.html', {'form': form})

def baby_detail_view(request, baby_id):
    baby = Baby.objects.get(id = baby_id)
    template = loader.get_template('babies/baby.html')
    context = {
        'baby': baby,
    }
    return HttpResponse(template.render(context, request))

def baby_list_view(request):
    current_user = request.user
    babies = Baby.objects.filter(created_by = current_user)
    template = loader.get_template('babies/index.html')
    context = {
        'babies': babies,
    }
    return HttpResponse(template.render(context, request))
