#!/usr/bin/env python
# -*- coding: utf-8 -*-
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
        if 'sports' in request.POST:
            sports_id=request.POST.get('sports_id')
            if sports_id!=None:
                article_list=article_list.filter(article_genre=2,id__lt=sports_id).order_by('-id')
            else:
                article_list=article_list.filter(article_genre=2).order_by('-id')[:10]
        elif 'politics' in request.POST:
            politics_id=request.POST.get('politics_id')
            if politics_id!=None:
                article_list=article_list.filter(article_genre=1,id__lt=politics_id).order_by('-id')
            else:
                article_list=article_list.filter(article_genre=1).order_by('-id')
        elif 'science' in request.POST:
            science_id=request.POST.get('science_id')
            if science_id!=None:
                article_list=article_list.filter(article_genre=3,id__lt=science_id).order_by('-id')
            else:
                article_list=article_list.filter(article_genre=3).order_by('-id')
        elif 'entertainment' in request.POST:
            entertainment_id=request.POST.get('entertainment_id')
            if entertainment_id!=None:
                article_list=article_list.filter(article_genre=4,id__lt=entertainment_id).order_by('-id')
            else:
                article_list=article_list.filter(article_genre=4).order_by('-id')
        elif 'international' in request.POST:
            international_id=request.POST.get('international_id')
            if international_id!=None:
                article_list=article_list.filter(article_genre=5,id__lt=international_id).order_by('-id')
            else:
                article_list=article_list.filter(article_genre=5).order_by('-id')
        elif 'nation' in request.POST:
            nation_id=request.POST.get('nation_id')
            if nation_id!=None:
                article_list=article_list.filter(article_genre=6,id__lt=nation_id).order_by('-id')
            else:
                article_list=article_list.filter(article_genre=6).order_by('-id')
        elif 'environment' in request.POST:
            environment_id=request.POST.get('environment_id')
            if environment_id!=None:
                article_list=article_list.filter(article_genre=7,id__lt=environment_id).order_by('-id')
            else:
                article_list=article_list.filter(article_genre=7).order_by('-id')
        elif 'business' in request.POST:
            business_id=request.POST.get('business_id')
            if business_id!=None:
                article_list=article_list.filter(article_genre=8,id__lt=business_id).order_by('-id')
            else:
                article_list=article_list.filter(article_genre=8).order_by('-id')
        else:
            id=request.POST.get('id')
            print id
            if id!=None:
                article_list=article_list.filter(id__lt=id).order_by('-id')[:10]
            else:
                article_list=article_list.all().order_by('-id')[:10]
        art_list=[]
        for article in article_list:
            print "i entered in here"
            art_data={}
            art_data['head']=article.article_title
            art_data['image']=article.article_image.url.split('/')[4]
            art_data['genre']=article.article_genre
            art_data['level']=article.article_level
            #art_data['content']=article.article_content
            art_data['summary']=article.article_summary
            art_data['id']=article.id
            art_data['type']=article.article_type
            art_data['date']=str(article.article_publication_date)
            art_data['source_url']=article.article_publication_source_url
            art_data['source']=article.article_publication_source
            art_list.append(art_data)
            print "kmal",art_list
        art_list=json.dumps(art_list,ensure_ascii=True)
        return JsonResponse(art_list,safe=False)

    def get(self,request):
        article_list=Article.objects.all().order_by('-id')[:10]
        art_list=[]
        print 77777
        for article in article_list:
            art_data={}
            art_data['head']=article.article_title
            art_data['image']=article.article_image.url.split('/')[4]
            art_data['genre']=article.article_genre
            art_data['level']=article.article_level
            #art_data['content']=article.article_content
            art_data['summary']=article.article_summary
            art_data['id']=article.id
            art_data['type']=article.article_type
            art_data['date']=str(article.article_publication_date)
            art_data['source_url']=article.article_publication_source_url
            art_data['source']=article.article_publication_source

            art_list.append(art_data)
        art_list=json.dumps(art_list,ensure_ascii=True)
        print art_list

        return JsonResponse(art_list,safe=False)




