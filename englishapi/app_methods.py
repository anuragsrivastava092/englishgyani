import nltk.data
def ensure_str(s):
    if isinstance(s, unicode):
        s = s.encode('utf-8')
    return s
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
                sent_token = tokenizer.tokenize(param)
                para.append(sent_token)
            else :
                sent_tokenm = tokenizer.tokenize(par[i])
                para.append(sent_tokenm)
    for i in range(len(question)):
        if len(question[i])>3:
            sent = para[question[i][1]][question[i][2]]
            ques_word = question[i][3]
            le = len(ques_word)
            try:
                loc = sent.index(ques_word)
                print question[1][2]
                if (question[i][4] ==1):
                    para[question[i][1]][question[i][2]]  = sent[:loc] +  "<span class="+"'exercise-link comprehension'" + " "+"id="+str(question[i][0])+ ">"+ ques_word +"</span>" + sent[(loc+le):]
                elif (question[i][4] ==2):
                    print 0000000000000000000
                    para[question[i][1]][question[i][2]]  = sent[:loc] +  "<span class=" + "' exercise-link grammar'" + " "+"id="+str(question[i][0])+ ">"+ ques_word +"</span>" + sent[(loc+le):]
                elif (question[i][4] ==3): 
                    para[question[i][1]][question[i][2]]  = sent[:loc] +  "<span class=" + "'exercise-link vocabulary'" + " "+"id="+str(question[i][0])+ ">"+ ques_word +"</span>" + sent[(loc+le):]
                
            except ValueError:
                d =0
                print ques_word
                print para[question[i][1]][question[i][2]]
    for j in range(len(phrase)):
        if len(phrase[j])>3:
            sent = para[phrase[j][1]][phrase[j][2]]
            para_word = phrase[j][3]
            le = len(ques_word)
            try:
                loc = sent.index(para_word)
                para[phrase[j][1]][phrase[j][2]]  = sent[:loc] +  "<span " + "class=" + "phrase-link" + " "+"id="+str(phrase[j][0])+ ">"+ ques_word +"</span>" + sent[(loc+le):]
                
            except ValueError:
                d =0


    return para