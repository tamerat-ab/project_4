from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from .models import User, Posts,Following,Follower,Like
from .forms import Postform
import json 


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

     # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
    
@login_required()   
def create_post(request):
    user= request.user
    if request.method == "POST":
        textfield = request.POST.get("text_field")
        post_list = Posts( user=user,text_field=textfield)
        post_list.save()
        return HttpResponseRedirect(reverse("index"))

def follow():

    pass
def post_list(request):
    #  if request.method == "POST":
       posts=Posts.objects.all()
       
       return render(request, 'Network/index.html', {'posts_list':posts})    # {'page_obj': page_obj})
    # return render(request, 'Network/index.html', {'posts_list':'new_posts'})    # {'page_obj': page_obj})

def profile(request,user_id):
    # followed=Follower.objects.filter(id=id)
    # followers= followed.followed_number
    # following=followed.followers_number
    user_posts=Posts.objects.filter(user=user_id)
    user=User.objects.filter(id=user_id)
    user_name=user[0]
    users_id=user_id

    return render(request, 'network/index.html', {'user_posts':user_posts, 'user_name':user_name, 'users_id':user_id})
    # return HttpResponseRedirect(reverse( 'network/index.html', args={user_posts:user_posts}))
    
def follow(request, followed_id):
    user=request.user
    user_id=user.id
    follower_id=user.follower_id
    following=Following(user=user,users_id=users_id)
    following.save()
    return HttpResponseRedirect(reverse('index'))
   

def unfollow(request, users_id):
    user=request.user
    unfollow=Following.objects.filter(user=user,users_id=users_id)
    unfollow.delete()



# @login_required()   
def following_post(request):
    followed_users_ids=[]
    post_set=set()
    followed_posts=[]
    user=request.user
    follower_ids= user.following_set.all()
    for ids in follower_ids:
        id=ids.users_id
        post_set.add(id)
    followed_users_ids=list(post_set)
    for followed_user_id in followed_users_ids:
        post=Posts.objects.filter(user=followed_user_id)
        followed_posts.append(post)
 
    return render(request,"network/index.html", {'followed_users':followed_posts}) #{'all_posts':all_posts})
def edit(request,id):
    edit_post=Posts.objects.filter(id=id)
    return render(request,"network/index.html",{'edit_post':edit_post})

def update(request,id):
    user=request.user
    if request.method=='PUT':
        data=json.loads(request.body)
        if data.get(text_field) is not None:
            text_field=data.get('text_field')
            post=Posts.objects.filter(user=user,id=id)
            post.text_field= text_field
            post.save()
            return JsonResponse( {'message':'Successfully updated'},status=200)
    else:
        return JsonResponse( {'error': 'Invalid'}, status=400)
    
    
def like(request,liking_id,post_id):
   if request.method =='put':
    like_count_new=json.loads(request.body)['like_count']
    user=request.user
    liking_user=user.liking_user
    id1=user.id
    like_count=Like.objects,filter(user=id1,post=post_id)
    like_count.like_count

    if liking_user==liking_id:
        return JsonResponse( {'user':'exists'}, status=400)
    else:
        like_count.like_count+=like_count_new
        like_count.save()
        return JsonResponse( {'like_count':'updated'}, status=200)
       

def unlike(request,liking_id,post_id):
    if request.method =='put':
        like_count_new=json.loads(request.body)['like_count']
        user=request.user
        liking_user=user.liking_user
        id1=user.id
        like_count=Like.objects,filter(user=id1,post=post_id)
        like_count.like_count

        if liking_user==liking_id:
            return JsonResponse( {'user':'exists'}, status=400)
        else:
            like_count.like_count-=like_count_new
            like_count.save()
            return JsonResponse( {'like_count':'updated'}, status=200)
    






