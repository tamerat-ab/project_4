document.addEventListener('DOMContentLoaded', () =>{
  post_list();
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
  // count_follow();

})

function post_list() {

  document.getElementById('create-post').style.display="black";
  document.getElementById('post-container').style.display="block";
  document.getElementById('following-post').style.display="none";
  document.getElementById('profile-container').style.display="none";
 
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

// asyncronous is used to fetch
 function profile(){
  const profile=document.querySelectorAll('#username-link')
  console.log(profile)
  profile.forEach((profile)=>{ profile.onclick=async(event)=>{
    const id=event.target.getAttribute('data-profile')     
  // profile.onclick=function(event){

  document.getElementById('create-post').style.display="none";
  document.getElementById('post-container').style.display="none";
  document.getElementById('following-post').style.display="none";
  document.getElementById('profile-container').style.display="block"; 

  // id = event.target.profile.setdata.profile
  await fetch(`/${id}/profile`)
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
                  // username.appendChild(document.createTextNode(user));
                  // user_post2.append(document.createTextNode(text_field))
                  // user_post3.append(document.createTextNode(date))
                  // // post_div3.innerHTML=comment()
                  // profile_box.innerHTML
                  // post_list.appendChild(post_div1,post_div2,post_div3)
                  // btn_follow.setAttribute('data-follow',user_id)
                  // btn_unfollow.setAttribute('data-unfollow',user_id)
}

 fetch(`${id}/count_follow`)
.then(response => response.json())
.then(data =>{
  console.log(data);
  const following=data['following'];
  const follower=data['follower'];
  const follower_count=document.getElementById('btn-count');
  const following_count=document.getElementById('btn-following');
  follower_count.appendChild(document.createTextNode(follower));
  following_count.appendChild(document.createTextNode(following)) })


  })
  // }
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
  
 
  // const comment_box=document.querySelector('#comment-box');
  // comment_box.forEach((comment_box) =>{
  // comment_box.setAttribute('id','comment-box');
  // const comment_form=document.createElement('form');
  // comment_form.setAttribute('id','comment-form');
  // comment_form.setAttribute('data-ID',`${id}`)
  // const textarea=document.createElement('textarea');
  // textarea.setAttribute('id','comment-area');
  // textarea.setAttribute('name','comment');
  // textarea.setAttribute('placeholder','comment');
  // comment_form.append(textarea);
  // comment_box.appendChild(comment_form);
// })
  
  

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
// const commentarea = document.getElementById('comment-area').value;
// comment_form=document.getElementById('comment-form');
// // if (commentarea.length > 0 && comment_form.onsubmit){
// comment_form.onsubmit=() => {
//   const commentarea = document.getElementById('comment-area').value;
//   fetch(`${id}/comment`,
//        {method:'POST',
//         body:json.stringify({comment:`${commentarea}`})})
//         .then(response => response.json())
//         .then(data => { console.log(data)})}
//         console.log('data received')
}})

}

function edit (){

 const edit= document.querySelector("#btn-edit");
 console.log(edit)
 console.log(edit.getAttribute('data-edit'));
//  console.log(edit.dataset.ID)
//  document.querySelectorAll('#btn-edit').forEach(edit.onclick=()=>{
 document.querySelector('#btn-edit').onclick=()=>{
   id=edit.getAttribute('data-edit');
  
  console.log(id)
  fetch(`${id}/update`)
  .then(response=>response.json())
  .then(data=>{

   const username=data[0]['user']
   const text_field=data[0]['text_field'];
   const date =data[0]['date'];
   const id = data[0]['id'];
   const form=document.querySelector('#post-form');
   const text=document.querySelector('#textarea');
   text.value=text_field

   form.onsubmit=function(){
    fetch(`${id}/update`,
         {method: 'PUT', body:json.stringify({text_field:text_field})});}
  });
 }
}

function following (){
  // inssert event listeners here
  const following=document.getElementById('following_url');
  following.onclick=()=>{

    document.getElementById('create-post').style.display="none";
    document.getElementById('post-container').style.display="none";
    document.getElementById('following-post').style.display="block";
    document.getElementById('profile-container').style.display="none";

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
  const like=document.getElementById('btn-like');
  console.log(like);
  console.log(like.getAttribute('data-like'));
  document.querySelector('#btn-like').onclick=function(event){
    id=event.target.getAttribute('data-like');
    console.log(id);
    fetch(`${id}/like`)
    .then(response=>response.json())
    .then(data=>{
     console.log( count=data['like_count'])
      for(let i=0; i<count; i++){
        count=data['like_count']
        const btn_count=document.getElementById('like-count')
        btn_count.appendChild(count)
        
      }

    })
  }
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
      // const following=data['following'];
      // const follower=data['follower'];
      // const follower_count=document.getElementById('btn-count');
      // const following_count=document.getElementById('btn-following');
      // follower_count.appendChild(document.createTextNode(follower));
      // following_count.appendChild(document.createTextNode(following))
      // following_count.appendChild(document.createTextNode('following'));
      // following_count.appendChild(document.createTextNode(following))


    })
  }

}

