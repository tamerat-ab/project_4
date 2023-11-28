document.addEventListener('DOMContentLoaded', () =>{
  post_list();
document.getElementById('posts-posts').onclick=post_list();


})


function post_list() {

  document.getElementById('create-post').style.display="block";
  document.getElementById('post-container').style.display="block";
  document.getElementById('following-post-container').style.display="none";
  document.getElementById('profile-container').style.display="none";
  document.getElementById('edit-post').style.display="none";


}
 
//  create post here
 document.addEventListener('DOMContentLoaded',function() {
       const form_btn = document.getElementById('#form-btn');
       const textarea=document.getElementById('#textarea');
      // form_btn.Disabled=true;
      // if(textarea.value>1){
  
      //     form_btn.disabled=false
      // }
      
      const post=document.getElementById("post-form")
      console.log(post)
      post.onsubmit=(e)=>{
        e.preventDefault();
        e.stopPropagation();
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
            .then(data =>{
                        console.log(data) ;
                      
            });
            window.location.reload()
          }
      
        })

function reference(){
  const edit=document.getElementById('')
}

// delete view here
document.addEventListener('DOMContentLoaded', function(){

  const delete_post=document.getElementById('btn-delete') ;
   console.log(delete_post.getAttribute('data-delete')) ;
  delete_post.onclick=(event)=>{
    event.preventDefault();
    event.stopPropagation();
    id=event.target.getAttribute('data-delete')
    console.log(id)
    fetch(`${id}/delete`,
          {method:'PUT', body: JSON.stringify({post_id:`${id}`})})
          .then(response=>response.json())
          .then(data=>{})
          window.location.reload();
  }

})

