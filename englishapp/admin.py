from django.contrib import admin
from englishapp.models import *

# Register your models here.
admin.site.register(Article)
admin.site.register(Article_Questions)
admin.site.register(Article_Phrase)
admin.site.register(Word_meaning_hindi)
admin.site.register(Word_meaning_English)