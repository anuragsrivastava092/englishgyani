from nltk.corpus import wordnet
import itertools as IT
from itertools import product
import csv as csv 
import random
import numpy as np
from nltk.stem.wordnet import WordNetLemmatizer

#wordnet and numpy requires

def arr_similar(word1,word2):
	allsyns1 = set(ss for ss in wordnet.synsets(word1))
	allsyns2 = set(ss for ss in wordnet.synsets(word2))
	best = max((wordnet.wup_similarity(s1, s2) or 0, s1, s2) for s1, s2 in product(allsyns1, allsyns2))
	return best[0]

def word_numpy_arr():
	csv_file_object = csv.reader(open('englishapi/distractor.csv', 'rb'))
	data=[]
	for row in csv_file_object:
		data.append(row) 
	data = np.array(data)
	return data  

def word_best_example(word,word_arr1):
	#best example, corresponding meaning
	#index of word > 0
	#word_arr1 = wordnet.synsets(word)
	max_length = 0
	best_pos = (0,0)
	arr = [0,0]  
	for i in range(len(word_arr1)):
		#sent = word_arr1[i].examples()
		for j in range(len(word_arr1[i].examples())) :
			example = word_arr1[i].examples()[j]
			try:
				ind = example.index(word)
				word_length = len(word)
			except:
				ind = -1
			if ind > -1 and example[ind-1]==" "  and len(example) > max_length:
				max_length = len(example)
				best_example = example[0:ind] + "______"+ example[ind+len(word):]
				best_pos =(i,j)

	if max_length == 0:
		return -1
	else:
		arr[0] = word_arr1[best_pos[0]].definition().capitalize()
		arr[1] = best_example.capitalize() #word_arr1[best_pos[0]].examples()[best_pos[1]]
		#arr[0].capitalize()
		#arr[1].capitalize()
		return arr

def add_blank(word,example):
	best_example =-1
	try:
		ind = example.index(word)
		word_length = len(word)
	except:
		ind = -1
	if ind > -1 and example[ind-1]==" " and example[ind+word_length]==" " :
		best_example = example[0:ind] + "______"+ example[ind+len(word):]
	return best_example

#lexme
#while adding
#question adding
def dest(word,meaning,example):
	lmtzr = WordNetLemmatizer()
	word = lmtzr.lemmatize(word)
	print "word"
	print word
	word_arr1 = wordnet.synsets(word)
	numpy_arr = word_numpy_arr()
	option_arr=[]
	if len(word_arr1)<0:
		print "amit"
		example = add_blank(word,example)
		if example ==-1:
			print "pos_db"
			return -1
		mean_example = [meaning,example]
		i=0
		while (i<3) :
			rand = random.randint(1, 35808)
			obstruction_word = numpy_arr[rand][0]
			option_arr.append(obstruction_word)
		option_arr.append(word)
	else:
		mean_example = word_best_example(word,word_arr1)
		if type(mean_example)==int: 
			print "394"
			example = add_blank(word,example)
			if example==-1:
				print "pos_wordnet"
				example = add_blank(word,example)
				if example==-1:
					print "pos_db"
					return -1
				mean_example = [meaning,example]
				i=0
				while (i<3) :
					rand = random.randint(1, 35808)
					obstruction_word = numpy_arr[rand][0]
					option_arr.append(obstruction_word)
				option_arr.append(word)
				#return -1
			else:
				mean_example = [meaning,example]
				i=0
				while (i<3) :
					rand = random.randint(1, 35000)
					obstruction_word = numpy_arr[rand][0]
					option_arr.append(obstruction_word)
				option_arr.append(word)
		else:
			i=0
			while (i<3) :
				rand = random.randint(1, 35808)
				obstruction_word = numpy_arr[rand][0]
				if 0.1 < arr_similar(obstruction_word,word) < 0.7:
					option_arr.append(obstruction_word)
					i+=1
				elif i>200:
					print 200
					return -1
			option_arr.append(word)
	random.shuffle(option_arr)
	answer = option_arr.index(word)
	option_arr.append(answer)
	option_arr.append(mean_example[1]) # positon  sentence
	#option_arr.append("In this sentence, <strong> " + word + " </strong> means to")# position 4 instruction
	option_arr.append("Choose the correct option for this blank")
	option_arr.append(mean_example[0])
	return option_arr








