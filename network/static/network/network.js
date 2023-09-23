document.addEventListener('DOMContentLoaded', () =>{
  // post_list();
 document.getElementById('posts').onclick=post_list();
  create_post();
  delete_post();
  profile();
  following();
  like();
  unlike();
  follow();
  unfollow();
  comment();
  edit();
  create_comment();
  like_count();
  // count_follow();
  post_list();

})

function post_list() {

  document.getElementById('create-post').style.display="block";
  document.getElementById('post-container').style.display="block";
  document.getElementById('following-post-container').style.display="none";
  document.getElementById('profile-container').style.display="none";
 document.getElementById('edit-post').style.display="none";
 }
 
function create_post(){ 
      const post=document.getElementById("post-form")
      console.log(post)
      post.onsubmit=()=>{
      const textarea=document.getElementById('textarea').value
      console.log(textarea)
    
      fetch('/create_post',
          {  headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
                      },
            method:'POST',
            body:JSON.stringify({textarea:`${textarea}`})})
            .then(response => response.json())
            .then(data =>{const success=data['success'] ;
                         console.log(success)
                        alert('you post is ready!');
                        // you can crete a popup message here
            });
          }}

function delete_post(){
  const delete_post=document.getElementById('btn-delete') ;
   console.log(delete_post.getAttribute('data-delete')) ;
  delete_post.onclick=(event)=>{
    id=event.target.getAttribute('data-delete')
    console.log(id)
    fetch(`${id}/delete`,
          {method:'PUT', body: JSON.stringify({post_id:`${id}`})})
          .then(response=>response.json())
          .then(data=>{})
          // you can create a popup message here
  }
};


 function profile(){

  const profile=document.querySelectorAll('#username-link')
  console.log(profile)
  profile.forEach((profile)=>{ profile.onclick=(event)=>{
    const profile_id=event.target.getAttribute('data-profile')     
  console.log(profile_id);

  document.getElementById('create-post').style.display="block";
  document.getElementById('post-container').style.display="none";
  document.getElementById('following-post-container').style.display="none";
  document.getElementById('profile-container').style.display="block";
  document.getElementById('edit-post').style.display="none";

  // id = event.target.profile.setdata.profile
  fetch(`/${profile_id}/profile`)
  .then(response => response.json())
  .then(data =>{console.log(data)
              const user=data[0]['user']; 
              const user_id=data[0]['user_id'];
              const id=data[0]['id'];

              const username=document.getElementById('user-name-div');
              console.log(username);
              username.appendChild(document.createTextNode(user));
              const btn_follow=document.getElementById('btn-follow');
              const btn_unfollow=document.getElementById('btn-unfollow');
              btn_follow.setAttribute('data-follow',user_id)
              btn_unfollow.setAttribute('data-unfollow',user_id)

          
              // console.log(user_post1);
             
               for(var i=0; i<data.length; i++){
                 
                  const text_field=data[i]['text_field']
                  const date=data[i]['date_created_on']
                  const id=data[i]['id']


                  const user_post1=document.createElement('div');
                  user_post1.setAttribute('id', 'user-post1');
                  const user_post2=document.createElement('div');
                  user_post2.setAttribute('id', 'user-post2');
                  const user_post3=document.createElement('div');
                  user_post3.setAttribute('id', 'user-post3');
                  const profile_box=document.createElement('div');
                  profile_box.setAttribute('id', 'profile-box');
                  const edit=document.createElement('div');
                  edit.setAttribute('id', 'btn-edit');
                  edit.setAttribute('data-edit',`${id}`);
                  const like=document.createElement('div');
                  like.setAttribute('id', 'btn-like');
                  like.setAttribute('data-like',`${id}`);
                  const unlike=document.createElement('div');
                  unlike.setAttribute('id', 'btn-unlike');
                  unlike.setAttribute('data-unlike',`${id}`);
                  const delete_post=document.createElement('div');
                  delete_post.setAttribute('id', 'btn-delete');
                  delete_post.setAttribute('data-delete',`${id}`);
                  const comment=document.createElement('div');
                  comment.setAttribute('id', 'btn-comment');
                  comment.setAttribute('data-comments',`${id}`);
                  const comment_box=document.createElement('div');
                  comment_box.setAttribute('id', 'comment-box');
                  comment_box.setAttribute('data-comment',`${id}`);
                  const textarea=document.createElement('div');
                  textarea.setAttribute('id', 'comment-area');
                  textarea.setAttribute('data-textarea',`${id}`);
                  textarea.setAttribute('placeholder','comment');
                  const input=document.createElement('div');
                  input.setAttribute('id', 'comment-input');
                  input.setAttribute('data-put',`${id}`);
                  input.setAttribute('type','submit');
                  input.setAttribute('value','post');
                  const comment_post=document.createElement('div');
                  comment_post.setAttribute('id', 'comment-post');
                  comment_post.setAttribute('data-cpost', `${id}`);
    
                 user_post2.appendChild(document.createTextNode(text_field));
                 user_post3.appendChild(document.createTextNode(date));
                 profile_box.append(user_post2, user_post3,edit,like,unlike,delete_post,comment,comment_box);

                const all_profile=document.getElementById('all-profile');
                all_profile.appendChild(profile_box);
                 
}

  })

  fetch(`${profile_id}/count_follow`)
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    const following=data['following'];
    const follower=data['follower'];
    const follower_count=document.getElementById('btn-count');
    const following_count=document.getElementById('btn-following');
    follower_count.appendChild(document.createTextNode(follower));
    following_count.appendChild(document.createTextNode(following)) })
}})
}

