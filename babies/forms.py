from django import forms
from datetimepicker.widgets import DateTimePicker

BIRTH_YEAR_CHOICES = ['1980', '1981', '1982', '1983', '1984', '1985', '1986' ]

class BabyForm(forms.Form):
    name = forms.CharField(help_text="Enter your baby´s name.")
    date_of_birth = forms.DateField(widget=forms.SelectDateWidget())
