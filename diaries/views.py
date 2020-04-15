from django.shortcuts import (get_object_or_404,
                              render,
                              redirect,
                              HttpResponse,
                              HttpResponseRedirect)
from django.utils import timezone
from diaries.forms import EntryForm
from django.template import loader
from diaries.models import Diary, Entry

def diary_create(request):
    d = Diary.objects.create(text = request.text, start_date = timezone.now(), baby = request.baby.id)
    return HttpResponse("ok")

def diary_detail(request, diary_id):
    diary = Diary.objects.get(id = diary_id)
    entries_list = diary.entry_set.all()
    template = loader.get_template('diaries/diary.html')
    context = {
        'diary': diary,
        'entries_list':entries_list,
    }
    return HttpResponse(template.render(context, request))
#------------------------entry-CRUD--------------------------------------
def entry_create(request, diary_id):
    if request.method == 'POST':
        form = EntryForm(request.POST)
        print("hello world", form.data)
        if form.is_valid():
            description_text = form.cleaned_data['description_text']
            pee = form.cleaned_data['pee']
            poo = form.cleaned_data['poo']
            created_by = request.user
            entry = Entry.objects.create(description_text=description_text, diary_id = diary_id, created_by = created_by, pee = pee, poo = poo )
            return redirect(f'/diaries/{entry.diary.id}')
        else:
            print(form.errors)
    form = EntryForm()
    return render(request, 'form.html', {'form': form})

def entry_delete(request, entry_id):
    context ={}
    # fetch the object related to passed id
    entry = get_object_or_404(Entry, id = entry_id)
    if request.method =="POST":
        url = f'/diaries/{entry.diary.id}'
        entry.delete()
        return redirect(url)
    template = loader.get_template('diaries/delete_entry.html')
    return HttpResponse(template.render({}, request))