class On_Open_Article(View):
    #@ensure_csrf_cookie
    def get(self,request):
        if 'article_id' in request.GET:
            data={}
            article_id=request.GET.get("article_id")
            listing=list(Article.objects.filter(id=article_id).values('errorcount','article_altered_content','article_content','article_type','article_video_url','article_objective','article_level_detail','article_level','article_title','article_summary','article_tag','article_publish_detail','article_publication_date','article_image'))
            if listing[0]["article_type"]==1:
                attempted_l=User_Performance.objects.filter(user=request.user.id)
                attempted_list=[]
                for attempted in attempted_l:
                    attempted_data={}
                    attempted_data['id']="que"+str(attempted.question_id)
                    attempted_data['attempted_answer']=attempted.response
                    attempted_data['answer_feeback']=attempted.question_feedback
                    attempted_data['correct_answer']=attempted.correct_answer
                    attempted_list.append(attempted_data)
                attempted_list=json.dumps(attempted_list,ensure_ascii=True)
                question_l=Article_Question.objects.filter(article_id=article_id)
                phrase_l=Article_Phrase.objects.filter(article_id=article_id)
                content=question_l[0].article.article_content
                article=open("englishapi/article.txt","w")
                article.write(content)
                article.close()
                question_list=[]
                phrase_list=[]
                question_number_list=[[] for i in question_l]
                phrase_number_list=[[] for j in phrase_l]
                i=0
                for question in question_l:
                    question_data={}
                    question_data['id']="que"+str(question.id)
                    question_number_list[i].insert(0,"que"+str(question.id))
                    question_number_list[i].insert(1,question.paragraph_pos)
                    question_number_list[i].insert(2,question.sentence_pos)
                    question_number_list[i].insert(3,question.word)
                    question_number_list[i].insert(4,question.question_category)
                    i=i+1
                    question_data['question_instruction']=question.question_instruction
                    question_data['question_text']=question.question_description
                    question_data['type']=question.question_type
                    question_data['point']=question.question_weight
                    question_data['question_description_main']=question.question_description_main

                    if question.question_type==1:
                        question_data['option1']=question.choice1_description
                        question_data['option2']=question.choice2_description
                        question_data['option3']=question.choice3_description
                        question_data['option4']=question.choice4_description
                    if question.question_type==2:
                        pass
                    if question.question_type==3:
                        pass
                    if question.question_type==4:
                        question_data['fill_blank_text']=question.fill_blank_description
                    question_list.append(question_data)
                j=0
                for phrase in phrase_l:
                    phrase_data={}
                    phrase_data['id']="phr"+str(phrase.id)
                    phrase_number_list[j].insert(0,phrase.id)
                    phrase_number_list[j].insert(1,phrase.paragraph_pos)
                    phrase_number_list[j].insert(2,phrase.sentence_pos)
                    phrase_number_list[j].insert(3,phrase.word)
                    j=j+1
                    phrase_data['phrase']=phrase.phrase
                    phrase_data['meaning']=phrase.meaning
                    phrase_data['example']=phrase.example
                    phrase_list.append(phrase_data)
                question_list=json.dumps(question_list,ensure_ascii=True)
                phrase_li=json.dumps(phrase_list,ensure_ascii=True)
                parag=[]
                content=app_methods.final(question_number_list,phrase_number_list,content)
                for i in range(len(content)):
                    tet=""
                    for j in range(len(content[i])):
                        tet+=" " + content[i][j]
                    new_id= "par"+str(i+1)
                    tet = "<p id="+(new_id) +">"+tet+"</p>"
                    parag.append(tet)
                front_content=""
                for i in range(len(parag)):
    				front_content += parag[i]
                article_content = []
                objective_li=listing[0]["article_objective"].split("|")
                article_content_obj={}
                article_content_obj["article_video"]= listing[0]["article_video_url"]
                article_content_obj["article"]= front_content
                article_content_obj["article_tag"]= listing[0]["article_tag"]
                article_content_obj["title"]= listing[0]["article_title"]
                article_content_obj["publish_detail"]= listing[0]["article_publish_detail"]
                article_content_obj["date"]= str(listing[0]["article_publication_date"])
                article_content_obj["id"]= str(article_id)
                article_content_obj["article_level"]= listing[0]["article_level"]
                article_content_obj["article_level_detail"]= listing[0]["article_level_detail"]
                article_content_obj["article_objective1"]= objective_li[0]
                article_content_obj["article_objective2"]= objective_li[1]
                article_content_obj["article_image"]= str(listing[0]["article_image"].split('/')[4])
                #.url.split('/')[4]
                article_content.append(article_content_obj)
                article_content=json.dumps(article_content,ensure_ascii=True)
                data['question_list']=question_list
                data['phrase_li']=phrase_li
                data['content']=article_content
                data['attempted_questions']=attempted_list
                data['video']="0"
                if request.user.id!=None:
                    data['user']=str(request.user)
                else:
                    data['user']=""
                return JsonResponse(data,safe=True)
            elif listing[0]["article_type"]==3:
                attempted_l=User_Performance.objects.filter(user=request.user.id)
                attempted_list=[]
                for attempted in attempted_l:
                    attempted_data={}
                    attempted_data['id']="que"+str(attempted.question_id)
                    attempted_data['attempted_answer']=attempted.response
                    attempted_data['answer_feeback']=attempted.question_feedback
                    attempted_data['correct_answer']=attempted.correct_answer
                    attempted_list.append(attempted_data)
                attempted_list=json.dumps(attempted_list,ensure_ascii=True)
                question_l=Article_Question.objects.filter(article_id=article_id)
                question_list=[]
                question_number_list=[[] for i in question_l]
                i=0
                for question in question_l:
                    question_data={}
                    question_data['id']="que"+str(question.id)
                    question_number_list[i].insert(0,"que"+str(question.id))
                    question_number_list[i].insert(1,question.paragraph_pos)
                    question_number_list[i].insert(2,question.sentence_pos)
                    question_number_list[i].insert(3,question.word)
                    question_number_list[i].insert(4,question.question_category)
                    i=i+1
                    question_data['question_instruction']=question.question_instruction
                    question_data['question_text']=question.question_description
                    question_data['type']=question.question_type
                    question_data['point']=question.question_weight
                    question_data['question_description_main']=question.question_description_main

                    if question.question_type==1:
                        question_data['option1']=question.choice1_description
                        question_data['option2']=question.choice2_description
                        question_data['option3']=question.choice3_description
                        question_data['option4']=question.choice4_description
                    if question.question_type==2:
                        pass
                    if question.question_type==3:
                        pass
                    if question.question_type==4:
                        question_data['fill_blank_text']=question.fill_blank_description
                    question_list.append(question_data)
                question_list=json.dumps(question_list,ensure_ascii=True)
                article_content = []
                objective_li=listing[0]["article_objective"].split("|")
                article_content_obj={}
                article_content_obj["article_video"]= listing[0]["article_video_url"]
                article_content_obj["article_tag"]= listing[0]["article_tag"]
                article_content_obj["title"]= listing[0]["article_title"]
                article_content_obj["publish_detail"]= listing[0]["article_publish_detail"]
                article_content_obj["date"]= str(listing[0]["article_publication_date"])
                article_content_obj["id"]= str(article_id)
                article_content_obj["article_level"]= listing[0]["article_level"]
                article_content_obj["article_level_detail"]= listing[0]["article_level_detail"]
                article_content_obj["article_objective1"]= objective_li[0]
                article_content_obj["article_objective2"]= objective_li[1]
                article_content_obj["article_image"]= str(listing[0]["article_image"].split('/')[4])
                article_content.append(article_content_obj)
                article_content=json.dumps(article_content,ensure_ascii=True)

                data['question_list']=question_list
                data['content']=article_content
                data['attempted_questions']=attempted_list
                data['video']="1"
                if request.user.id!=None:
                    data['user']=str(request.user)
                else:
                    data['user']=""
                return JsonResponse(data,safe=True)

            #elif listing[0]["article_type"]==3:
            else:
                attempted_l=User_Play_Performance.objects.filter(user=request.user.id,article_id=article_id)
                content=listing[0]["article_content"]
                article=open("englishapi/play_main_content.txt","w")
                article.write(content)
                article.close()
                originaltext=app_methods.play()

                article_altered_content=listing[0]["article_altered_content"]
                altered_text=open("englishapi/play_alter_content.txt","w")
                altered_text.write(article_altered_content)
                altered_text.close()
                alter_text=app_methods.play_alter()

                play_content=[]
                play_content_obj={}
                play_content_obj["originaltext"]=originaltext
                play_content_obj["alteredtext"]=alter_text
                play_content_obj["errorcount"]=int(listing[0]["errorcount"])
                play_content.append(play_content_obj)

                article_content = []
                objective_li=listing[0]["article_objective"].split("|")
                article_content_obj={}
                article_content_obj["article_tag"]= listing[0]["article_tag"]
                article_content_obj["title"]= listing[0]["article_title"]
                article_content_obj["publish_detail"]= listing[0]["article_publish_detail"]
                article_content_obj["date"]= str(listing[0]["article_publication_date"])
                article_content_obj["id"]= str(article_id)
                article_content_obj["article_level"]= listing[0]["article_level"]
                article_content_obj["article_level_detail"]= listing[0]["article_level_detail"]
                article_content_obj["article_objective1"]= objective_li[0]
                article_content_obj["article_objective2"]= objective_li[1]
                article_content_obj["article_image"]= str(listing[0]["article_image"].split('/')[4])
                article_content.append(article_content_obj)
                article_content=json.dumps(article_content,ensure_ascii=True)
                play_content=json.dumps(play_content,ensure_ascii=True)

                #
                Play_feedback=Play_Question.objects.filter(article=article_id)
                Play_feedback_arr=[]
                feed_data={}
                for qyes in Play_feedback:
                    feed_data[qyes.modified_word]= qyes.question_concept
                feed_data=json.dumps(feed_data,ensure_ascii=True)
                print feed_data
                question_attempt=[]
                question_attempt_obj={};
                if len(attempted_l)==0:
                    question_attempt_obj["attempted_text"]=[]
                    question_attempt_obj["change"]=0
                else:
                    for attempted in attempted_l:
                        attem_li=app_methods.play_response(attempted.user_altered_content)
                        change=attempted.no_error
                    question_attempt_obj["attempted_text"]=attem_li
                    question_attempt_obj["change"]=change
                question_attempt.append(question_attempt_obj)
                question_attempt=json.dumps(question_attempt,ensure_ascii=True)

                data['content']=article_content
                data['play_content']=play_content
                data['topic_feed']=feed_data
                data['question_attempt']=question_attempt
                if request.user.id!=None:
                    data['user']=str(request.user)
                else:
                    data['user']=""
                data['video']="2"
                return JsonResponse(data,safe=True)
        else:
            dsdf=0


