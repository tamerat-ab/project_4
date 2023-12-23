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
 
// CREATE POST STARTS HERE
 document.addEventListener('DOMContentLoaded',function() {
       const form_btn = document.getElementById('form-button');
       console.log(form_btn);
       const textarea=document.getElementById('textarea');
       console.log(textarea);
       form_btn.disabled=true;
       textarea.onkeyup=()=>{
        if(textarea.value.length>0)
         { form_btn.disabled=false}
        else{form_btn.disabled=true}
       }
       console.log(form_btn)
      
      const post=document.getElementById("post-form")
      console.log(post)
      form_btn.onclick=(e)=>{
        e.preventDefault();
       
      const textarea=document.getElementById('textarea').value
      console.log(textarea)
      console.log(textarea.length)
     
    // POSTS CREATE POST CONTENT
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



// POST DELETE CODE STARTS HERE
document.addEventListener('DOMContentLoaded', function(){

  const delete_post=document.getElementById('btn-delete') ;
   
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

// USER PROFILE CODE STARTS HERE
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

// FETCHS USER'S PROFILE INCLUDING HIS/HER POST
  fetch(`/${profile_id}/profile`)
  .then(response => response.json())
  .then(data =>{console.log(data)
              const user=data['profile'][0]['user']; 
              const user_id=data['profile'][0]['user_id'];
              const id=data['profile'][0]['id'];
              const following=data['following'];
           
 

              const username=document.getElementById('user-name-div');
             
              username.appendChild(document.createTextNode(user));
              const btn_follow=document.getElementById('btn-follow');
              const btn_unfollow=document.getElementById('btn-unfollow');
              const following_btn=document.querySelector('.following-button');

            
              btn_follow.setAttribute('data-follow',user_id)
              btn_unfollow.setAttribute('data-unfollow',user_id)
              following_btn.setAttribute('data-following',user_id)
             const idof_user=JSON.parse(document.getElementById('user_id').textContent); // CURRENT USER ID
             
  
             //CHECKS USER'S ID
              if (idof_user !=user_id && following==true){
                btn_follow.innerHTML='Unfollow'
                btn_unfollow.style.display="none"
                following_btn.style.display='block'

                }
           
                else if(idof_user !=user_id && following==false){
                 
                  btn_follow.innerHTML='Follow'
                  btn_unfollow.style.display="none"
                  following_btn.style.display='block'
                }

          
               else{
                btn_follow.innerHTML='Followers'
                btn_unfollow.style.display="none"
                following_btn.style.display='block'
               }

               for(var i=0; i<data['profile'].length; i++){
           

                  const text_field=data['profile'][i]['text_field']
                
                  const date=data['profile'][i]['date_created_on']
                  const post_id=data['profile'][i]['id']
                  console.log(post_id)
                  const  user_id=data['profile'][i]['user_id']
                  console.log(user_id)

                  const profile_box=document.createElement('div');
                  profile_box.setAttribute('id', 'profile-box');
                  // const posts=document.querySelector('#all-posts');
                  const posts=document.querySelector(`[data-posts='${profile_id}']`);
                  const clone=posts.cloneNode(true) ;
                 
                   clone.querySelector('#username-link').innerHTML = user                
                   clone.querySelector('#username-link').setAttribute('data-profile',user_id)               
                   clone.querySelector('#post-txt').innerHTML =text_field
                   clone.querySelector('#post-date').innerHTML =date   

                   const id_check=JSON.parse(document.getElementById('user_id').textContent)
    
                   
                   clone.querySelector('.btn-like-img').setAttribute('data-img',post_id)   
               
                   if(user_id===id_check){  
                    
                    clone.querySelector('#btn-edit').style.display='none'
                    clone.querySelector('#btn-delete').style.display='none'
                    clone.querySelector('#btn-comment').style.display='none'
                    clone.querySelector('#image').style.display='block'

                   }
                   else{


                    clone.querySelector('#btn-like').style.display='none'
                    clone.querySelector('#btn-comment').style.display='none'
                    clone.querySelector('#image').style.display='none'

                   if( clone.querySelector('#btn-like')){
                   clone.querySelector('#btn-like').setAttribute('data-like',post_id)}
                   if(  clone.querySelector('#btn-like')){
                   clone.querySelector('#btn-like').setAttribute('data-like',post_id)}
                   }
                   if(clone.querySelector('#btn-comment')){
                    clone.querySelector('#btn-comment').style.display='none'
                    clone.querySelector('#image').style.display='block'
                 
                   }

                  const btn_comment=clone.querySelector('#btn-comment')
              

                  clone.querySelector('#comment-box').setAttribute('data-comment',post_id)

               
                  // console.log(clone.querySelector('#comment-box'))
                  //  clone.querySelector('#comment-form').setAttribute('data-form',post_id)
                  //  clone.querySelector('#comment-area').setAttribute('data-textarea',post_id)
                  //  clone.querySelector('#comment-input').setAttribute('data-put',post_id)
                  //  clone.querySelector('#comment-post').setAttribute('data-cpost',post_id)
                 
                profile_box.append(clone);
               

                const all_profile=document.getElementById('all-profile');
                all_profile.append(profile_box);


               
                 
}





  })
  //  DISPLAYS THE COUNT OF FOLLOWERS  AND THE WHAT THE USER FOLLOWS
  fetch(`${profile_id}/count_follow`)
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    const following=data['following'];
    const follower=data['follower'];
    const follower_count=document.getElementById('btn-count');
   
    const following_count=document.querySelector('.flw-btn');
    console.log(following_count);
    follower_count.append(document.createTextNode(follower));   
    following_count.append(document.createTextNode(following))
    console.log(following_count);
    console.log(follower_count)
  
  })//count view ends here
  
  // THE FOLLOW UNFOLLOW CODE STARS HERE
  const follow= document.getElementById('btn-follow')
  follow.onclick=(event) =>{
    event.preventDefault();
    event.stopPropagation();
   const user_id= JSON.parse(document.getElementById('user_id').textContent)
    console.log(event.target.innerHTML);
    const id=event.target.getAttribute('data-follow');
   
    if(user_id !=id && localStorage.getItem(`follower${id}`)&& localStorage.getItem(id)&&localStorage.getItem(`following${id}`)) {
    const follower_count=document.getElementById('btn-count');
    follower_count.innerHTML= localStorage.getItem(`follower${id}`); 
    // follow.innerHTML=localStorage.getItem(id) 
    const following_count=document.querySelector('.flw-btn');  
    following_count.innerHTML =localStorage.getItem(`following${id}`)
   }
    else if(user_id ==id && localStorage.getItem(`user${id}`)){
    const folllow =document.getElementById('btn-follow')
    folllow.innerHTML=localStorage.getItem(`user${id}`);
    }

 
   console.log(event.target.innerHTML)
   const status= event.target.innerHTML
 if  (event.target.innerHTML=='Follow'){
    //  const id=event.target.getAttribute('data-follow');
     fetch(`${id}/follow`,{method: 'POST',body:JSON.stringify({id:`${id}`})})

    .then(response => response.json())
    .then(data =>{
      console.log(data);
      console.log(data['following'])
      // event.target.innerHTML='Unfollow'

      const follower_count=document.getElementById('btn-count');
      const following_count=document.querySelector('.flw-btn');
      console.log(following_count);
      follower_count.innerHTML=data['follower'];  
      console.log(follower_count.innerHTML)
      following_count.innerHTML=data['following']
      console.log(following_count.innerHTML)
      console.log(event.target.innerHTML);
      event.target.innerHTML='Unfollow'
      console.log(event.target.innerHTML)
      localStorage.setItem(id,'Unfollow')
      localStorage.setItem(`following${id}`,data['following'])
      localStorage.setItem(`follower${id}`,data['follower'])

      //  page_id='Unfollow'
      // history.pushState({page_id},`Profile:${page_id}`,`./Profile/${page_id}`)
      
    })
  }// the if part ends here
  // THE UNFOLLOW PART STARS HERE
  else if(event.target.innerHTML=='Unfollow'){
  const unfollow= document.getElementById('unfollow-button')
   fetch(`${id}/unfollow`)
   .then(response=>response.json())
   .then(data=>{console.log(data)
    const follower_count=document.getElementById('btn-count');
    const following_count=document.querySelector('.flw-btn');
    console.log(event.target.innerHTML)
    event.target.innerHTML='Follow'
    follower_count.innerHTML=data['follower'];   
    console.log(follower_count.innerHTML)
    following_count.innerHTML=data['following']
    console.log(following_count.innerHTML)
   localStorage.setItem(id,'Follow')
   localStorage.setItem(`following${id}`,data['following'])
   localStorage.setItem(`follower${id}`,data['follower'])
  })
    
} //else if part ends here
else{
  console.log(event.target.innerHTML)
  event.target.innerHTML='Followers'
  
  localStorage.setItem(`user${id}`,'Followers')
}
  } // if else part ends here

//   const page_id= event.target.innerHTML
//   console.log(page_id)
// history.replaceState({page_id},`Profile:${page_id}`,`./Profile/${page_id}`)
}})

 })