// function count_follow(){
// const profile=document.querySelectorAll('#username-link')
//   console.log(profile)
//   profile.forEach((profile)=>{ profile.onclick= async(event)=>{
//     const id=event.target.getAttribute('data-profile')  
//     console.log(id);
//    await fetch(`${id}/count_follow`)
//    .then(response => response.json())
//    .then(data =>{
//      console.log(data);
//      const following=data['following'];
//      const follower=data['follower'];
//      const follower_count=document.getElementById('btn-count');
//      const following_count=document.getElementById('btn-following');
//      follower_count.appendChild(document.createTextNode(follower));
//      following_count.appendChild(document.createTextNode(following)) })
//   }})
//    };

function unfollow(){
 const unfollow= document.getElementById('unfollow-button')
 unfollow.onclick=(event) =>{
  id=event.target.dataset.unfollow
  fetch(`${id}/unfollow`)
  .then(response=>response.json())
  .then(data=>{
    // you can show icon collor chnage
  })
 }


}



 // const username=document.getElementById('user-name-div');
              // console.log(username);
              // const btn_follow=document.getElementById('btn-follow');
              // const btn_unfollow=document.getElementById('btn-unfollow');
              // const user_post1=document.getElementById('user-post1');
              // const user_post2=document.getElementById('user-post2');
              // const user_post3=document.getElementById('user-post3');
              // const profile_box=document.getElementById('profile-box');



  // document.querySelector('#following').onclick=user_following();
//  document.querySelector('#profile_url').onclick=profile();
//   const textarea=document.getElementById('textarea')
//   const form_button=document.getElementById('form_button');
//   const post_form = document.getElementById('post_form');
//   // form_button.disabled = true;
 
//   // form_button.onkeyup=()=> {
   
//     if(form_button.value.length > 5) {
//             form_button.disabled= true;
//         }
//     else {
//             form_button.disabled= false;
//         }
//     // }
  
// return false;


// function post_list() {

//   document.getElementById('edit-post').style.display="none";
//   document.getElementById('user_profile').style.display="none";
//   document.getElementById('following-post').style.display="none";
//   document.getElementById('create_post_div').style.display="block";
//   document.getElementById('post_lister').style.display="block";
//   // console.log(document.querySelector('#post_lister'));
  
//   }
//   function profile() {
  
  
//   document.getElementById('edit-post').style.display="none";
//   document.getElementById('following-post').style.display="block";
//   document.getElementById('create_post_div').style.display="block";
//   document.getElementById('post_lister').style.display="block";
//   document.getElementById('user_profile').style.display="block";
  
//   }
//   function following() {
//   document.getElementById('edit-post').style.display="none";
//   document.getElementById('create_post_div').style.display="none";
//   document.getElementById('post_lister').style.display="block";
//   document.getElementById('user_profile').style.display="block";
//   document.getElementById('following-post').style.display="block";
  
//   }
//   function edit() {
//   document.getElementById('create_post_div').style.display="block";
//   document.getElementById('following-post').style.display="block";
//   document.getElementById('post_lister').style.display="block";
//   document.getElementById('user_profile').style.display="block";
//   document.getElementById('edit-post').style.display="block";
//   }










// document.addEventListener("DOMContentLoaded",function(){

//   post_list();
//   profile();
//   // post_list();
// });
  
//   function all_posts(){
  
//       const post=document.getElementById("post_form")
//       post.onsubmit=()=>{
//       const textarea=document.getElementById('textarea').value
//       console.log(textarea)
    
//       fetch('/create_post',
//           {  headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//                       },
//             method:'POST',
//             body:JSON.stringify({textarea:`${textarea}`})})
//             .then(response => response.json())
//             .then(data =>{const success=data['success'] ;
//                          console.log(success)
//                         //  alert(success)
                     
//  return response
//             });
//                     }};
// function post_list(){
// fetch('1/post_list')
// .then(response => response.json())
// .then(data => {console.log(data)