class Check_Question(View):
    def post(self,request):
        question_id=request.POST.get('question_id')
        response=request.POST.get('response')
        intended_response=Article_Question.objects.filter(id=question_id).right_choice
        if intended_response==response:
            res = exception_handler.set_server_response(200, "answer is correct")
            return HttpResponse(res, status=200)
        else:
            res = exception_handler.set_server_response(400, "answer is wrong")
        User_Performance.objects.create(user=request.user.id,question_id=question_id,response=response)
        return HttpResponse(res, status=400)

class article_meaning(View):
    #@ensure_csrf_cookie
    def get(self,request,article_id):
        article_id=int(article_id)
        print 99999999999
        if article_id>0 :
            question_l=Article_Question.objects.filter(article_id=article_id)
            content=question_l[0].article.article_content
            article=open("englishapi/article_meaning.txt","w")
            article.write(content)
            article.close()
            word_li = app_methods.article_to_words()
            word_hindi_actual_li=[]
            word_english_actual_li=[]
            for word in word_li:
                word_hindi_meaning = Word_meaning_hindi.objects.filter(word_name=word)
                word_english_meaning = Word_meaning_English.objects.filter(word_name=word)
                if len(word_hindi_meaning) ==0:
                    word_hindi_actual_li.append(word)
                if len(word_english_meaning) ==0:
                    word_english_actual_li.append(word)

            print word_hindi_actual_li
            print word_english_actual_li
            for term in word_hindi_actual_li:
                hindi_meaning = app_methods.hindi_meaning(term)
                for mean in hindi_meaning:
                    b = Word_meaning_hindi(word_name=term, word_meaning=mean)
                    b.save()
            for term in word_english_actual_li:
                english_meaning = app_methods.english_meaning(term)
                for mean in english_meaning:
                    b = Word_meaning_English(word_name=term, word_meaning=mean)
                    b.save()
        return HttpResponse("<p>Done</p>")