// COMMENT FOR BOTH ALL-POSTS AND FOLLOWING STARTS HERE
document.addEventListener('DOMContentLoaded',function() {
// COMMENT CODE FOR ALL-POSTS
const comment_box = document.querySelectorAll('#comment-box');
console.log(comment_box);
comment_box.forEach((comment_box)=>{ comment_box.style.display="none";});

const comment_list=document.querySelectorAll("#btn-comment");
console.log(comment_list);
//  console.log(comment_list.getAttribute('data-ID'));
comment_list.forEach((comment_list)=>{ comment_list.onclick=(event)=>{
  event.preventDefault();
  event.stopPropagation();
 var id=event.target.getAttribute('data-comments');
  console.log(id);

document.querySelector(`[data-comment='${id}']`).style.display="block";

console.log(this.querySelector(`[data-comment='${id}']`))
console.log(this.querySelector(`[data-comment='p${id}']`))

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
          const comment_container=document.querySelector(`[data-container="${id}"]`);
         
          clone=comment_container.cloneNode(true);
          clone=comment_container.cloneNode(true);
          clone.querySelector('#cmnt-name').append(document.createTextNode(commenter))     
          clone.querySelector('#cmnt-text').append(document.createTextNode(comment))  
          clone.querySelector('#cmnt-date').append(document.createTextNode(date))
          comment_post.append(clone)
             
          }
  // } //function ends here
 
  // WRITE A CODE FOR COMMETN
  const comment_form=document.querySelector(`[data-form="${id}"]`) 
  const input=document.querySelector(`[data-put="${id}"]`)
  const commentarea = document.querySelector(`[data-textarea='${id}']`);
  // const commentarea = document.querySelector(`[data-textarea='${id}']`).value;
  console.log(input)
 
  input.disabled =true
  commentarea.onkeyup = () => {
    if(commentarea.value.length > 0) {
    input.disabled =false}
    else {input.disabled =true}
  };
  input.onclick=(event) => {
        event.preventDefault();
        event.stopPropagation();
       
        const commentarea = document.querySelector(`[data-textarea='${id}']`).value;
       
        console.log(commentarea)
        fetch(`${id}/create_comment`, {method:'POST', body:JSON.stringify({comment:`${commentarea}`})})
              .then(response => response.json())
              .then(data => { console.log(data)
               
                const comment_post=document.querySelector(`[data-cpost="${id}"]`);
                comment_post.innerHTML=''
                for(var i=0; i< data.length; i++){
                const commenter1=data[i]['current_user']
                const commenter=commenter1.toUpperCase();
                const comment=data[i]['comment']
                const date=data[i]['date']
                console.log(comment)
                const comment_post=document.querySelector(`[data-cpost="${id}"]`);
                const comment_container=document.querySelector(`[data-container="${id}"]`);
                clon=comment_container.cloneNode(true);
            
                
                clon.querySelector('#cmnt-name').append(document.createTextNode(commenter))
               
                clon.querySelector('#cmnt-text').append(document.createTextNode(comment))
                
                clon.querySelector('#cmnt-date').append(document.createTextNode(date))
      
                comment_post.append(clon)
                }

              
              })  
            input.disabled=true
            }; //posting ends here

        })  //exists

 var id=event.target.getAttribute('data-comments');
  console.log(id);

document.querySelector(`[data-comment='p${id}']`).style.display="block";


console.log(this.querySelector(`[data-comment='p${id}']`))
console.log(this.querySelector(`[data-comment='p${id}']`))

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
          const comment_post=document.querySelector(`[data-cpost="p${id}"]`);
          const comment_container=document.querySelector(`[data-container="p${id}"]`);
         
          clone=comment_container.cloneNode(true);
          clone=comment_container.cloneNode(true);
          clone.querySelector('#cmnt-name').append(document.createTextNode(commenter))     
          clone.querySelector('#cmnt-text').append(document.createTextNode(comment))  
          clone.querySelector('#cmnt-date').append(document.createTextNode(date))
          comment_post.append(clone)
         


      
          }
  // } //function ends here
 
  // COMMENT CODE FOR FOLLOWING PAGE STATS HERE
  const comment_form=document.querySelector(`[data-form="p${id}"]`) 
  const input=document.querySelector(`[data-put="p${id}"]`)
  const commentarea = document.querySelector(`[data-textarea='p${id}']`);
  // const commentarea = document.querySelector(`[data-textarea='${id}']`).value;
  console.log(input)
 
  input.disabled =true
  commentarea.onkeyup = () => {
    if(commentarea.value.length > 0) {
    input.disabled =false}
    else {input.disabled =true}
  };
  input.onclick=(event) => {
        event.preventDefault();
        event.stopPropagation();
       
        const commentareap = document.querySelector(`[data-textarea='p${id}']`).value;
       
        console.log(commentarea)
        fetch(`${id}/create_comment`, {method:'POST', body:JSON.stringify({comment:`${commentareap}`})})
              .then(response => response.json())
              .then(data => { console.log(data)
               
                const comment_post=document.querySelector(`[data-cpost="p${id}"]`);
                comment_post.innerHTML=''
                for(var i=0; i< data.length; i++){
                const commenter1=data[i]['current_user']
                const commenter=commenter1.toUpperCase();
                const comment=data[i]['comment']
                const date=data[i]['date']
                console.log(comment)
                const comment_postp=document.querySelector(`[data-cpost="p${id}"]`);
                const comment_containerp=document.querySelector(`[data-container="p${id}"]`);
                clon=comment_containerp.cloneNode(true);
            
                
                clon.querySelector('#cmnt-name').append(document.createTextNode(commenter))
               
                clon.querySelector('#cmnt-text').append(document.createTextNode(comment))
                
                clon.querySelector('#cmnt-date').append(document.createTextNode(date))
      
                comment_postp.append(clon)
                }

              
              })  
            input.disabled=true
            }; //posting ends here

        })  //exists

}})