function create_comment(){
  const comment_form=document.querySelectorAll('[data-form]')
  console.log(comment_form)
  comment_form.forEach((comment_form)=>{comment_form.onsubmit=(event) => {
   id=event.target.getAttribute('data-form');
   console.log('id')
    // const commentarea = document.getElementById('comment-area').value;
    // id=16
    const commentarea = document.querySelector(`[data-textarea='${id}']`).value;
    fetch(`${id}/create_comment`, {method:'POST', body:JSON.stringify({comment:`${commentarea}`})})
          .then(response => response.json())
          .then(data => { console.log(data)})   }
  });
  
          console.log('data received');
  
}

function comment() {

const comment_box = document.querySelectorAll('[data-comment]');
console.log(comment_box);
comment_box.forEach((comment_box)=>{ comment_box.style.display="none";});

const comment_list=document.querySelectorAll("#btn-comment");
console.log(comment_list);
//  console.log(comment_list.getAttribute('data-ID'));
comment_list.forEach((comment_list)=>{ comment_list.onclick=(event)=>{
  id=event.target.getAttribute('data-comments');
  console.log(id);
document.querySelector(`[data-comment='${id}']`).style.display="block";

 fetch(`${id}/comment`)
 .then(response=>response.json())
 .then(data=>{console.log(data);
  console.log(data.length);
  
  for(var i=0; i< data.length; i++){
    console.log(data.length)
          const commenter=data[i]['current_user']
          const comment=data[i]['comment']
          const date=data[i]['date']
          console.log(comment)
          const comment_post=document.querySelector(`[data-cpost="${id}"]`);
          const comment_commenter=document.createElement('div');
          const comment_comment=document.createElement('div');
          const comment_date=document.createElement('div');
          console.log(comment_comment)
          comment_commenter.appendChild(document.createTextNode(commenter))
          comment_comment.appendChild(document.createTextNode(comment))
          comment_date.appendChild(document.createTextNode(date))
          comment_post.append(comment_commenter,comment_comment,comment_date)
          console.log(comment_comment)}

        })  

}})

}

