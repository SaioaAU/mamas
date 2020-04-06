from django.shortcuts import render
from .forms import BabyForm

# Create your views here.
def baby(request):

    if request.method == 'POST':
        form = BabyForm(request.POST)
        print(form.data)
        if form.is_valid():
            name = form.cleaned_data['name']
            # date_of_birth = form.cleaned_data['date_of_birth'].required = False
            print(name)
            Baby.create(name = name)
        else:
            print(form.errors)

    form = BabyForm()
    return render(request, 'form.html', {'form': form})
