from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name="logout"),
    path('', HomeView.as_view(), name='home'),
    path('skills/', SkillListView.as_view(), name='skill_list'),
    path('skills/<int:pk>/', SkillDetailView.as_view(), name='skill_detail'),
    path('skills/create/', SkillCreate.as_view(), name='skill_create'),
]