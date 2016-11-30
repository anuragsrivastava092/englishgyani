from django.contrib import admin
from englishapp.models import *

# Register your models here.
admin.site.register(Article)
admin.site.register(Article_Questions)
admin.site.register(Article_Phrase)
admin.site.register(Word_meaning_hindi)
admin.site.register(Word_meaning_English)
admin.site.register(User_Performance)
admin.site.register(User_Bookmark)
admin.site.register(Vocab_List)
admin.site.register(Motivation_quote)