// const cd=document.createElement('div');
// cd.setAttribute('data-idname','comment');
// cd.setAttribute('id','comment');


             
//             for(var i=0;i<data.length;i++){

            
//               const textarea=data[i]['text_field'];
//               const date=data[i]['date_created_on'];
//               const id=data[i]['id'];
//               const user=data[i]['user'];
//               const user_id=data[i]['user_id'];



// // }});}      

// // })
            
//               const div=document.createElement('div');
//               div.setAttribute('id','post-div');
//               const button1=document.createElement('button');
//               button1.setAttribute('data-id',`${id}`);
//               button1.setAttribute('id','btn-post1');
//               const button2=document.createElement('button');
//               button2.setAttribute('data-id',`${id}`);
//               button2.setAttribute('id','btn-post2');
//               const button3=document.createElement('button');
//               button3.setAttribute('data-id',`${id}`);
//               button3.setAttribute('id', 'btn-post3');
//               const button4=document.createElement('button');
//               button4.setAttribute('data-id',`${id}`);
//               button4.setAttribute('class','btn-post4');
//               const div1=document.createElement('div');
//               div1.setAttribute('id','div1-textarea');
//               const div2=document.createElement('div');
//               div2.setAttribute('id','div2-date');
//               const div3=document.createElement('div');
//               div3.setAttribute('id','div3-post');
//               const div_user=document.createElement('button');

//               // div_user.setAttribute('id',`${user_id}`);
//               div_user.setAttribute('data-user_ID',`${user_id}`);
//               div_user.setAttribute('class','user-name');
//                const dd =div_user.dataset.user_id;
//                console.log(dd);
             
              
//               const post=document.querySelector('#post_post')
//               div_user.innerHTML=`${user}`
//               // div_user.innerHTML=append(document.createTextNode(`${user}`));
//               div.append(div_user);
//               div.appendChild(document.createTextNode(`${textarea}`));
//               div.appendChild(document.createTextNode(`${date}`));
              
            
//               post.appendChild(div);
              
           
//               button1.appendChild(document.createTextNode('edit'));
//               button2.appendChild(document.createTextNode('Like'));
//               button3.appendChild(document.createTextNode('Unlike'));
//               button4.appendChild(document.createTextNode('Delete'))


//               div3.append(button1,button2,button3,button4);
//               div.appendChild(div3);
// // comment area 
//               const form=document.createElement('form');
//               form.setAttribute('id', `${id}`);
//               const comment=document.createElement('textarea')
//               comment.setAttribute('id','comment-area')
//               comment.setAttribute('placeholder','write comment here')
//               const input=document.createElement('input');
//               input.setAttribute('type','submit');
//               input.setAttribute('value','post');
//               form.append(comment,input);

//               const div4=document.createElement('div');
//               div4.setAttribute('id','comment-div');

//               div4.append(form);
//               div.appendChild(div4)

//               fetch(`${id}/comment`)
//               .then(response => response.json())
//               .then(data => {console.log(data);
//                              const div5=document.createElement('div');
//                              div5.setAttribute('id','comment-comment');
//                              div5.appendChild(document.createTextNode(`${data.comments}`))
//                              div.appendChild(div5)
//                              }) ;


//               div_user.onclick=() =>{
//                 fetch(`${user_id}/profile`)
//                 .then(response => response.json())
//                 .then(data => {console.log(data)
//                   console.log(data.length)
//                   for (var i=0; i<data.length; i++){
//                   console.log(data[i]['text_field']);
//                   const username=data[i]['user']
//                   const textarea=data[i]['text_field'];
//                   const data=data[i]['data_created_on']
//                   const profile=document.querySelector('#profile');
//                   const following_post =document.querySelector('#post-following');
//                   const div1=document.createElement('div');
//                   div1.setAttribute('id','id1');
//                   const div2=document.createElement('div');
//                   div2.setAttribute('id','id2');
//                   const div3=document.createElement('div');
//                   div3.setAttribute('id','id3');
//                   const div0=document.createElement('div')
//                   div0.setAttribute('id','div0')
                  
//                   const div4=document.createElement('div4')
//                   div4.setAttribute('id','div4')

//                   div1.append(document.createTextNode(username));
//                   div2.append(document.createTextNode(textarea));
//                   div3.append(document.createTextNode(date))
//                   // div4.append(div1, div2, div3)
//                   div0.append(div1, div2, div3);
                  
