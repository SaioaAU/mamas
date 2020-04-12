from django.shortcuts import render
from django.utils import timezone

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from .models import Diary

def create(request):
    d = Diary.objects.create(text = request.text, start_date = timezone.now(), baby = request.baby.id)
    return HttpResponse("ok")

def diary(request, diary_id):
    diary = Diary.objects.get(id = diary_id)
    entries_list = diary.entry_set.all()
    template = loader.get_template('diaries/diary.html')
    context = {
        'diary': diary,
        'entries_list':entries_list,
    }
    return HttpResponse(template.render(context, request))

def create_entry(request):
    if request.method == 'POST':
        form = EntryForm(request.POST)
                    import pdb; pdb.set_trace()

        print(form.data)
        if form.is_valid():
            diary_id = request.diary_id
            description_text = form.cleaned_data['description_text']
            pee = form.cleaned_data['pee']
            poo = form.cleaned_data['poo']
            created_by = request.user
            entry = Eaby.objects.create(created_by = created_by, pee = pee, poo = poo )
        else:
            print(form.errors)
    form = EntryForm()
    return render(request, 'form.html', {'form': form})
