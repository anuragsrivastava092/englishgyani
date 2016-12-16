from django.shortcuts import render, redirect
from django.views import View
from englishapi import views as englishapi_view
import json
from django.contrib.auth import logout

# Create your views here.
class List_Article(View):
    def get(self,request):
        article_list=englishapi_view.Display_Article_LIst.as_view()(self.request).content
        article_list=json.loads(article_list)
        if request.user.id!=None:
            user=str(request.user)
        else:
            user=""
        return render(request,"article_list.html",{"article_list":article_list,"user":user})

class Open_Article(View):
    def get(self,request,article_id):
        article_id=int(article_id)
        mutable = request.GET._mutable
        request.GET._mutable = True
        request.GET["article_id"] =article_id
        request.GET._mutable = mutable
        question_list=englishapi_view.On_Open_Article.as_view()(self.request).content
        question_list=json.loads(question_list)
        if question_list['video']=="0":
            return render(request,"article_content.html",{"question_list":question_list['question_list'],'content':question_list['content'],'user':question_list['user'],'phrase_li':question_list['phrase_li'],'attempted_questions':question_list['attempted_questions']})
        elif question_list['video']=="1":
            return render(request,"video_content.html",{"question_list":question_list['question_list'],'content':question_list['content'],'user':question_list['user'],'attempted_questions':question_list['attempted_questions']})
        elif question_list['video']=="2":
            question_list['play_content']
            return render(request,"play.html",{"question_attempt":question_list['question_attempt'],"content":question_list['content'],"play_content":question_list['play_content'],'user':question_list['user'],'topic_feed':question_list['topic_feed']})
class Bookmark_Words(View):
    def get(self,request):
        if request.user.id!=None:
            user=str(request.user)
            bookmark_list=englishapi_view.Bookmark_Word.as_view()(self.request).content
            bookmark_list=json.loads(bookmark_list)
        else:
            user=""
            bookmark_list=[]
        return render(request,"bookmark.html",{"bookmark_list":bookmark_list,"user":user})
class Default(View):
    def get(self,request):
        print 788666
        return redirect("http://englishgyani.com/article-list/")
class LogOut(View):
    def get(self,request):
        logout(request)