// profile view here
document.addEventListener('DOMContentLoaded', function(){


  const profile=document.querySelectorAll('#username-link')
  console.log(profile)
  profile.forEach((profile)=>{ profile.onclick=(event)=>{
    const profile_id=event.target.getAttribute('data-profile')     
  console.log(profile_id);
  event.preventDefault() ;
  event.stopPropagation() ;
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
             const idof_user=JSON.parse(document.getElementById('user_id').textContent);
              console.log(idof_user)
  
             
               for(var i=0; i<data.length; i++){
           

                  const text_field=data[i]['text_field']
                  const date=data[i]['date_created_on']
                  const post_id=data[i]['id']
                  const  user_id=data[i]['user_id']

                  if (idof_user !=user_id){
                  btn_follow.style.display="block"
                  btn_unfollow.style.display="block"

                  }
                  else{
                    btn_follow.style.display="none"
                    btn_unfollow.style.display="none"
                  }

                  const profile_box=document.createElement('div');
                  profile_box.setAttribute('id', 'profile-box');
                  const posts=document.querySelector('#all-posts');
                  console.log(posts)
                  const clone=posts.cloneNode(true) ;
                  console.log(clone)

                 
                   clone.querySelector('#username-link').innerHTML = user                
                   clone.querySelector('#username-link').setAttribute('data-profile',user_id)               
                   clone.querySelector('#post-txt').innerHTML =text_field
                   clone.querySelector('#post-date').innerHTML =date             
                   clone.querySelector('.btn-like-img').setAttribute('data-img',post_id)
                   if( clone.querySelector('#btn-edit') ){
                   clone.querySelector('#btn-edit').setAttribute('data-edit',post_id)}
                   if( clone.querySelector('#btn-delete') ){  
                   clone.querySelector('#btn-delete').setAttribute('data-delete',post_id)}
                   clone.querySelector('#btn-comment').setAttribute('btn-comments',post_id)
                   if( clone.querySelector('#btn-like')){
                   clone.querySelector('#btn-like').setAttribute('data-like',post_id)}
                   if(clone.querySelector('#btn-unlike')){
                   clone.querySelector('#btn-unlike').setAttribute('data-unlike',post_id)}
                   clone.querySelector('#comment-box').setAttribute('data-comment',post_id)
                   clone.querySelector('#comment-form').setAttribute('data-form',post_id)
                   clone.querySelector('#comment-area').setAttribute('data-textarea',post_id)
                   clone.querySelector('#comment-input').setAttribute('data-put',post_id)
                   clone.querySelector('#comment-post').setAttribute('data-cpost',post_id)


                    

                //  user_post2.appendChild(document.createTextNode(text_field));
                //  user_post3.appendChild(document.createTextNode(date));
                //  profile_box.append(user_post2, user_post3,edit,like,unlike,delete_post,comment,comment_box);
             
                profile_box.append(clone);
               

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
// }
 })

document.addEventListener('DOMContentLoaded',function() {

  const comment_form=document.querySelectorAll('[data-form]')
  console.log(comment_form)
  comment_form.forEach((comment_form)=>{comment_form.onsubmit=(event) => {
    // event.preventDefault();
    event.stopPropagation();
   id=event.target.getAttribute('data-form');
   console.log('id')
   
    const commentarea = document.querySelector(`[data-textarea='${id}']`).value;
    console.log(commentarea)
    fetch(`${id}/create_comment`, {method:'POST', body:JSON.stringify({comment:`${commentarea}`})})
          .then(response => response.json())
          .then(data => { console.log(data)
            window.location.reloaed();
          })  
          window.location.reloaed();
        }
          // window.location.reloaed();  
  });
 
        

});


document.addEventListener('DOMContentLoaded',function() {
// function comment() {

const comment_box = document.querySelectorAll('[data-comment]');
console.log(comment_box);
comment_box.forEach((comment_box)=>{ comment_box.style.display="none";});

const comment_list=document.querySelectorAll("#btn-comment");
console.log(comment_list);
//  console.log(comment_list.getAttribute('data-ID'));
comment_list.forEach((comment_list)=>{ comment_list.onclick=(event)=>{
  event.preventDefault();
  event.stopPropagation();
  id=event.target.getAttribute('data-comments');
  console.log(id);
document.querySelector(`[data-comment='${id}']`).style.display="block";

 fetch(`${id}/comment`)
 .then(response=>response.json())
 .then(data=>{console.log(data);
  console.log(data.length);
  
  for(var i=0; i< data.length; i++){
    console.log(data.length)
          const commenter1=data[i]['current_user']
          const commenter=commenter1.toUpperCase();
          const comment=data[i]['comment']
          const date=data[i]['date']
          console.log(comment)
          const comment_post=document.querySelector(`[data-cpost="${id}"]`);
          const comment_commenter=document.createElement('div');
          comment_commenter.setAttribute('id','cmnt-name')
          const comment_comment=document.createElement('div');
          comment_comment.setAttribute('id','cmnt-text');
          const comment_date=document.createElement('div');
          comment_date.setAttribute('id','cmnt-date')
          const comment_container=document.createElement('div');
          comment_container.setAttribute('id','cmnt-container')
          console.log(comment_comment)
          comment_commenter.appendChild(document.createTextNode(`${commenter}  :`))
          comment_comment.appendChild(document.createTextNode(comment))
          comment_date.appendChild(document.createTextNode(date))
          comment_container.append(comment_commenter,comment_comment,comment_date)
          comment_post.append(comment_container)
          // comment_post.append(comment_commenter,comment_comment,comment_date)
          console.log(comment_comment)}

        })  

}})

// }
})

// edit view here
document.addEventListener('DOMContentLoaded',function(){
// function edit (){

 const edit= document.querySelectorAll("#btn-edit");
 console.log(edit)


 edit.forEach((edit)=>{edit.onclick=(event)=>{ 
event.preventDefault();
event.stopPropagation();

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
   console.log(id);
   const edit_div=document.getElementById('edit-post');
   const post_form=document.getElementById('post-form');
   const edit_post=post_form.cloneNode(true);
  //  const form=document.querySelector('#post-form');
   const text=document.querySelector('#textarea');
   console.log(text);
   text.setAttribute('data-data',`${id}`);
   edit_post.textarea.innerHTML=text_field
   edit_post.setAttribute('data-data',`${id}`);
   
   edit_div.appendChild(edit_post)
  //  edit_div.appendChild(edit_post)
   console.log(edit_div)
   console.log(edit_post)
   console.log(edit_post.textarea.value);
   edit_post.onsubmit=function(event){
   const texter= event.target.textarea.value
    console.log(texter)
  
    fetch(`${id}/update`,
         {method: 'PUT', body:JSON.stringify({text_field:texter})})
         console.log('method')
         .then(response => response.json())
         .then(data =>{console.log('data')})
         ;}
   })

 }})
// };
})


// following view here
document.addEventListener('DOMContentLoaded',function(){

  // inssert event listeners here
  const following=document.querySelector('#following_url');
  following.onclick=()=>{
    // e.preventDefault();
    // e.stopPropagation();
    document.getElementById('create-post').style.display="none";
    document.getElementById('post-container').style.display="none";
    document.getElementById('following-post-container').style.display="block";
    // getElementById('following-post-container').style.display="block";
    document.getElementById('profile-container').style.display="none";
    document.getElementById('edit-post').style.display="none";     
    document.getElementById('user-following').style.display="block";                  
  

 ;} //this is the end dont forget 

});

// for like view here
document.addEventListener('DOMContentLoaded',function(){

  const like=document.querySelectorAll('#btn-like');
  console.log(like);
 like.forEach((like)=>{ like.onclick=function(event){
  event.preventDefault();
  event.stopPropagation();
  const id=event.target.getAttribute('data-like'); 
  console.log(id);
    fetch(`${id}/like`,{method:'POST',body:JSON.stringify({id: `${id}`})})
    .then(response=>response.json())
    .then(data=>{
      console.log(data)

     
 window.location.reload();
      })
       

}})
  // }
})


// like_count view here
document.addEventListener('DOMContentLoaded',function(){

  like=document.querySelectorAll('.btn-like-img');
  console.log(like);
  // console.log(like.getAttribute('data-like'));
  like.forEach(like=>{const like_id=like.getAttribute('data-img');
  if(typeof (like_id) !=='null'){
    console.log(like_id)
    fetch(`${like_id}/like`)
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
        const count=data['like_count']
        console.log(count)
       if(count>0){
        const count_div=document.querySelector(`[data-img='${like_id}']`); 
       
        const btn_count=document.createElement('div');
        btn_count.setAttribute('id','like-image');
        btn_count.appendChild(document.createTextNode(count))
        count_div.appendChild(btn_count)
      }
     });
  }
  })

})
// unlike view here
document.addEventListener('DOMContentLoaded',function(){

//  const unlike= document.getElementById('btn-unlike')
const user_id=JSON.parse(document.getElementById('user_id').textContent);
console.log(user_id)

 const unlike=document.querySelectorAll('#btn-unlike')
 console.log(unlike)
unlike.forEach((unlike)=>{ unlike.onclick=(event)=>{
//  unlike.onclick=(event) =>{
  console.log('unlike clicked')
   event.stopPropagation()
   event.preventDefault()
  id=event.target.dataset.unlike
  console.log(id)
  fetch(`${id}/unlike`)
  .then(response => response)
  .then(data =>{
    console.log(data)
   
  })
  window.location.reload()
}})

})


