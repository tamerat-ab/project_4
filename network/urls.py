
from django.urls import path 
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_post", views.create_post, name="create_post"),
    path("<int:page>/post_list", views.post_list, name="post_list"),
    path("<int:user_id>/profile", views.profile, name="profile"),
    path("following_post", views.following_post, name="following_post"),
    path("<int:users_id>/follow", views.follow, name="follow"),
    path("<int:users_id>/unfollow", views.unfollow, name="unfollow"),
    path("<int:id>/edit", views.edit, name="edit"),
    path("<int:id>/update", views.update, name="update"),
    path("<int:post_id>/like", views.like, name="like"),
    path("<int:post_id>/unlike", views.unlike, name="unlike"),
    path("<int:post_id>/comment", views.comment, name="comment"),
    path("<int:post_id>/count_follow", views.count_follow, name="count_follow"),
    path("<int:post_id>/delete", views.delete, name="delete"),
]
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)