from django.shortcuts import render
from django.views import View
from englishapp.models import *
from django.db.models import Q
from django.http import HttpResponse,JsonResponse
import exception_handler,json
from django.views.decorators.csrf import ensure_csrf_cookie
import app_methods


class Register(View):
    @ensure_csrf_cookie
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
    def post(self,request):
        article_list=Article.objects.filter()
        print request.POST
        if 'sports' in request.POST:
            try:
                sports_id=request.POST.get('sports_id')
            except:
                sports_id=0
            article_list=article_list.filter(article_genre=2,id__gt=sports_id)[10]
        if 'politics' in request.POST:
            try:
                politics_id=request.POST.get('politics_id')
            except:
                politics_id=0
            article_list=article_list.filter(article_genre=1,id__gt=politics_id)[10]
        if 'science' in request.POST:
            try:
                science_id=request.POST.get('science_id')
            except:
                science_id=0
            article_list=article_list.filter(article_genre=3,id__gt=science_id)[10]
        if 'entertainment' in request.POST:
            try:
                entertainment_id=request.POST.get('entertainment_id')
            except:
                entertainment_id=0
            article_list=article_list.filter(article_genre=4,id__gt=entertainment_id)[10]
        if 'international' in request.POST:
            try:
                international_id=request.POST.get('international_id')
            except:
                international_id=0
            article_list=article_list.filter(article_genre=5,id__gt=international_id)[10]
        if 'nation' in request.POST:
            try:
                nation_id=request.POST.get('nation_id')
            except:
                nation_id=0
            article_list=article_list.filter(article_genre=6,id__gt=nation_id)[10]
        if 'environment' in request.POST:
            try:
                environment_id=request.POST.get('environment_id')
            except:
                environment_id=0
            article_list=article_list.filter(article_genre=7,id__gt=environment_id)[10]
        if 'businessandcommerce' in request.POST:
            try:
                businessandcommerce_id=request.POST.get('businessandcommerce_id')
            except:
                businessandcommerce_id=0
            article_list=article_list.filter(article_genre=8,id__gt=businessandcommerce_id)[10]
        else:
            try:
                id=request.POST.get('id')
            except:
                id=0
            article_list=article_list.filter(id__gt=id)[10]
            art_list=[]
        for article in article_list:
            art_data={}
            art_data['head']=article.article_title
            # art_data['image']=article.article_image
            art_data['genre']=article.article_genre
            art_data['level']=article.article_level
            art_data['content']=article.article_content
            art_data['summary']=article.article_summary
            art_data['id']=article.id
            art_data['date']=str(article.article_publication_date)
            art_data['source_url']=article.article_publication_source_url
            art_data['source']=article.article_publication_source

            art_list.append(art_data)
        art_list=json.dumps(art_list,ensure_ascii=True)
        return JsonResponse(art_list,safe=False)



class On_Open_Article(View):
    def get(self,request):
        if 'article_id' in request.GET:
            article_id=request.GET.get("article_id")
            question_l=Article_Questions.objects.filter(article_id=article_id)
            content=question_l[0].article.article_content
            question_list=[]
            question_number_list=[[] for i in question_l]
            i=0
            for question in question_l:
                question_data={}
                question_data['id']=question.id
                question_number_list[i].insert(0,question.id)
                question_number_list[i].insert(1,question.paragraph_pos)
                question_number_list[i].insert(1,question.sentence_pos)
                question_number_list[i].insert(3,question.word)
                i=i+1
                question_data['instruction']=question.question_instruction
                question_data['description']=question.question_description
                question_data['type']=question.question_type
                question_data['weight']=question.question_weight
                if question.question_type==1:
                    question_data['choice1']=question.choice1_description
                    question_data['choice2']=question.choice2_description
                    question_data['choice3']=question.choice3_description
                    question_data['choice4']=question.choice4_description
                if question.question_type==2:
                    pass
                if question.question_type==3:
                    pass
                if question.question_type==4:
                    question_data['fill_blank_text']=question.fill_blank_description
                question_list.append(question_data)
            question_list=json.dumps(question_list,ensure_ascii=True)
            content=app_methods.final(question_number_list,content)
            for i in range(len(content)):
                tet=""
                for j in range(len(para[i])):
                    tet+=" " + para[i][j]
                tet = "<p>"+tet+"</p>"
                parag.append(tet)
            front_content=""
            for i in range(len(parag)):
				front_content += parag[i]
            print front_content
            return JsonResponse(question_list,safe=False)

class Check_Question(View):
    def post(self,request):
        question_id=request.POST.get('question_id')
        response=request.POST.get('response')
        intended_response=Article_Questions.objects.filter(id=question_id).right_choice
        if intended_response==response:
            res = exception_handler.set_server_response(200, "answer is correct")
            return HttpResponse(res, status=200)
        else:
            res = exception_handler.set_server_response(400, "answer is wrong")
            return HttpResponse(res, status=400)






