from bs4 import BeautifulSoup 
import urllib 


print "word"
capital = raw_input()
r = urllib.urlopen("https://en.oxforddictionaries.com/definition/"+capital)
soup = BeautifulSoup(r,"lxml")
a= soup.findAll(attrs={'class' : 'ind'})
b= soup.findAll(attrs={'class' : 'ex'})
if len(a)>0 and len(b)>0:
	mean=a[0].get_text()
	print mean[-1]
	if (mean[-1]==":" ):
		mean = mean[:-1]
		print mean
	else:
		print mean
	print b[0].get_text()