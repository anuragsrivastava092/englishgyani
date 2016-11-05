from django.shortcuts import render
from django.views import View
from englishapi import views as englishapi_view
import json

# Create your views here.
class List_Article(View):
    def get(self,request):
        article_list=englishapi_view.Display_Article_LIst.as_view()(self.request).content
        article_list=json.loads(article_list)
        return render(request,"article_list.html",{"article_list":article_list})

class Open_Article(View):
    def get(self,request,article_id):
        article_id=int(article_id)
        mutable = request.GET._mutable
        request.GET._mutable = True
        request.GET["article_id"] =article_id
        request.GET._mutable = mutable
        question_list=englishapi_view.On_Open_Article.as_view()(self.request).content
        question_list=json.loads(question_list)
        print question_list
        return render(request,"article_content.html",{"question_list":question_list})

