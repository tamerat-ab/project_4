from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from .models import User, Posts,Following,Like, Follower,Comment
from .forms import Postform
from django.core.exceptions import ObjectDoesNotExist
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

# def follow():

#     pass
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
    
def follow(request, users_id):
    user=request.user
    user_id=user.id
    try:
        followed_user=Following.objects.filter(user=user_id, users_id=users_id)
        if followed_user.exists():
            return HttpResponseRedirect(reverse('profile', args=(users_id,)))
            # return JsonResponse({'followed_id':'id_exits'})
    except: followed_user.DoesNotExist

    else: 
        user_followed=User.objects.filter(id=users_id)[0]
        followed=Follower(user=user_followed, follower_id=user_id)
        followed.save()
        following=Following(user=user,users_id=users_id)
        following.save()
        return HttpResponseRedirect(reverse('profile', args=(users_id,)))
def count_follow(request,user_id):
        count_following =len(Following.objects.filter(user=user_id))
        count=Following.objects.filter(user=user_id)
        count_follower=len(Follower.objects.filter(user=user_id))
        return render(request,'network/index.html',{'following':'count_following','follower':'count_follower','count':count})


def unfollow(request, users_id):
    user=request.user
    user_id=user.id
    unfollow=Following.objects.filter(user=user_id,users_id=users_id)
    unfollow.delete()
    return HttpResponseRedirect(reverse('index'))



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
    if request.method=='POST':
        text_field=request.POST.get('text_field')
        post=Posts.objects.get(user=user,id=id)
        post.text_field=text_field
        post.save()
    
    # if request.method=='PUT':
    #     data=json.loads(request.body)
    #     if data.get(text_field) is not None:
    #         text_field=data.get('text_field')
    #         post=Posts.objects.filter(user=user,id=id)
    #         post.text_field= text_field
    #         post.save()
    #         return JsonResponse( {'message':'Successfully updated'},status=200)
    # else:
        return JsonResponse( {'error': 'Invalid'}, status=400)
    
    
def like(request,post_id):

    user=request.user
    user_liked=User.objects.filter(posts=post_id)[0]
    post=Posts.objects.filter(id=post_id)[0]

    try:
        get_user=Like.objects.filter(user=user_liked,post=post,liking_user=user.id)
        if get_user.exists():
            return JsonResponse({'user': 'liked'})
    except: get_user.DoesNotExist()
   
    else:
        liked=Like(user=user_liked,post=post,liking_user=user.id)
        liked.save()
        like_count=len(Like.objects.filter(user=user))+1
        return JsonResponse( {'like_count':like_count}, status=200)


def unlike(request,post_id):
    user=request.user
    user_liked=User.objects.filter(posts=post_id)[0]
    post=Posts.objects.filter(id=post_id)[0]

    try:
        get_user=Like.objects.filter(user=user_liked,post=post,liking_user=user.id)
        if get_user.exists():
           get_user.delete()
           return JsonResponse({'user':'disliked'})
    except: get_user.DoesNotExist()

def comment(request,post_id):
    if request.method == 'POST':
        comment=request.POST.get('comment')
        user=request.user
        users=User.objects.filter(posts=post_id)[0]
        post=Posts.objects.filter(id=post_id)[0]
        comment=Comment(user=users,post=post,comment=comment)
        comment.save()
        try:
            # comments=Comment.objects.filter(post=post,user=users) 
            return render(request,'network/index.html',{'comments':'comments'})
            
        except:return JsonResponse({'doesnotexist':'does not exist'})
        return render(request,'network/index.html',{'comments':'comments'})
        

           


            
   
   


    






