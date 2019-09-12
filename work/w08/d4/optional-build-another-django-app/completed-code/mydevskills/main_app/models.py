from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

class Skill(models.Model):
    SKILL_LEVELS = (
        (1,	'Fundamental Awareness'),
        (2, 'Novice'),
        (3,	'Intermediate'),
        (4,	'Advanced'),
        (5,	'Expert'),
    )
    description = models.TextField(max_length=300)
    skill_level = models.IntegerField(
        choices=SKILL_LEVELS,
        default=1
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    def get_absolute_url(self):
        return reverse('skill_list')
