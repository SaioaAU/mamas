from django import forms

class EntryForm(forms.Form):
    pee = forms.BooleanField(required = False)
    poo = forms.BooleanField(required = False)
    description_text = forms.CharField(help_text="Write a note here.", required = False)
