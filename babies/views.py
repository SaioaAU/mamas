from rest_framework.views import APIView
from .serializers import BabySerializer
from diaries.serializers import DiarySerializer
from rest_framework import status
from rest_framework.response import Response
from babies.models import Baby


class BabyCreate(APIView):
    def post(self, request, format='json'):
        serializer = BabySerializer(data=request.data, context={"user":request.user})
        if serializer.is_valid():
            baby = serializer.save()
            if baby:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestView(APIView):
    def get(self):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)


class BabiesView(APIView):
    def get(self, request):
        babies = request.user.babies.all()
        serialized_babies = BabySerializer(babies, many=True).data
        # manually_serialized_babies = f'''[
        #     {{
        #         date_of_birth: {baby.date_of_birth},
        #         name: {baby.name},
        #     }} for baby in babies
        # ]'''
        return Response(data=serialized_babies, status=status.HTTP_200_OK)

class BabyView(APIView):
    def get(self, request, baby_id):
        baby = Baby.objects.get(id=baby_id)
        diary = baby.diary
        serialized_baby = BabySerializer(baby).data
        serialized_diary = DiarySerializer(diary).data
        return Response(data={'baby': serialized_baby, 'diary': serialized_diary}, status=status.HTTP_200_OK)

class DeleteView(APIView):
    def delete(self, request, baby_id):
        baby = Baby.objects.get(id=baby_id)
        baby.delete()
        return Response(status=status.HTTP_200_OK)


# Create your views here for django backkeend.
# def create_baby(request):
#     if request.method == 'POST':
#         form = BabyForm(request.POST)
#         print(form.data)
#         if form.is_valid():
#             name = form.cleaned_data['name']
#             date_of_birth = form.cleaned_data['date_of_birth']
#             created_by = request.user
#             baby = Baby.objects.create(created_by = created_by, name = name, date_of_birth = date_of_birth )
#             return redirect(baby)
#         else:
#             print(form.errors)
#     form = BabyForm()
#     return render(request, 'form.html', {'form': form})
#
# def baby(request, baby_id):
#     baby = Baby.objects.get(id = baby_id)
#     template = loader.get_template('babies/baby.html')
#     name = baby.name.capitalize()
#     context = {
#         'baby': baby,
#         'name': name,
#     }
#     return HttpResponse(template.render(context, request))
#
# def baby_list_view(request):
#     current_user = request.user
#     babies = Baby.objects.filter(created_by = current_user)
#     template = loader.get_template('babies/index.html')
#     context = {
#         'babies': babies,
#     }
#     return HttpResponse(template.render(context, request))
