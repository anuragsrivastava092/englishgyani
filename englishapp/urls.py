from django.conf.urls import url
from django.contrib import admin
from englishapp import views as app_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$',app_views.Default.as_view(),name='default'),
    url(r'^article-list/', app_views.List_Article.as_view(),name='article-list'),
    url(r'^article-content/(?P<article_id>\d+)', app_views.Open_Article.as_view(),name='article-content'),
    url(r'^bookmark/', app_views.Bookmark_Words.as_view(),name='bookmark'),
    url(r'^logout/$', app_views.LogOut.as_view,name='logout'),
]