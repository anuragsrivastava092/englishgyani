from django.conf.urls import url
from django.contrib import admin
from englishapp import views as app_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^article-list/', app_views.List_Article.as_view(),name='article-list'),
]