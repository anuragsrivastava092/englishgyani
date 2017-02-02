from django.contrib import admin
from englishapp.models import *

# Register your models here.
admin.site.register(Article)
admin.site.register(Article_Question)
admin.site.register(Play_Question)
admin.site.register(Article_Phrase)
admin.site.register(Word_meaning_hindi)
admin.site.register(Word_meaning_English)
admin.site.register(User_Performance)
admin.site.register(User_Bookmark)
admin.site.register(User_Play_Performance)
admin.site.register(Motivation_quote)
admin.site.register(Play_Content)
admin.site.register(User_Article_Attempt)
#
admin.site.register(Vocab_Question)
admin.site.register(Vocab_User_Practice)
admin.site.register(Vocab_User_Performance)