function edit (){

 const edit= document.querySelectorAll("#btn-edit");
 console.log(edit)


 edit.forEach((edit)=>{edit.onclick=(event)=>{ 


   const id=event.target.getAttribute('data-edit');
   console.log(id);
   document.getElementById('edit-post').style.display="block";
   document.getElementById('create-post').style.display="none";
   document.getElementById('post-container').style.display="none";
   document.getElementById('following-post-container').style.display="none";
   document.getElementById('profile-container').style.display="none";
  

  fetch(`${id}/update`)
  .then(response=>response.json())
  .then(data=>{
  
   const username=data[0]['user']
   const text_field=data[0]['text_field'];
   const date =data[0]['date'];
   const id = data[0]['id'];
   const edit_div=document.getElementById('edit-post');
   const post_form=document.getElementById('post-form');
   const edit_post=post.cloneNode(true);
  //  const form=document.querySelector('#post-form');
   const text=document.querySelector('#textarea');
  //  text.value=text_field
   text.innerHTML=text_field
   edit_div.appendChild(edit_post)
   form.onsubmit=function(){
    fetch(`${id}/update`,
         {method: 'PUT', body:json.stringify({text_field:text_field})});};

  });
 }})
};

function following (){
  // inssert event listeners here
  const following=document.querySelector('#following_url');
  following.onclick=()=>{

    document.getElementById('create-post').style.display="none";
    document.getElementById('post-container').style.display="none";
    document.getElementById('following-post-container').style.display="block";
    document.getElementById('profile-container').style.display="none";
    document.getElementById('edit-post').style.display="none";                      
                         

  fetch('/following_post')
  .then(response=>response.json())
  .then(data=>{console.log(data);

    const following_post=document.querySelector('#following-post')
    const div_following=document.createElement('div');
    const div_following1=document.createElement('div')
    const div_following2=document.createElement('div')
     for(var i=0;data.length;i++){
      username=data[i]['user'];
      text_field=data[i]['text_field'];
      date=data[i]['date_created_on'];
      div_following.appendChild(document.createTextNode(username));
      div_following1.appendChild(document.createTextNode(text_field));
      div_following2.appendChild(document.createTextNode(date_created_on));
      following_post.appendChild(div_following, div_following1,div_following2);
     }
  });}
}

function like(){
  const like=document.querySelectorAll('#btn-like');
  console.log(like);
 like.forEach((like)=>{ like.onclick=function(event){
  const id=event.target.getAttribute('data-like'); 
  console.log(id);
    fetch(`${id}/like`,{method:'POST',body:JSON.stringify({id: `${id}`})})
    .then(response=>response.json())
    .then(data=>{
      console.log(data)

      })
        console.log('like')

}})
  }
function like_count(){
  like=document.querySelectorAll('#btn-like');
  // console.log(like.getAttribute('data-like'));
  like.forEach(like=>{const like_id=like.getAttribute('data-like');
  if(typeof (like_id) !=='null'){
    console.log(like_id)
    fetch(`${like_id}/like`)
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
        const count=data['like_count']
        console.log(count)
        // for(let i=0; i<data.length; i++){
        const count_div=document.querySelector(`[data-like='${like_id}']`); 
       
        const btn_count=document.createElement('div');
        btn_count.setAttribute('id','like-image');
        btn_count.appendChild(document.createTextNode(count))
        count_div.appendChild(btn_count)
      //  }
     });
  }
  })

}

function unlike(){
 const unlike= document.getElementById('btn-unlike')
 unlike.onclick=(event) =>{
  id=event.target.dataset.unlike
  fetch(`${id}/unlike`)
  .then(response => response)
  .then(data =>{
    console.log(data)
    if(data['user'=='disliked']){
      // write a code that changes the style of the icone
    }
  })
 }
}

function follow(){
  const follow= document.getElementById('btn-follow')
  follow.onclick=(event) =>{
     const id=event.target.getAttribute('data-follow');
     fetch(`${id}/follow`,{method: 'POST',body:JSON.stringify({id:`${id}`})})

    .then(response => response.json())
    .then(data =>{
      console.log(data);
      
    })
  }

}


function unfollow(){
 const unfollow= document.getElementById('unfollow-button')
 unfollow.onclick=(event) =>{
  id=event.target.dataset.unfollow
  fetch(`${id}/unfollow`)
  .then(response=>response.json())
  .then(data=>{console.log(data)})
    // you can show icon collor chnage
  
 }


}


