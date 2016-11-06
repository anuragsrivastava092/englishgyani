import nltk.data
def anurag():
        article=open("englishapi/article.txt","r")
        return article
def final(question,content):

    #article=content
    #print question,content
    article=open("englishapi/article.txt","r")
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    par =[]
    for i in article:
            par.append(i)
    para =[]
    print 1
    print par
    print 2
    test=[]
    count =0
    for i in range(len(par)):
        if par[i]!="\r\n":
            if par[i][-2:] ==  "\r\n" :
                param=par[i][:-2]
                sent_token = tokenizer.tokenize(param)
                para.append(sent_token)
            else :
                #print 99
                #print par[i]
                sent_tokenm = tokenizer.tokenize(par[i])
                para.append(sent_tokenm)
    #print "para",para
    for i in range(len(question)):
        if len(question[i])>3:
            sent = para[question[i][1]][question[i][2]]
            ques_word = question[i][3]
            le = len(ques_word)
            #print sent
            #print ques_word
            try:
                loc = sent.index(ques_word)
                para[question[i][1]][question[i][2]]  = sent[:loc] +  "<span " + "class=" + "grammar" + " "+"id="+str(question[i][0])+ ">"+ ques_word +"</span>" + sent[(loc+le):]
                #print para[question[i][1]][question[i][2]]
            except ValueError:
                d =0

        elif len(question[i])==3:

            para[question[i][1]][question[i][2]] = "<span " + "class=" + "grammar" + " " + "id="+str(question[i][0])+ ">"+ para[question[i][1]][question[i][2]]+"</span>"
            #print para[question[i][1]][question[i][2]]
        else:
            print 1
            ques_word = question[i][1].strip()
            print ques_word
            le = len(ques_word)
            #print le
            a=0
            for l in range(len(para)):
                print para[l]
                for u in range(len(para[l])):
                    try:
                        print 775
                        loc = para[l][u].index(ques_word)
                        para[l][u]  = para[l][u][:loc] +  "<span " + "class=" + "vocab" + " "+"id="+str(question[i][0])+ ">"+ ques_word +"</span>" + para[l][u][(loc+le):]
                        print para[l]
                        a=1
                        break
                    except ValueError:
                        d =0
                if a==1:
                    break



    return para