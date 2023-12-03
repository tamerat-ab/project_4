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
       const form_btn = document.getElementById('form-button');
       const textarea=document.getElementById('#textarea');
       console.log(form_btn);
       form_btn.Disabled=true;
      //  if(textarea.value.length>2){
  
      // form_btn.disabled=false
      // }
      
      const post=document.getElementById("post-form")
      console.log(post)
      form_btn.onclick=(e)=>{
        e.preventDefault();
        // e.stopPropagation();
      const textarea=document.getElementById('textarea').value
      console.log(textarea)
      console.log(textarea.length)
      // form_btn.disabled=true
      if (textarea.length>5){
        form_btn.disabled=false
      }
      else{
        form_btn.disabled=true
      }

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
            // window.location.reload()
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
              const following_btn=document.querySelector('.following-button');

              console.log(following_btn);
              btn_follow.setAttribute('data-follow',user_id)
              btn_unfollow.setAttribute('data-unfollow',user_id)
              following_btn.setAttribute('data-following',user_id)
             const idof_user=JSON.parse(document.getElementById('user_id').textContent);
              console.log(idof_user)
  
             
              if (idof_user !=user_id){
                btn_follow.style.display="block"
                btn_unfollow.style.display="block"
                following_btn.style.display='block'

                }
                else{
                 
                  btn_follow.innerHTML='Followers'
                  btn_unfollow.style.display="none"
                  following_btn.style.display='block'
                }



               for(var i=0; i<data.length; i++){
           

                  const text_field=data[i]['text_field']
                  const date=data[i]['date_created_on']
                  const post_id=data[i]['id']
                  const  user_id=data[i]['user_id']

                  const profile_box=document.createElement('div');
                  profile_box.setAttribute('id', 'profile-box');
                  // const posts=document.querySelector('#all-posts');
                  const posts=document.querySelector(`[data-posts='${profile_id}']`);
                  console.log(posts)
                  const clone=posts.cloneNode(true) ;
                  console.log(clone)

                 
                   clone.querySelector('#username-link').innerHTML = user                
                   clone.querySelector('#username-link').setAttribute('data-profile',user_id)               
                   clone.querySelector('#post-txt').innerHTML =text_field
                   clone.querySelector('#post-date').innerHTML =date   
                   const id_check=JSON.parse(document.getElementById('user_id').textContent)
                   console.log(id_check)
                   console.log(user_id)
                   clone.querySelector('.btn-like-img').setAttribute('data-img',post_id)     
                   if(user_id===id_check){    
                   clone.querySelector('#btn-edit').setAttribute('data-edit',post_id)
                   clone.querySelector('#btn-delete').setAttribute('data-delete',post_id)
                   clone.querySelector('#btn-comment').setAttribute('btn-comments',post_id)
                   }
                   else{
                   if( clone.querySelector('#btn-like')){
                   clone.querySelector('#btn-like').setAttribute('data-like',post_id)}
                   if(  clone.querySelector('#btn-like')){
                   clone.querySelector('#btn-like').setAttribute('data-like',post_id)}
                   if(clone.querySelector('#btn-comment')){
                   clone.querySelector('#btn-comment').setAttribute('btn-comments',post_id)}
                   }
                   clone.querySelector('#comment-box').setAttribute('data-comment',post_id)
                   clone.querySelector('#comment-form').setAttribute('data-form',post_id)
                   clone.querySelector('#comment-area').setAttribute('data-textarea',post_id)
                   clone.querySelector('#comment-input').setAttribute('data-put',post_id)
                   clone.querySelector('#comment-post').setAttribute('data-cpost',post_id)
                 


                    

                
             
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
    // const following_count=document.getElementById('btn-following');
    const following_count=document.querySelector('.flw-btn');
    console.log(following_count);
    follower_count.append(document.createTextNode(follower));   
    following_count.append(document.createTextNode(following))
    console.log(following_count);
    console.log(follower_count)
  
  })
}})

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
  following.onclick=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('create-post').style.display="none";
    document.getElementById('post-container').style.display="none";
    document.getElementById('following-post-container').style.display="block";
    // getElementById('following-post-container').style.display="block";
    document.getElementById('profile-container').style.display="none";
    document.getElementById('edit-post').style.display="none";     
    // document.getElementById('user-following').style.display="block";                  
 ;} //this is the end dont forget 

});


// LIKE AND UNLIKE VIEW STARTS HERE
document.addEventListener('DOMContentLoaded',function(){

  const like_count=document.querySelectorAll('.btn-like-img');
  console.log(like_count);
  // console.log(like.getAttribute('data-like'));
  like_count.forEach(like=>{const like_id=like.getAttribute('data-img');
  if(localStorage.getItem('like_id')){
  console.log(localStorage.getItem('like_id'));
  console.log('local')
  const count_div=document.querySelector(`[data-img='${like_id}']`); 
  const btn_count=document.createElement('div');
  btn_count.setAttribute('id','like-image');
  btn_count.appendChild(document.createTextNode(localStorage.getItem('like_id')));
 console.log(btn_count);
  console.log(count_div)
   count_div.querySelector('.count-display').replaceWith(btn_count)
  console.log(count_div)
 } // the if part ends here
 else{
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
        const count_display=document.createElement('.count-display');
        count_display.querySelector('.count_display').append(btn_count)
         localStorage.setItem('like-id',count) 
      }
      })
 }
 } //the else part ends here

}) // the count localstorage part ends here 

var like_toggle= document.querySelectorAll('#btn-like');
console.log(like_toggle)
like_toggle.forEach((like_toggle)=>{
  const id=like_toggle.getAttribute('data-like')
  console.log(id)
  console.log(localStorage.getItem(id))
  if(localStorage.getItem(id)){
  const id=like_toggle.getAttribute('data-like')
  like_toggle.innerHTML=localStorage.getItem(id)}
})


// const like=document.querySelectorAll('#btn-like');
console.log(like_toggle)
 like_toggle.forEach(like=>{ like.onclick= async(event)=>{
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target.innerHTML);
  var id=event.target.getAttribute('data-like'); 
  console.log(id)
  
  if(event.target.innerHTML==='Like'){
  console.log('like clicked')
  console.log(id);
   await fetch(`${id}/like`,{method:'POST',body:JSON.stringify({id: `${id}`})})
    .then(response=>response.json())
    .then(data=>{
      console.log(data)   
      event.target.innerHTML='Unlike';
//  window.location.reload();
      })
      localStorage.setItem('like','Like');
    } //the if line ends here
    else{
      console.log('unlike clicked')
     console.log(id)
    await fetch(`${id}/unlike`)
     .then(response => response)
     .then(data =>{
      event.target.innerHTML='Like'
       console.log(data)})

     localStorage.setItem('unlike','Unlike')
    }  //else part endes here
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
        //  if(count>0){
          const count_div=document.querySelector(`[data-img='${like_id}']`); 
         
          const btn_count=document.createElement('div');
          btn_count.setAttribute('id','like-image');
          // btn_count.appendChild(document.createTextNode(count))
          console.log(btn_count)
          console.log(count_div)
         
          count_div.append(btn_count)
          count_div.querySelector('#like-image').innerHTML = count
          localStorage.setItem('like_id',count)
        // }
       }); 
    }
    })// like_id part ends here
const like_toggle= document.querySelectorAll('#btn-like');
console.log(like_toggle)
like_toggle.forEach((like_toggle)=>{
  const id=like_toggle.getAttribute('data-like')
  const like_status=like_toggle.innerHTML
  localStorage.setItem(id,like_status)
}) //like_toggle ends here

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