// follow view here
document.addEventListener('DOMContentLoaded',function(){
// function follow(){
  const follow= document.getElementById('btn-follow')
  follow.onclick=(event) =>{
     const id=event.target.getAttribute('data-follow');
     fetch(`${id}/follow`,{method: 'POST',body:JSON.stringify({id:`${id}`})})

    .then(response => response.json())
    .then(data =>{
      console.log(data);
      
    })
  }

})
// unfollow view here
document.addEventListener('DOMContentLoaded',function(){

 const unfollow= document.getElementById('unfollow-button')
 unfollow.onclick=(event) =>{
  id=event.target.dataset.unfollow
  fetch(`${id}/unfollow`)
  .then(response=>response.json())
  .then(data=>{console.log(data)})
    // you can show icon collor chnage
  
 }



})



  // fetch('/following_post')
  // .then(response=>response.json())
  // .then(data=>{console.log(data);
  //    for(let i=0; data.length; i++){
  //     const user_following = document.getElementById('user-following');
  //     console.log(user_following)
  //     const text_field=data[i]['text_field']
  //     const date=data[i]['date_created_on']
  //     const post_id=data[i]['id']
  //     const  user_id=data[i]['user_id']
  //     const user=data[i]['user']


  //     const profile_box=document.createElement('div');
  //     profile_box.setAttribute('id', 'profile-box');
  //     const posts=document.querySelector('#all-posts');
  //     // const posts=document.querySelector('#post-container');
  //     console.log(posts)
  //     const clone=posts.cloneNode(true) ;
  //     console.log(clone)
  //     // user_following.append(clone)
     
     
  //      clone.querySelector('#username-link').innerHTML = user                
  //      clone.querySelector('#username-link').setAttribute('data-profile',user_id)               
  //      clone.querySelector('#post-txt').innerHTML =text_field
  //      clone.querySelector('#post-date').innerHTML =date             
  //      clone.querySelector('.btn-like-img').setAttribute('data-img',post_id)
  //      if( clone.querySelector('#btn-edit') ){
  //      clone.querySelector('#btn-edit').setAttribute('data-edit',post_id)}
  //      if( clone.querySelector('#btn-delete') ){  
  //      clone.querySelector('#btn-delete').setAttribute('data-delete',post_id)}
  //      clone.querySelector('#btn-comment').setAttribute('btn-comments',post_id)
  //      if( clone.querySelector('#btn-like')){
  //      clone.querySelector('#btn-like').setAttribute('data-like',post_id)}
  //      if(clone.querySelector('#btn-unlike')){
  //      clone.querySelector('#btn-unlike').setAttribute('data-unlike',post_id)}
  //      clone.querySelector('#comment-box').setAttribute('data-comment',post_id)
  //      clone.querySelector('#comment-form').setAttribute('data-form',post_id)
  //      clone.querySelector('#comment-area').setAttribute('data-textarea',post_id)
  //      clone.querySelector('#comment-input').setAttribute('data-put',post_id)
  //      clone.querySelector('#comment-post').setAttribute('data-cpost',post_id)
  //      user_following.append(clone)

  //    }
  // })