class Bookmark_Word(View):
    #@ensure_csrf_cookie
    def get(self,request):
        bookmark_li=User_Bookmark.objects.filter(user=request.user.id)
        bookmark_list=[]
        for obj in bookmark_li:
            book_data={}
            book_data['id']=obj.id
            book_data['word']=obj.bookmark_word
            book_data['meaning']=obj.bookmark_word_meaning
            book_data['sentence']=obj.bookmark_word_example
            bookmark_list.append(book_data)
        bookmark_list=json.dumps(bookmark_list,ensure_ascii=True)
        print bookmark_list

        return JsonResponse(bookmark_list,safe=False)

def article_question_response(request):
    question_id=int(request.POST["question_id"][3:])
    response=int(request.POST["response"])
    listing=list(Article_Question.objects.filter(id=question_id).values('feedback','right_choice','article'))
    print request.user.id, question_id, response
    if (request.user.id!=None):
        print 1
        print len(list(User_Performance.objects.filter(question_id=question_id,user=int(request.user.id))))
        if len(list(User_Performance.objects.filter(question_id=question_id,user=int(request.user.id))))>0:
            print 7777
        else:
            aa = str(int(listing[0]['right_choice'])-1)
            print aa
            User_Performance.objects.create(user=int(request.user.id),question_id=question_id, article_id=listing[0]['article'],correct_answer=aa, response=response,question_feedback=listing[0]['feedback'])
    return JsonResponse([{'right_choice':listing[0]['right_choice'],'feedback':listing[0]['feedback']}],safe=False)

