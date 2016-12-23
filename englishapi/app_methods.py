#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re 
import nltk.data
from bs4 import BeautifulSoup 
import urllib
def ensure_str(s):
    if isinstance(s, unicode):
        s = s.encode('utf-8')
    return s

def asc(txt):
    a=["“","”","‘","’","—"]
    correct_txt=""
    pos_init=0
    pos_s=0
    arr=[m.start() for m in re.finditer('(“|”|‘|’|—)', txt)]
    for i in range(len(arr)):#‘ 
        pos = arr[i]
        pos_s=arr[i]+3
        if txt[pos:pos_s]=="—":
            correct_txt+=txt[pos_init:pos]+"-"
        elif txt[pos:pos_s]=="’":
            correct_txt+=txt[pos_init:pos]+"'"
        elif txt[pos:pos_s]=="‘":
            correct_txt+=txt[pos_init:pos]+"'"
        elif txt[pos:pos_s]=="”":
            correct_txt+=txt[pos_init:pos]+'"'
        else:
            correct_txt+=txt[pos_init:pos]+'"'
        pos_init=pos_s
    correct_txt+=txt[pos_s:]
    return correct_txt

def final(question,phrase,content):
    article=open("englishapi/article.txt","r")
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    par =[]
    for i in article:
            par.append(i)
    para =[]
    test=[]
    count =0
    for i in range(len(par)):
        if par[i]!="\r\n":
            if par[i][-2:] ==  "\r\n" :
                param=par[i][:-2]
                param=asc(param)
                sent_token = tokenizer.tokenize(param)
                para.append(sent_token)
            else :
                param=asc(par[i])
                sent_tokenm = tokenizer.tokenize(param)
                para.append(sent_tokenm)
    for i in range(len(question)):
        if len(question[i])>3:
            sent = para[question[i][1]][question[i][2]]
            ques_word = question[i][3]
            le = len(ques_word)
            try:
                loc = sent.index(ques_word)
                if (question[i][4] ==1):
                    para[question[i][1]][question[i][2]]  = sent[:loc] +  "<span class="+"'exercise-link comprehension'" + " "+"id="+str(question[i][0])+ ">"+ ques_word +"</span>" + sent[(loc+le):]
                elif (question[i][4] ==2):
                    #print 0000000000000000000
                    para[question[i][1]][question[i][2]]  = sent[:loc] +  "<span class=" + "' exercise-link grammar'" + " "+"id="+str(question[i][0])+ ">"+ ques_word +"</span>" + sent[(loc+le):]
                elif (question[i][4] ==3): 
                    para[question[i][1]][question[i][2]]  = sent[:loc] +  "<span class=" + "'exercise-link vocabulary'" + " "+"id="+str(question[i][0])+ ">"+ ques_word +"</span>" + sent[(loc+le):]
                
            except ValueError:
                d =0
                #print ques_word
                #print para[question[i][1]][question[i][2]]
    for j in range(len(phrase)):
        if len(phrase[j])>3:
            sent = para[phrase[j][1]][phrase[j][2]]
            para_word = phrase[j][3]
            le = len(para_word)
            try:
                loc = sent.index(para_word)
                para[phrase[j][1]][phrase[j][2]]  = sent[:loc] +  "<span " + "class=" + "phrase-link" + " "+"id=phr"+str(phrase[j][0])+ ">"+ para_word +"</span>" + sent[(loc+le):]
                
            except ValueError:
                d =0
    return para 

def article_to_words():
    article_here=open("englishapi/article_meaning.txt","r")
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    word =[]
    for i in article_here:
            word_li = map(str, i.strip().split())
            for j in word_li:
                if j[-1] not in [",",".","?","1","2","3","4","5","6","7","8","9"]:
                    word.append(j.lower())
    return word
def hindi_meaning(word):
    li = []
    try:
        r = urllib.urlopen("http://www.shabdkosh.com/hi/translate?e="+word+"&l=hi")
        soup = BeautifulSoup(r,"lxml")
        a= soup.findAll(attrs={'class' : 'in l'})
        for hit in a:
            if (64<ord(hit.get_text()[0])<123):
                b = 11
            else:
                #print 3 
                print hit.get_text()
                #print hit.get_text().encode('utf16')
                li.append(hit.get_text())
                #print 4
        return li 
    except IOError:
        return li

def english_meaning(word):
    li = []
    try:
        r = urllib.urlopen("http://dictionary.cambridge.org/dictionary/english/"+word)
        soup = BeautifulSoup(r,"lxml")
        a= soup.findAll(attrs={'class' : 'def'})
        for i in a:
            mean= i.get_text()
            if mean[-1]==" " and (mean[-2]==":" ):
                mean = mean[:-2]
                #print mean
            else:
                print mean
            li.append(mean)
        return li 
    except IOError:
        return li

def bookmark(word):
    li = []
    try:
        r = urllib.urlopen("https://en.oxforddictionaries.com/definition/"+word)
        soup = BeautifulSoup(r,"lxml")
        a= soup.findAll(attrs={'class' : 'ind'})
        b= soup.findAll(attrs={'class' : 'ex'})
        if len(a)>0 and len(b)>0:
            mean=a[0].get_text()
            if (mean[-1]==":" ):
                mean = mean[:-1]
            else:
                dfdf =0
            li.append(mean)
            li.append(b[0].get_text())
            return li
    except IOError:
        return li

def play():
    article=open("englishapi/play_main_content.txt","r")
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    par =[]
    for i in article:
            par.append(i)
    para =[]
    test=[]
    count =0
    for i in range(len(par)):
        if par[i]!="\r\n":
            if par[i][-2:] ==  "\r\n" :
                param=par[i][:-2]
                #param=asc(param)
                para.append(param)
            else :
                param=par[i]
                #param=asc(param)
                para.append(param)
    return para

def play_alter():
    article=open("englishapi/play_alter_content.txt","r")
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    par =[]
    for i in article:
            par.append(i)
    para =[]
    test=[]
    count =0
    for i in range(len(par)):
        if par[i]!="\r\n":
            if par[i][-2:] ==  "\r\n" :
                param=par[i][:-2]
                para.append(param)
            else :
                para.append(par[i])
    return para


def play_response(text):
    text_arr=text.split("|")
    arr=[];
    for i in text_arr:
        par=i.strip()
        if len(par)>0:
            arr.append(par)
    return arr

def level_detail(a):
    if int(a)==0:
        return "CEFR A1, IELTS 0"
    elif int(a)==1:
        return "CEFR A2, IELTS 1-2"
    elif int(a)==2:
        return "CEFR B1, IELTS 3-4"
    elif int(a)==3:
        return "CEFR B2, IELTS 5-6"
    elif int(a)==4:
        return "CEFR C1, IELTS 7-8"
    elif int(a)==5:
        return "CEFR C2, IELTS 9"
    else:
        return "CEFR B2, IELTS 5-6"