
# <!-- {% block body %}

# <div id="create_post_div">
 

#   <form id="post-form" action="{% url 'create_post' %}" method="POST">
      
#       {% csrf_token %}
#       <textarea name="text_field" id="textarea"  placeholder="write your post here"></textarea> <br>
#       <button id="form_button" type="submit">post</button>
#      </form>
  
#   </div>

#  "C:\Users\tamer\Downloads\friends.jpg"

# <div id="post_lister">
  
# {% for post in posts_list %}
#  <div id="all_posts">

#               <div id="post_list">
                      
#                       <a data-profile="{{user.id}}" id="username-link" href="{% url 'profile' post.user.id %}">{{post.user.username}}</a> <br>
#                       <h3>{{post.text_field}} </h3> <br>
#                       <h3>{{post.date_created_On}} </h3> <br>
#                       <a data-ID="{{post.id}}" id="btn-post1" href="">edit</a>
#                       <a data-ID="{{post.id}}" id="btn-post2" href="{% url 'like' post.id %}"> like</a>
#                       <a data-ID="{{post.id}}" id="btn-post3" href="{% url 'unlike' post.id %}"> unlike</a><br>
#                       <a data-ID="{{post.id}}" id="btn-post4" href="{% url 'delete' post.id %}"> Delete</a><br>
#                       <button data-id="{{post.id}}" id="btn-post5">Comments</button>

#                       <a data-ID="{{post.id}}" id="btn-post1" href="">edit</a>
#                       <div id="count-div"> <a data-ID="{{post.id}}" id="btn-like" href="{% url 'like' post.id %}"> like</a> <div id="like-image"></div></div>
#                       <a data-ID="{{post.id}}" id="btn-unlike" href="{% url 'unlike' post.id %}"> unlike</a><br>
#                       <a data-ID="{{post.id}}" id="btn-delete" href="{% url 'delete' post.id %}"> Delete</a><br>
#                       <button data-id="{{post.id}}" id="btn-comment">Comments</button>
#               </div>

#               <div id="comment-box">
#                       <form id="comment-form" action="{% url 'comment' post.id %}" method="post">
#                         {% csrf_token %}
#                       <div id=comment-1> <textarea name="comment" id="comment-area" cols="" rows="2" placeholder="comment"></textarea> </div> 
#                       <div id="comment-2"><input type="submit" value="post" name="" id="comment-input"></div>
                    
#                       </form>
                    
            

#               <div id="comment-post">
                    
                    
#               </div>
#             </div>
# </div>
# {% endfor %}
# </div>


# <div id="following-post">   
#         <h1>this is following pages</h1>  
#         {% for query in followed_users%}     
#         {% for post in query %}
#             <div id="user_following">
#             <h2>{{post.user.username}} </h2> <br>
#             <h2>{{post.text_field}} </h2> <br>
#             <a data-id="{{post.id}}" id="edit" href="{% url 'edit' post.id %}">edit</a>
#             <a id="{{post.id}}" href="{% url 'like' post.id %}"> like</a>
#             <a id="{{post.id}}" href="{% url 'unlike' post.id %}"> unlike</a><br>
#             </div>
#         {% endfor%} 
#         {% endfor%}
# </div>       
     
# <div id="user_profile">
#         <div id="follow-count">
#           count_following  {{following }}
#           count_follower {{follower}}
#           count {{count}}
#           </div>
  
          


#                   {% if users_id %}
#                       <div id="user-name-div">
#                         <h1 id="user_name">{{user_name}} </h1>
#                       </div>
                      
#                    <div id="follow-unfollow">
#                         <div id="follow-button">
#                           <a id="follow_link" href="{% url 'follow' users_id %}">Follow</a>  
#                         </div> 
#                   {% endif %}  
                

#                     <div id="unfollow-button">
#                       {% if users_id %}
#                           <a id="follow_link" href="{% url 'unfollow' users_id %}">Unfollow</a>   
#                       {% endif %}    
#                     </div> 
          
#               </div>
#     {% for post in user_posts %}
#             <div id="post_list-1">
#                   <h3>{{post.user.username}} </h3> <br>
#                   <h3>{{post.text_field}} </h3> <br>
#                   <h3>{{post.date_created_On}} </h3> <br>
#                   <h3>{{post.comment}} </h3> 
              

#                 <a id="{{post.id}}" href="{% url 'edit' post.id %}">edit</a>
#                 <a id="{{post.id}}" href="{% url 'like' post.id %}"> like</a>
#                 <a id="{{post.id}}" href="{% url 'unlike' post.id %}"> unlike</a><br>
#             </div>

#             <div id="comment-box">
#                     <form id="comment-form" action="{% url 'comment' post.id %}" method="post">
#                     {% csrf_token %}
#                   <div id=comment-1> <textarea name="comment" id="comment-area" cols="" rows="2" placeholder="comment"></textarea> </div> 
#                   <div id="comment-2"><input type="submit" value="post" name="" id="comment-input"></div>
                
#                   </form>
#             </div>
#       {% endfor %}
    
# </div>



# <<div id=edit-post>
#           {% for post in edit_post %}
#                   <form id="post_form" action="{% url 'update' post.id %}" method="post">
#                     {% csrf_token %}

#                     <textarea name="text_field" id="textarea" >{{post.text_field}}</textarea> <br>
#                     <button data-edit="form_button" type="submit">update</button>
#                   </form>
             
#           {% endfor %} 
# </div>


# {% endblock %} -->
