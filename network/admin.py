from django.contrib import admin
from .models import Posts, Follower,Following, User

# Register your models here.
admin.site.register(Posts)
admin.site.register(Follower)
admin.site.register(Following)
admin.site.register(User)
