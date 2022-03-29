from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("random", views.random, name="random"),
    path("new", views.new, name="new"),
    path("wiki/<str:name>", views.title, name="title"),
    path("wiki/<str:name>/edit", views.edit, name="edit"),
    path("search", views.search, name="search"),
]
