from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import BabyForm
from babies.models import Baby
from django.template import loader

class BabyCreate(APIView):

    def post(self, request, format='json'):
        serializer = BabySerializer(data=request.data)
        if serializer.is_valid():
            baby = serializer.save()
            if baby:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here for django backkeend.
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

def baby(request, baby_id):
    baby = Baby.objects.get(id = baby_id)
    template = loader.get_template('babies/baby.html')
    name = baby.name.capitalize()
    context = {
        'baby': baby,
        'name': name,
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
