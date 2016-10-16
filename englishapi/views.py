from django.shortcuts import render
from django.views import View
from englishapp.models import *
from django.db.models import Q
from django.http import HttpResponse,JsonResponse
import exception_handler

class Register(View):
    def post(self,request):
        email=request.POST.get('email')
        user_name=request.POST.get('username')
        password=request.POST.get('password')
        if User.objects.filter(Q(email=email) | Q(username=user_name)).exists():
            res = exception_handler.set_server_response(400, "User already exists in our database")
            return HttpResponse(res, status=400)
        else:
            User.objects.create(email=email,username=user_name,password=password)
            res = exception_handler.set_server_response(200, "User has been created successfuly")
            return HttpResponse(res, status=200)

class Display_Article_LIst(View):
    def get(self,request):
        article_list=Article.objects.filter()
        if 'sports' in request.GET:
            article_list=article_list.filter(article_genre=2)
        if 'politics' in request.GET:
            article_list=article_list.filter(article_genre=1)
        if 'science' in request.GET:
            article_list=article_list.filter(article_genre=3)
        if 'entertainment' in request.GET:
            article_list=article_list.filter(article_genre=4)
        if 'world' in request.GET:
            article_list=article_list.filter(article_genre=5)
        if 'nation' in request.GET:
            article_list=article_list.filter(article_genre=6)
        if 'environment' in request.GET:
            article_list=article_list.filter(article_genre=7)
        if 'businessandcommerce' in request.GET:
            article_list=article_list.filter(article_genre=8)
        else:
            article_list=article_list.all()
            art_list=[]
        for article in article_list:
            art_data={}
            art_data['title']=article.article_title
            # art_data['image']=article.article_image
            art_data['genre']=article.article_genre
            art_data['level']=article.article_level
            art_data['content']=article.article_content
            art_list.append(art_data)
        return JsonResponse(art_list,safe=False)





