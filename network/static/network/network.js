document.addEventListener('DOMContentLoaded', () =>{
  post_list();
  document.querySelector('#create_post').onclick =create_post()
  document.querySelector('#posts').onclick=post_list();
  // document.querySelector('#username-link').onclick=profile();
  profile();
  edit();
  // document.querySelector('#posts').onclick=post_list();
 
  comment();
  edit();

})

function post_list() {

  document.getElementById('create_post_div').style.display="block";
  document.getElementById('post_lister').style.display="block";
  // console.log(document.querySelector('#post_lister'));
  
  }

  function create_post(){
  
      const post=document.getElementById("post-form")
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
            });
          }}

function profile(){
  const profile=document.getElementById('username-link')
  console.log(profile)
  profile.onclick=function(event){
  id = event.target.profile.setdata.profile
  fetch(`${id}/profile`)
  .then(response => response.json())
  .then(data =>{console.log(data)
              username=data[0]['user'];
              user_id=data[0]['user_id'];
              const username=document.getElementById('username-div-div');
              username.innerHTML=username;
              const follow=document.getElementById('follow-button');
              const unfollow=document.getElementById('unfollow-button');
               for(var i=0; i<data.length; i++){
                  const post_list=document.getElementById('post-list-1')
                  const post_div1=document.createElement('div');
                  const post_div2=document.createElement('div');
                  const post_div3=document.createElement('div')
                  text_field=data[i]['text_field']
                  date=data[i]['date_created_on']
                  post_div1.append(document.createTextNode(text_field))
                  post_div2.append(document.createTextNode(date))
                  post_div3.innerHTML=comment()
                  post_list.appendChild(post_div1,post_div2,post_div3)
                  follow.setAttribute('data-follow',user_id)
                  unfollow.setAttribute('data-unfollow',user_id)
                  }
  })
  }

}


function comment() {

const comment = document.getElementById('comment-box')
document.querySelectorAll('#comment-box').forEach(comment=>{comment.style.display="none";});
const comment_list=document.querySelector("#btn-comment");
comment_list.querySelectorAll('#btn-comment').forEach(comment_list.onclick=(event)=>{
document.querySelector('#comment-box').style.display="block";
id=event.target.dataset.id;
// this.style.display='block';
// id=this.dataset.id;

//  console.log(comment_list)
//  console.log(comment_list.dataset.id)
// id=comment_list.dataset.id
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
          const comment_post=document.querySelector('#comment-post');
          const comment_commenter=document.createElement('div');
          const comment_comment=document.createElement('div');
          const comment_date=document.createElement('div');
          console.log(comment_comment)
          comment_commenter.appendChild(document.createTextNode(commenter))
          comment_comment.appendChild(document.createTextNode(comment))
          comment_date.appendChild(document.createTextNode(date))
          comment_post.append(comment_commenter,comment_comment,comment_date)
          console.log(comment_comment)
 }
})})
}

function edit (){

 const edit= document.querySelector("#btn-edit");
 console.log(edit)
 console.log(edit.getAttribute('data-ID'));
//  console.log(edit.dataset.ID)
 document.querySelectorAll('#btn-edit').forEach(edit.onclick=()=>{
   id=edit.getAttribute('data-ID');
  
  console.log(id)
  fetch(`${id}/update`)
  .then(response=>response.json())
  .then(data=>{
   const username=data[0]['user']
   const text_field=data[0]['text_field'];
   const date =data[0]['date'];
   const id = data[0]['id'];
   const form=document.querySelector('#post_form');
   const text=document.querySelector('#textarea');
   text.value=text_field

   form.onsubmit=function(){
    fetch(`${id}/update`,
         {method: 'PUT', body:json.stringify({text_field:text_field})});}
  });
 })
}

function following (){
  fetch('/follow')
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
  });
}

function like(){
  const like=document.getAnimations('btn-like');
  console.log(like);
  const unlike=document.getAnimations('btn-unlike');
  const delete_post=document.getAnimations('btn-delete');
  document.document.querySelector('#btn-like').onclick=function(event){
    id=event.target.dataset.ID;
    console.log(id);
    fetch(`${id}/like`)
    .then(response=>response.json())
    .then(data=>{
     console.log( count=data['like_count'])
      for(let i=0; i<count; i++){
        count=data['like_count']
        const count_div=document.getElementById('count-div')
        count_div.appendChild(count)
        
      }

    })
  }
}

function unlike(){
 const unlike= document.getElementById('btn-unlike')
 unlike.onclick=(event) =>{
  id=event.target.dataset.ID
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
  const follow= document.getElementById('follow-button')
  follow.onclick=(event) =>{
    id=event.target.dataset.follow
    fetch(`${id}/follow`)
    .then(response => response.json())
    .then(data =>{
      console.log(data);
      following=data['following'];
      follower=data['follower'];
      const follower_count=document.createElement('div');
      const following_count=document.createElement('div');
      follower_count.appendChild(document.createTextNode('followers'));
      follower_count.appendChild(document.createTextNode(follower))
      following_count.appendChild(document.createTextNode('following'));
      following_count.appendChild(document.createTextNode(following))


    })
  }

}

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
