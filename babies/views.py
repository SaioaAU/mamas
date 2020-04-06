from django.shortcuts import render
from .forms import BabyForm
from babies.models import Baby
# Create your views here.
def baby(request):

    if request.method == 'POST':
        form = BabyForm(request.POST)
        print(form.data)
        if form.is_valid():
            name = form.cleaned_data['name']
            date_of_birth = form.cleaned_data['date_of_birth']
            print(name)
            baby = Baby.objects.create(name = name, date_of_birth = date_of_birth )
            # render(baby/id)
        else:
            print(form.errors)

    form = BabyForm()
    return render(request, 'form.html', {'form': form})