//                   following_post.appendChild(div0)
//                    }
//                     });
//                };
                            


//               }
//                })

               
// }



// function following_post(){
//   fetch('/following_post')
//         .then(response => response.json())
//         .then(data => {console.log(data.followed)
//                        console.log('following check')
//                        const follow=document.querySelector('#post-follow')
                     
//                        const div=document.querySelector('#post-div')
//                        follow.appendChild(div)

//                       }) 
   
// console.log('following check 2')

// }
// function profile (){
//            console.log('profile cheking')

//           //  const cd=document.createElement('div');
//           //  cd.setAttribute('data-idname','comment');
//           //  cd.setAttribute('class','comment');
//           //  const cd2=document.querySelector('#comment');
//           //  console.log(cd2)
//           // console.log(cd2.dataset.idname)
         
           
//           //  <button data-rebo="50" class="tam" id="1">new</button>
//            const big=document.querySelector('.tam');
//            console.log(big); 

//            console.log(big.dataset.rebo);
//            big.setAttribute('id','bigy'); 
//            console.log(big.getAttribute('id'));
//            console.log(big.id)
//            big.getAttribute('onclick');
// //           

//  }

















// document.addEventListener("DOMContentLoaded", () =>{
//     // document.querySelector('#create_post').onclick=()=>{create_post();};
//     // document.querySelector('#following').onclick=()=>{user_following();};
//     // document.querySelector(`#{a.setdata.post_id}`).onclick=()=>{user_profile()};
//     // user_profile();
//     // document.querySelector('#edit_link').onclick=()=>{edit()};
//     // document.querySelector('#post_edit').onsubmit=()=>{update();};
//     // document.querySelector('#profile_link').onclick=()=>{unfollow()};
   
//     posts();
    
   
// });

// function posts() {
// //    id= Button.setdata.edit_post
// //    console.log(id);
//     document.querySelector('#all-posts').style.display="block";
//     document.querySelector('#create_post_div').style.display="none";
//     document.querySelector('#following-post').style.display="none";
//     document.querySelector('#user_profile').style.display="none";
   
//     document.querySelector('#edit-post').style.display="none";
//     // document.querySelector('#follow-count').style.display="block";
// };

// function create_post() {
//     document.querySelector('#post_list').style.display="none";
//     document.querySelector('#user_following').style.display="none";
//     document.querySelector('#user_profile').style.display="none";
//     document.querySelector('#create_post_div').style.display="block";

// };


// // function user_profile() {

    
// //     const user_profile=document.querySelector('#profile_link');
// //     user_profile.addEventListener('click',(e) => {
// //         // id_1=document.querySelector(`#${page}`)
// //        const id=e.target.getAttribute('id');
// //         if (e.target.innerText==='like'){
// //         fetch(`{id}/profile`)}
// //         if (e.target.innerText==='unlike'){
// //         fetch(`{id}/profile`)}
// //         if (e.target.getAttribute('id')==='profile_link'){

// //         document.querySelector('#create_post_div').style.display="none";
// //         document.querySelector('#post_list').style.display="none";
// //         document.querySelector('#user_following').style.display="none";
// //         document.querySelector('#user_profile').style.display="block";
// //           }
// //     });
    
// //      unfollow();
// // }

// function user_following() {
//     document.querySelector('#create_post_div').style.display="none";
//     document.querySelector('#post_list').style.display="none";
//     document.querySelector('#user_profile').style.display="none";
//     document.querySelector('#user_following').style.display="block";};


// function unfollow() {
//     const name=document.querySelector("#user_name");
//     const user=document.querySelector("#username");
//     if(name.innerHText==user.innerText){()=>{document.querySelector('#follow_link').style.display='none'} }
//     console.log(name.innerText)
// }

// function edit() {
//     document.querySelector('#create_post_div').style.display="none";
//     document.querySelector('#post_list').style.display="none";
//     document.querySelector('#user_following').style.display="none";
//     document.querySelector('#user_profile').style.display="none";
//     document.querySelector('#edit').style.display="block";
// }

// function update() {
   
//         // const id=document.querySelectorAll('button').forEach(function(button){button.setdata.edit_post})
//         const id=Button.setdata.edit_post
//         const text_field=document.querySelector('#textarea').value
        
//         fetch(`${id}/update`,
//         {   method:'put',
//             body:JSON.stringify({text_field:text_field})})
//             .then(response=>response.json)
//             .then(data=>{resp=data.message;
//                          ducument.querySelector('#response_message').innerHText = resp

//             })
        
// }
