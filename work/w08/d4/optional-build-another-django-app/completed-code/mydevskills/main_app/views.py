from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.base import TemplateView
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView
from .forms import LoginForm
from .models import Skill

class HomeView(TemplateView):
    template_name = "home.html"

class SkillListView(ListView):
    template_name = 'skills/list.html'
    def get_queryset(self):
        return self.request.user.skill_set.all()

class SkillDetailView(DetailView):
    model = Skill
    template_name = 'skills/detail.html'

class SkillCreate(CreateView):
    model = Skill
    fields = '__all__'
    template_name = 'skills/form.html'
    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('skill_list')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            u = form.cleaned_data['username']
            p = form.cleaned_data['password']
            user = authenticate(username = u, password = p)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('skill_list')
                else:
                    print("The account has been disabled.")
            else:
                print("The username and/or password is incorrect.")
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('home')
