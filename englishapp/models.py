from __future__ import unicode_literals

from django.db import models

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone







class Profile_User(models.Model):
    A='1'
    B='2'
    C='3'
    preparation_type_field=(('', '---------'),(A,'ssc preparation'),
		(B,'bank preparation'),
		(C,'others'),)
    user=models.OneToOneField(User)
    preparation_type=models.IntegerField(choices=preparation_type_field)

class Article(models.Model):
    politics=1
    sports=2
    science=3
    entertainment=4
    world=5
    nation=6
    environment=7
    businessandcommerce=8
    tech=9
    lifestyle=10
    others=11
    genre_field=(('', '---------'),(politics,'politics'),(tech,'tech'),
        (lifestyle,'lifestyle'),
        (sports,'sports'),
        (science,'science'),(entertainment,'entertainment'),(world,'world'),(nation,'nation'),(environment,'environment'),(businessandcommerce,'businessandcommerce'),(others,'others'))
    text=1
    play=2
    video=3
    type_field=(('','---------'),(text,'text type article'),
                (play,'play exercise article'),(video,'video type article'),)
    article_image=models.ImageField(upload_to='englishgyani/staticfiles/images/article_images', height_field=None, width_field=None, max_length=100)
    article_title=models.CharField(max_length=254)
    article_content=models.TextField(blank=True)
    #article_altered_content=models.TextField(blank=True)
    #errorcount=models.TextField(blank=True)
    article_video_url=models.URLField(blank=True)
    article_genre=models.IntegerField(choices=genre_field)
    article_type=models.IntegerField(choices=type_field)
    article_level=models.IntegerField()
    article_question_detail=models.CharField(default="4 Comprehesnion",max_length=254)
    article_objective=models.CharField(max_length=254)# 2points seperated by pipe
    article_summary=models.CharField(max_length=254)
    article_publication_date=models.DateField()
    article_tag=models.CharField(max_length=254)
    #article_publish_detail=models.CharField(max_length=254)
    article_publication_source=models.CharField(max_length=254)
    article_publication_source_url=models.URLField()
    def __unicode__(self):
		return str("id")+str(":")+str(self.id)


class Article_Question(models.Model):
    mcq=1
    morethanonechoice=2
    truefalse=3
    fillblank=4
    edittext=5
    matchit=6
    question_type_field=(('', '---------'),(mcq,'multiple choice questions'),
        (morethanonechoice,'more than one correct choice'),
        (truefalse,'true or false'),(fillblank,'fill in the blanks'),(edittext,'edit the sentence'),(matchit,'match the following'),)
    A=1
    B=2
    C=3
    D=4
    E=5
    F=6
    G=7
    choice_field=(('', '---------'),(A,'choice1'),
        (B,'choice2'),
        (C,'choice3'),(D,'choice4'),(E,'fill in the blank'),(F,'True'),(G,'False'),)
    vocabulary=1
    vocabulary_context=2
    comprehension=3
    comp_reorg=4
    comp_infer=5
    type_field=((vocabulary,'vocabulary'),(vocabulary_context,'vocabulary_context'),
                (comprehension,'comprehension'),(comp_reorg,'comp_reorg'),
                (comp_infer,'comp_infer')
                )
    
    article=models.ForeignKey(Article)
    question_instruction=models.CharField(max_length=254)
    question_description=models.CharField(max_length=254)
    question_description_main=models.CharField(blank=True,max_length=254)
    question_weight=models.IntegerField()
    question_type=models.IntegerField(choices=question_type_field,default=mcq)
    choice1_description=models.CharField(max_length=254,blank=True)
    choice2_description=models.CharField(max_length=254,blank=True)
    choice3_description=models.CharField(max_length=254,blank=True)
    choice4_description=models.CharField(max_length=254,blank=True)
    fill_blank_description=models.CharField(max_length=254,blank=True)
    sentence_pos=models.IntegerField(default=0)
    paragraph_pos=models.IntegerField(default=0)
    word=models.CharField(default="o",max_length=254)
    feedback=models.CharField(max_length=500)
    right_choice=models.IntegerField(choices=choice_field)
    question_category=models.IntegerField(choices=type_field)

class Play_Content(models.Model):
    article=models.ForeignKey(Article)
    article_altered_content=models.TextField()
    errorcount=models.CharField(max_length=2)

class Play_Question(models.Model):
    article=models.ForeignKey(Article)
    word=models.CharField(max_length=254)
    modified_word=models.CharField(max_length=254)
    question_concept=models.CharField(max_length=254)
    question_example=models.CharField(max_length=254)
    question_type=models.IntegerField()


class Article_Phrase(models.Model):
    article=models.ForeignKey(Article)
    phrase=models.CharField(max_length=254)
    meaning=models.CharField(max_length=254)
    example=models.CharField(max_length=254)
    sentence_pos=models.IntegerField()
    paragraph_pos=models.IntegerField()
    word=models.CharField(max_length=254)

class User_Performance(models.Model):
    user=models.IntegerField(User)
    question_id=models.IntegerField()
    article_id=models.IntegerField()
    question_feedback=models.CharField(max_length=254)
    response=models.CharField(max_length=254)
    correct_answer=models.CharField(max_length=254)

class User_Article_Attempt(models.Model):
    user=models.IntegerField(User)
    article_id=models.IntegerField()


class User_Play_Performance(models.Model):
    user=models.IntegerField(User)
    article_id=models.IntegerField()
    no_error=models.IntegerField()
    user_altered_content=models.TextField(blank=True)


class User_Bookmark(models.Model):
    user=models.IntegerField(User)
    bookmark_word=models.CharField(max_length=254)
    bookmark_word_meaning=models.CharField(max_length=254)
    bookmark_word_example=models.CharField(max_length=254)
    #bookmark_source_example=models.CharField(max_length=254)
    strength=models.IntegerField()
    date_created = models.DateTimeField(default=timezone.now)
    source=models.CharField(max_length=254)




class Vocab_List(models.Model):
    vocab=models.CharField(max_length=254)
    vocab_meaning=models.CharField(max_length=254)
    vocab_example=models.CharField(max_length=254)
    vocab_category=models.CharField(max_length=254)

class Word_meaning_hindi(models.Model):
    word_name=models.CharField(max_length=99)
    word_meaning=models.CharField(max_length=254)

class Word_meaning_English(models.Model):
    word_name=models.CharField(max_length=99)
    word_meaning=models.CharField(max_length=254)

class Motivation_quote(models.Model):
    quote=models.CharField(max_length=254)
    quote_type=models.CharField(max_length=254)