def play_question_response(request):
    id=int(request.POST["id"])
    user_response=request.POST["user_response"]
    errorcount=int(request.POST["errorcount"])
    if (request.user.id!= None):
        User_Play_Performance.objects.create(user=int(request.user.id),article_id=id, user_altered_content=user_response,no_error=errorcount)
    return JsonResponse([{'feedback':"success"}],safe=False)

def article_word_meaning(request):
    word=str(request.POST["word"])
    listing_hindi=list(Word_meaning_hindi.objects.filter(word_name=word).values('word_meaning'))
    listing_english=list(Word_meaning_English.objects.filter(word_name=word).values('word_meaning'))
    print listing_hindi
    print listing_english
    return JsonResponse([listing_hindi,listing_english],safe=False)
    #return JsonResponse([{'right_choice':listing[0]['right_choice'],'feedback':listing[0]['feedback']}],safe=False)

def article_bookmark(request):
	if request.user.id!=None:
		word = str(request.POST["word"])
        word=word.lower()
        li_bookmark=User_Bookmark.objects.filter(user=request.user.id,bookmark_word=word)
    	if len(li_bookmark)==0:
	    	li=app_methods.bookmark(word)
	        if len(li)==0:
	            return JsonResponse("-1",safe=False)
	        else:
	            User_Bookmark.objects.create(user=request.user.id,bookmark_word=word,bookmark_word_meaning=li[0],bookmark_word_example=li[1],source="article")
	            return JsonResponse("1",safe=False)
	   	return JsonResponse("0",safe=False)
	else:
		return JsonResponse("-2",safe=False)

def delete_bookmark(request):
    if request.method=='POST':
        print 999
        print 8888
        word = str(request.POST["word"])
        word=word.lower()
        print word
        User_Bookmark.objects.filter(user=request.user.id,bookmark_word=word).delete()
        return JsonResponse("deleted",safe=False)
