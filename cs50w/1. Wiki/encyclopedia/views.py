from django.shortcuts import render, redirect
from django.http import Http404
from django import forms
from django.core.exceptions import ValidationError
from gettext import gettext as _
from random import choice as random_choice
from markdown2 import markdown as to_html

from . import util

NOT_FOUND_MSGE = "Sorry, the page doesn't yet exist, try creating it first!"

class NewEntryForm(forms.Form):
    title = forms.CharField(max_length=50, label="New entry title")
    body = forms.CharField(widget=forms.Textarea, label="New description in markdown")

    def clean_title(self):
        """
        Verify title is unique 
        """
        name = self.cleaned_data['title']
        if util.get_entry(name):
            raise ValidationError(_('This title already exists! Try a different one 💡'))
        return name


class EditForm(forms.Form):
    body = forms.CharField(widget=forms.Textarea, label='Edit description in markdown')


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })


def title(request, name):
    cap_name = util.get_capitalized_title(name)

    if not cap_name:
        raise Http404(NOT_FOUND_MSGE)
    
    if name!= cap_name:
        return redirect(title, cap_name)

    markdown = util.get_entry(name)
    
    entry = {
        "title": name,
        "html": to_html(markdown)
    }
    return render(request, "encyclopedia/title.html", {
        "entry": entry
    })
    

def new(request):
    if request.method == 'POST':
        form = NewEntryForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['title']
            body = form.cleaned_data['body']
            
            util.save_entry(name,body)
            return redirect(title, name)

        else:
            return render(request, "encyclopedia/new.html", {
                "form": form
            })

    # GET
    return render(request, "encyclopedia/new.html", {
        "form": NewEntryForm()
    })


def edit(request, name):
    cap_name = util.get_capitalized_title(name)

    if not cap_name:
        raise Http404(NOT_FOUND_MSGE)
    
    if name!= cap_name:
        return redirect(edit, cap_name)

    if request.method == 'POST':
        form = EditForm(request.POST)
        if form.is_valid():
            body = form.cleaned_data['body']

            util.save_entry(name,body)
            return redirect(title, name)

        else:
            return render(request, "encyclopedia/new.html", {
                "form": form
            })
    
    # GET
    markdown = util.get_entry(name)
    
    return render(request, "encyclopedia/edit.html", {
        "title": name,
        "form": EditForm(initial={'body':markdown})
    })


def random(request):
    return redirect(title, name=random_choice(util.list_entries()))


def search(request):
    query = request.GET['q']
    if not query:
        return redirect(index)

    cap_query = util.get_capitalized_title(query)
    if cap_query:
        return redirect(title, name=cap_query)
    
    return render(request, "encyclopedia/search.html", {
        "matches": [name for name in util.list_entries() if query.lower() in name.lower()],
        "query": query
    })


def page_not_found(request, exception):
    # note: for this page to show set DEBUG = False, and configure server for prod
    response = render(request, 'encyclopedia/page_not_found.html', {
        'error': exception
    })
    response.status_code = 404
    return response