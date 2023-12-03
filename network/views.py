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
from django.views.decorators.csrf import csrf_exempt

@login_required
def index(request):
    user=request.user
    posts = Posts.objects.all().order_by('-id')  # fetching all post objects from database
  
    paginator = Paginator(posts, 2)
    page = request.GET.get('page1')
    try:
        page_obj = paginator.page(page)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)


    # user=request.user 
    followed_users_ids=[]
    post_set=set()
    followed_posts=[]
    follower_ids= user.following_set.all()
    for ids in follower_ids:
        id=ids.users_id
        post_set.add(id)
    followed_users_ids=list(post_set)
    for followed_user_id in followed_users_ids:
        post=Posts.objects.filter(user=followed_user_id)
        # followed_posts.append(list(post))
        # followed=[posts for posts in post]
        followed_posts+=post
  
    followed_posts   
    paginator = Paginator(followed_posts, 1)
    page = request.GET.get('page2')
    try:
        followed_posts = paginator.page(page)
    except PageNotAnInteger:
        followed_posts = paginator.page(1)
    except EmptyPage:
        followed_posts = paginator.page(paginator.num_pages)
   
    return render(request, 'network/index.html',{'page_obj':page_obj,'page':followed_posts})


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
    user=request.user
    logout(request)
    # return HttpResponseRedirect(reverse(""))
    return HttpResponseRedirect('login')


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
    
@csrf_exempt 
# @login_required()   
def create_post(request):
  
    if request.method == "POST":
        user= request.user
        data = json.loads(request.body)
        textfield= data.get("textarea")
        # textfield =request.POST.get("text_field")
        post_list = Posts( user=user,text_field=textfield)
        post_list.save()
        return HttpResponseRedirect(reverse("index"))
        # return JsonResponse({'sucess': 'success'})
    
@csrf_exempt 
def delete(request,post_id):
    data=json.loads(request.body)
    post_id=data.get("post_id")
    post=Posts.objects.get(id=post_id)
    post.delete()
    HttpResponseRedirect(reverse("index"))
    # return JsonResponse({'sucess': 'success'})

# def post_list(request):
#     user=request.user
#     posts = Posts.objects.all()  # fetching all post objects from database
#     return render(request, 'network/index.html',{'posts_list':posts})


def profile(request,user_id):
    # followed=Follower.objects.filter(id=id)
    # followers= followed.followed_number
    # following=followed.followers_number
    user_posts=Posts.objects.filter(user=user_id)
    user=User.objects.get(id=user_id)
    user_name=user
    users_id=user_id
    # return JsonResponse({'user_posts':user_posts, 'user_name':user_name, 'users_id':user_id})
    return JsonResponse([posts.serialize() for posts in user_posts],safe=False)
    # return render(request, 'network/index.html', {'user_posts':user_posts, 'user_name':user_name, 'users_id':user_id})
    # return HttpResponseRedirect(reverse( 'network/index.html', args={user_posts:user_posts}))
@csrf_exempt    
def follow(request, users_id):
    user=request.user
    user_id=user.id
    if request.method == 'POST':
        data=json.loads(request.body)
        users_id=data.get('id')
        try:
            followed_user=Following.objects.filter(user=user_id, users_id=users_id)
            if followed_user.exists():
                # return HttpResponseRedirect(reverse('profile', args=(users_id,)))
                return JsonResponse({'followed_id':'id_exits'})
        except: followed_user.DoesNotExist

        else: 
            user_followed=User.objects.filter(id=users_id)[0]
            followed=Follower(user=user_followed, follower_id=user_id)
            followed.save()
            following=Following(user=user,users_id=users_id)
            following.save()
            # return HttpResponseRedirect(reverse('profile', args=(users_id,)))
            return JsonResponse({'follow':'following'})
        
def count_follow(request,user_id):
        count_following =len(Following.objects.filter(user=user_id))
        count=Following.objects.filter(user=user_id)
        count_follower=len(Follower.objects.filter(user=user_id))+1
        # return render(request,'network/index.html',{'following':'count_following','follower':'count_follower','count':count})
        return JsonResponse ({'following':count_following,'follower':count_follower})
     
def unfollow(request, users_id):
    user=request.user
    user_id=user.id
    unfollow=Following.objects.filter(user=user_id,users_id=users_id)
    unfollow.delete()
    return JsonResponse({'unfollow':'unfollow'})
    # return HttpResponseRedirect(reverse('index'))



