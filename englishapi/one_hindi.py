from bs4 import BeautifulSoup 
import urllib 
print "word"
a = raw_input()
try:
	r = urllib.urlopen("http://www.shabdkosh.com/hi/translate?e="+a+"&l=hi")
	soup = BeautifulSoup(r,"lxml")
	a= soup.findAll(attrs={'class' : 'in l'})
	# 65 and 122
	for hit in a:
		if (64<ord(hit.get_text()[0])<123):
			print 1
			print hit.get_text()
			print 2
		else:
			print 3 
			print hit.get_text()
			print 4
except IOError:
	print 11111
