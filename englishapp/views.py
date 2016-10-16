from django.shortcuts import render
from django.views import View
from englishapi import views as englishapi_view
import json

# Create your views here.
class List_Article(View):
    def get(self,request):
        article_list=englishapi_view.Display_Article_LIst.as_view()(self.request).content
        article_list=json.loads(article_list)
        return render(request,"article_list.html",{'article_list':article_list})