// const user_post1=document.createElement('div');
// user_post1.setAttribute('id', 'user-post1');
// const user_post2=document.createElement('div');
// user_post2.setAttribute('id', 'user-post2');
// const user_post3=document.createElement('div');
// user_post3.setAttribute('id', 'user-post3');
// const profile_box=document.createElement('div');
// profile_box.setAttribute('id', 'profile-box');
// const edit=document.createElement('div');
// edit.setAttribute('id', 'btn-edit');
// edit.setAttribute('data-edit',`${id}`);
// const like=document.createElement('div');
// like.setAttribute('id', 'btn-like');
// like.setAttribute('data-like',`${id}`);
// const unlike=document.createElement('div');
// unlike.setAttribute('id', 'btn-unlike');
// unlike.setAttribute('data-unlike',`${id}`);
// const delete_post=document.createElement('div');
// delete_post.setAttribute('id', 'btn-delete');
// delete_post.setAttribute('data-delete',`${id}`);
// const comment=document.createElement('div');
// comment.setAttribute('id', 'btn-comment');
// comment.setAttribute('data-comments',`${id}`);
// const comment_box=document.createElement('div');
// comment_box.setAttribute('id', 'comment-box');
// comment_box.setAttribute('data-comment',`${id}`);
// const textarea=document.createElement('div');
// textarea.setAttribute('id', 'comment-area');
// textarea.setAttribute('data-textarea',`${id}`);
// textarea.setAttribute('placeholder','comment');
// const input=document.createElement('div');
// input.setAttribute('id', 'comment-input');
// input.setAttribute('data-put',`${id}`);
// input.setAttribute('type','submit');
// input.setAttribute('value','post');
// const comment_post=document.createElement('div');
// comment_post.setAttribute('id', 'comment-post');
// comment_post.setAttribute('data-cpost', `${id}`);




  // fetch('/following_post')
  // .then(response=>response.json())
  // .then(data=>{console.log(data);
    
  //   var length = data.length;


  //    for(let i=0; data.length; i++){
  //     const user_following = document.getElementById('user-following');
  //     console.log(user_following)
  //     const text_field=data[i]['text_field']
  //     const date=data[i]['date_created_on']
  //     const post_id=data[i]['id']
  //     const  user_id=data[i]['user_id']
  //     const user=data[i]['user']


  //     const profile_box=document.createElement('div');
  //     profile_box.setAttribute('id', 'profile-box');
  //     const posts=document.querySelector('#all-posts');
  //     // const posts=document.querySelector('#post-container');
  //     console.log(posts)
  //     const clone=posts.cloneNode(true) ;
  //     console.log(clone)
  //     // user_following.append(clone)
     
     
  //      clone.querySelector('#username-link').innerHTML = user                
  //      clone.querySelector('#username-link').setAttribute('data-profile',user_id)               
  //      clone.querySelector('#post-txt').innerHTML =text_field
  //      clone.querySelector('#post-date').innerHTML =date             
  //      clone.querySelector('.btn-like-img').setAttribute('data-img',post_id)
  //      if( clone.querySelector('#btn-edit') ){
  //      clone.querySelector('#btn-edit').setAttribute('data-edit',post_id)}
  //      if( clone.querySelector('#btn-delete') ){  
  //      clone.querySelector('#btn-delete').setAttribute('data-delete',post_id)}
  //      clone.querySelector('#btn-comment').setAttribute('btn-comments',post_id)
  //      if( clone.querySelector('#btn-like')){
  //      clone.querySelector('#btn-like').setAttribute('data-like',post_id)}
  //      if(clone.querySelector('#btn-unlike')){
  //      clone.querySelector('#btn-unlike').setAttribute('data-unlike',post_id)}
  //      clone.querySelector('#comment-box').setAttribute('data-comment',post_id)
  //      clone.querySelector('#comment-form').setAttribute('data-form',post_id)
  //      clone.querySelector('#comment-area').setAttribute('data-textarea',post_id)
  //      clone.querySelector('#comment-input').setAttribute('data-put',post_id)
  //      clone.querySelector('#comment-post').setAttribute('data-cpost',post_id)
  //      user_following.append(clone)

  //    }
  // })



  // function edit_edit(){
//   const div1=document.querySelectorAll('[data-data]');
//   console.log(div1);
//   div1.onsubmit=function(event){
//   const id=event.target.getAttribute('data-data')
//    const texter=document.querySelector('#textarea')
//    fetch(`${id}/update`,
//         {method: 'PUT', body:json.stringify({text_field:texter})})
//         console.log('method')
//         .then(response => response.json())
//         .then(data =>{console.log(data)})
//         ;}
// }