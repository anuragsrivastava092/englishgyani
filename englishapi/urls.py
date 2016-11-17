from django.conf.urls import url
from django.contrib import admin
from englishapi import views as api_views


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^article-filter/', api_views.Display_Article_LIst.as_view(),name='article-filter'),
    url(r'^bookmark/', api_views.bookmarks,name='bookmarks' ),
    url(r'^article_question_response/', api_views.article_question_response,name='article_question_response' ),
    url(r'^article_meaning/(?P<article_id>\d+)', api_views.article_meaning.as_view(),name='article_meaning'),
    url(r'^article_word_meaning_list/', api_views.article_word_meaning,name='article_word_meaning'),
]