# @login_required()   
def following_post(request):
    # user=request.user 
    # followed_users_ids=[]
    # post_set=set()
    # followed_posts=[]
  
    # follower_ids= user.following_set.all()
    # for ids in follower_ids:
    #     id=ids.users_id
    #     post_set.add(id)
    # followed_users_ids=list(post_set)
    # for followed_user_id in followed_users_ids:
    #     post=Posts.objects.filter(user=followed_user_id)
    #     # followed_posts.append(list(post))
    #     # followed=[posts for posts in post]
    #     followed_posts+=post
  
        
    #     paginator = Paginator(followed_posts, 1)
    #     page = request.GET.get('page2')
    #     try:
    #         followed_posts = paginator.page(page)
    #     except PageNotAnInteger:
    #         followed_posts = paginator.page(1)
    #     except EmptyPage:
    #         followed_posts = paginator.page(paginator.num_pages)
 
    return render(request, 'network/index.html',{'page':'followed_posts'})
    # return render(request,"network/index.html", {'followed_users':followed_posts}) #{'all_posts':all_posts})
    # return render(request,"network/index.html", ) #{'all_posts':all_posts})
    # return JsonResponse([posts.serialize() for posts in followed_posts],safe=False) # this is important one
    # return JsonResponse({'followed_posts':followed_posts})
     

# def edit(request,id):
#     edit_post=Posts.objects.filter(id=id)
#     return render(request,"network/index.html",{'edit_post':edit_post})

# def following_page(request):
#     return HttpResponseRedirect(reverse('following_post'))

@csrf_exempt
def update(request,id):
    user=request.user
    if request.method == 'GET':
       to_be_post=Posts.objects.filter(id=id)
       return JsonResponse([posts.serialize() for posts in to_be_post],safe=False)
        # return JsonResponse({'posts':post},safe=False)

 
    if request.method=='PUT':
        data=json.loads(request.body)
        # if data.get(text_field) is not None:
        text_field=data.get('text_field')
        post=Posts.objects.get(user=user,id=id)
        post.text_field= text_field
        post.save()
        return JsonResponse( {'message':'Successfully updated'},status=200)
    else:
        return JsonResponse( {'error': 'Invalid'}, status=400)
    


@csrf_exempt    
def like(request,post_id):
    if request.method=='POST':
        data=json.loads(request.body)
        post_id=data.get('id')
        user=request.user
        post=Posts.objects.get(id=post_id)
        # print(post)
        user_liked=User.objects.get(posts=post)
       
        liked=Like(user=user_liked,post=post,liking_user=user.id)
        liked.save()
        post_liked=Posts.objects.filter(id=post_id)[0]
        # print(post_liked)
        # like_count=len(Like.objects.filter(post=post_liked))
        like_count=Like.objects.filter(post=post_liked).count()
        # print(like_count)
        return JsonResponse( {'like_count':like_count}, status=200)

    if request.method == 'GET':
        post_liked=Posts.objects.filter(id=post_id)[0]
        # print(post_liked)
        # like_count=len(Like.objects.filter(post=post_liked))
        like_count=Like.objects.filter(post=post_liked).count()
        # print(like_count)
        return JsonResponse( {'like_count':like_count}, status=200)
    
    # if request.method=='GET':
    #         post_liked=Posts.objects.filter(id=post_id)[0]
    #         like_count=len(Like.objects.filter(post=post_liked))
    #         return JsonResponse( {'like_count':like_count}, status=200)


def unlike(request,post_id):
    user=request.user
    # print(post_id)
    post=Posts.objects.get(id=post_id)
    # print(post)
    user_liked=User.objects.get(posts=post)
    get_user=Like.objects.get(liking_user=user.id, post=post)
    # print(get_user)
    get_user.delete()
    # print(get_user)
    return JsonResponse({'user':'disliked'})
   
    # try:
      
    #     # get_user=Like.objects.get(user=user_liked,post=post,liking_user=user.id)
    #     get_user=Like.objects.get(liking_user=user.id)
    #     # print(get_user)
    #     # print(get_user)
    #     if get_user.exists():
    #        get_user.delete()
    #        return JsonResponse({'user':'disliked'})
    # except: #get_user.DoesNotExist()
        # return JsonResponse({'user':'disliked'})

# def get_like(request,post_id):
#     user=request.user
#     if request.method == 'GET':
#          try:
#             likes=Like.objects.filter(liking_user=User.id,post=post_id)
#             if likes.exists():
                

@csrf_exempt 
@login_required() 
def create_comment(request,post_id):
    if request.method == 'POST':
        data=json.loads(request.body)
        comment1=data.get('comment')
        # comment1=request.POST.get('comment')
        user=request.user.username
        # users=User.objects.filter(posts=post_id)[0]
        post=Posts.objects.filter(id=post_id)[0]
        comment2=Comment(post=post,comment=comment1,current_user=user)
        comment2.save()
        return HttpResponseRedirect(reverse('index'))
        # return JsonResponse({'comment':comment2})
    
def comment(request, post_id):
        if request.method == 'GET':
            try:
                users=User.objects.get(posts=post_id)
                post=Posts.objects.get(id=post_id)
                comment3=Comment.objects.filter(post=post) 
                # return JsonResponse([comment.serialize() for comment in comment])
                return JsonResponse([comment.serialize() for comment in comment3],safe=False)
                return JsonResponse({'comment':comment3})
            except:
                return JsonResponse({'comments':'no comment available'})
            
 
           


            
   
   


    






