from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
      
    pass
class Posts(models.Model):

    user=models.ForeignKey(User,on_delete=models.CASCADE)
    text_field=models.CharField(max_length=5000)
    likes=models.IntegerField(default=0)
    date_created_on=models.DateField(auto_now=True)
    def serialize(self):
        return{"user":self.user.username,
               "user_id":self.user.id,
               "id":self.id ,
               "text_field":self.text_field ,
                 "date_created_on":self.date_created_on.strftime("%b %d %Y, %I:%M %p")}
    
    
class Follower(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    follower_id=models.IntegerField()

class Following(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    users_id=models.IntegerField(blank=False, null=False ,default=0)
    # users_name=models.CharField(max_length=200)  
    
class Like(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    post=models.ForeignKey(Posts,on_delete=models.CASCADE)
    liking_user=models.IntegerField()
class Comment(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    post=models.ForeignKey(Posts,on_delete=models.CASCADE)
    comment=models.TextField(blank=True)






