from bs4 import BeautifulSoup 
import urllib 


print "word"
capital = raw_input()
r = urllib.urlopen("http://dictionary.cambridge.org/dictionary/english/"+capital)
soup = BeautifulSoup(r,"lxml")
a= soup.findAll(attrs={'class' : 'def'})
for i in a:
	mean= i.get_text()
	if mean[-1]==" " and (mean[-2]==":" ):
		mean = mean[:-2]
		print mean
	else:
		print mean