// }
})

// CODE FOR EDIT PART STARTS HERE
document.addEventListener('DOMContentLoaded',function(){

 const edit= document.querySelectorAll("#btn-edit");
 console.log(edit)

 edit.forEach((edit)=>{edit.onclick=(event)=>{ 
event.preventDefault();
// event.stopPropagation();

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
   const post_form=document.getElementById('post-form-edit');
   const form_btn_edit=document.getElementById('form-btn-edit');
 

   const text=document.querySelector('#textarea-edit');
   console.log(text);
 
   text.innerHTML=text_field
   const texter=text.value
   post_form.onsubmit=(event)=>{ 
    const texter=text.value
    fetch(`${id}/update`,
         {method: 'PUT', body:JSON.stringify({text_field:texter})})
         console.log('method')
         .then(response => response.json())
         .then(data =>{console.log('data')})
         }
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
    // window.location.reload();                  
 ;} //this is the end dont forget 

});


// LIKE AND UNLIKE VIEW STARTS FOR ALL POSTS HERE
document.addEventListener('DOMContentLoaded',function(){

  const like_list=document.querySelectorAll('#btn-like');
console.log(like_list)
like_list.forEach(like_list=>{
 var id_like=like_list.getAttribute('data-like')
  console.log(id_like)
  fetch(`${id_like}/like`)
  .then(response=>response.json())
  .then(data=>{console.log(data)
   console.log(data['like'][0]['liking_user-id'])
    const like=data['like'][0]['liking_user-id']
    const user_id=JSON.parse(document.getElementById('user_id').textContent)
    const count=document.querySelector(`[data-img='${id_like}']`)
    // console.log(count)
    count.querySelector('.count-display').innerHTML=data['like_count']
  
    if(like===user_id){
      like_list.innerHTML='Unlike'
    }
    else if(like != user_id){
      like_list.innerHTML='Like'
    }
    else{
      like_list.innerHTML='Like'
    }
  })
 })

// ASSIGNS LOCALLY STORED LIKE AND UNLIKE STATUS
var like_toggle= document.querySelectorAll('#btn-like');
console.log(like_toggle)
like_toggle.forEach((like_toggle)=>{
  const id=like_toggle.getAttribute('data-like')
  console.log(id)
  console.log(localStorage.getItem(id))
  if(localStorage.getItem(id)){
  // const id=like_toggle.getAttribute('data-like')
  like_toggle.innerHTML=localStorage.getItem(id)}
})


// CHANGES VALUES AND TOGGLES LIKI AND UNLIKE BUTTON UPON CLICK
console.log(like_toggle)
 like_toggle.forEach(like=>{ like.onclick=  (event)=>{
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target.innerHTML);
  var id=event.target.getAttribute('data-like'); 
  console.log(id)
  
  // POSTS LIKINGINGS 
  if(event.target.innerHTML==='Like'){
  console.log('like clicked')
  console.log(id);
  fetch(`${id}/like`,{method:'POST',body:JSON.stringify({id: `${id}`})})
    .then(response=>response.json())
    .then(data=>{
      console.log(data)   
      event.target.innerHTML='Unlike';
      const count_div=document.querySelector(`[data-img='${id}']`); 
      (count_div)
      count_div.querySelector('.count-display').innerHTML =data['like_count'];

      })
      // localStorage.setItem('like','Like');
    } 

    // FETCHS LIKE COUNT DATA FROM UNLIKE VIEW
    else{
      console.log('unlike clicked')
     console.log(id)
   fetch(`${id}/unlike`)
     .then(response => response.json()) 
     .then(data =>{
      console.log(data)
      event.target.innerHTML='Like'
       console.log(data)

        const count_div=document.querySelector(`[data-img='${id}']`); 
        (count_div)
        count_div.querySelector('.count-display').innerHTML =data['like_count'];
       

      })
    }  

}})

})


// LIKE AND UNLIKE VIEW STARTS FOR FOLLOWING POSTS HERE
document.addEventListener('DOMContentLoaded',function(){

  const like_list=document.querySelectorAll('#btn-likep');
console.log(like_list)
like_list.forEach(like_list=>{
 var id_like=like_list.getAttribute('data-likep')
  console.log(id_like)
  fetch(`${id_like}/like`)
  .then(response=>response.json())
  .then(data=>{console.log(data)
   console.log(data['like'][0]['liking_user-id'])
    const like=data['like'][0]['liking_user-id']
    const user_id=JSON.parse(document.getElementById('user_id').textContent)
    const count=document.querySelector(`[data-img='p${id_like}']`)
    // console.log(count)
    count.querySelector('.count-displayp').innerHTML=data['like_count']
  
    if(like===user_id){
      like_list.innerHTML='Unlike'
    }
    else if(like != user_id){
      like_list.innerHTML='Like'
    }
    else{
      like_list.innerHTML='Like'
    }
  })
 })

// ASSIGNS LOCALLY STORED LIKE AND UNLIKE STATUS
var like_toggle= document.querySelectorAll('#btn-likep');
console.log(like_toggle)
like_toggle.forEach((like_toggle)=>{
  const id=like_toggle.getAttribute('data-likep')
  console.log(id)
  console.log(localStorage.getItem(`${id}`))
  if(localStorage.getItem(`${id}`)){
  // const id=like_toggle.getAttribute('data-like')
  like_toggle.innerHTML=localStorage.getItem(`${id}`)}
}
)


// CHANGES VALUES AND TOGGLES LIKI AND UNLIKE BUTTON UPON CLICK
console.log(like_toggle)
 like_toggle.forEach(like=>{ like.onclick=  (event)=>{
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target.innerHTML);
  var id=event.target.getAttribute('data-likep'); 
  console.log(id)
  
  // POSTS LIKINGINGS 
  if(event.target.innerHTML==='Like'){
  console.log('like clicked')
  console.log(id);
  fetch(`${id}/like`,{method:'POST',body:JSON.stringify({id: `${id}`})})
    .then(response=>response.json())
    .then(data=>{
      console.log(data)   
      event.target.innerHTML='Unlike';
      const count_div=document.querySelector(`[data-img='p${id}']`); 
      (count_div)
      count_div.querySelector('.count-displayp').innerHTML =data['like_count'];

      })
      // localStorage.setItem('like','Like');
    } 

    // FETCHS LIKE COUNT DATA FROM UNLIKE VIEW
    else{
      console.log('unlike clicked')
     console.log(id)
   fetch(`${id}/unlike`)
     .then(response => response.json()) 
     .then(data =>{
      console.log(data)
      event.target.innerHTML='Like'
       console.log(data)

        const count_div=document.querySelector(`[data-img='p${id}']`); 
        (count_div)
        count_div.querySelector('.count-displayp').innerHTML =data['like_count'];
       
      })
    }  

}})

})











