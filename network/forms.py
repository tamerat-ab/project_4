from django import forms
from .models import Posts
class Postform(forms.ModelForm):
    model=Posts
    class Meta:
        fields=['title', 'date','text_field','image_field','like','comment']

