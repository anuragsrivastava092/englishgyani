from __future__ import unicode_literals

from django.db import models

from django.db import models
from django.contrib.auth.models import User






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
    genre_field=(('', '---------'),(politics,'politics'),
        (sports,'sports'),
        (science,'science'),(entertainment,'entertainment'),(world,'world'),(nation,'nation'),(environment,'environment'),(businessandcommerce,'businessandcommerce'),)
    article_image=models.ImageField(upload_to='englishgyani/staticfiles/images/article_images', height_field=None, width_field=None, max_length=100)
    article_title=models.CharField(max_length=254)
    article_content=models.CharField(max_length=254)
    article_genre=models.IntegerField(choices=genre_field)
    article_level=models.IntegerField()
    article_summary=models.CharField(max_length=254)
    article_publication_date=models.DateField()
    article_publication_source=models.CharField(max_length=254)
    article_publication_source_url=models.URLField()


class Article_Questions(models.Model):
    mcq='1'
    morethanonechoice='2'
    truefalse='3'
    fillblank='4'
    edittext='5'
    matchit='6'
    question_type_field=(('', '---------'),(mcq,'multiple choice questions'),
        (morethanonechoice,'more than one correct choice'),
        (truefalse,'true or false'),(fillblank,'fill in the blanks'),(edittext,'edit the sentence'),(matchit,'match the following'),)
    article=models.ForeignKey(Article)
    question_description=models.CharField(max_length=254)
    question_type=models.IntegerField(choices=question_type_field)

class Question_choices(models.Model):
    question=models.ForeignKey(Article_Questions)
    choice1_description=models.CharField(max_length=254,blank=True)
    choice2_description=models.CharField(max_length=254,blank=True)
    choice3_description=models.CharField(max_length=254,blank=True)
    choice4_description=models.CharField(max_length=254,blank=True)
    fill_blank_description=models.CharField(max_length=254,blank=True)
    A='1'
    B='2'
    C='3'
    D='4'
    E='5'
    F='6'
    G='7'
    choice_field=(('', '---------'),(A,'choice1'),
        (B,'choice2'),
        (C,'choice3'),(D,'choice4'),(E,'fill in the blank'),(F,'True'),(G,'False'),)
    right_choice=models.IntegerField(choices=choice_field)

class User_Performance(models.Model):
    user=models.OneToOneField(User)
    question=models.ForeignKey(Article_Questions)
    response=models.CharField(max_length=254)





