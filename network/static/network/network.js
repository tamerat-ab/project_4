
document.addEventListener("DOMContentLoaded",function(){

  post_list();
  profile();
  // post_list();
});
  
  function all_posts(){
  
      const post=document.getElementById("post_form")
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
                        //  alert(success)
                     
 return response
            });
                    }};
function post_list(){
fetch('1/post_list')
.then(response => response.json())
.then(data => {console.log(data)

const cd=document.createElement('div');
cd.setAttribute('data-idname','comment');
cd.setAttribute('id','comment');


             
            for(var i=0;i<data.length;i++){

            
              const textarea=data[i]['text_field'];
              const date=data[i]['date_created_on'];
              const id=data[i]['id'];
              const user=data[i]['user'];
              const user_id=data[i]['user_id'];



// }});}      

// })
            
              const div=document.createElement('div');
              div.setAttribute('id','post-div');
              const button1=document.createElement('button');
              button1.setAttribute('data-id',`${id}`);
              button1.setAttribute('id','btn-post1');
              const button2=document.createElement('button');
              button2.setAttribute('data-id',`${id}`);
              button2.setAttribute('id','btn-post2');
              const button3=document.createElement('button');
              button3.setAttribute('data-id',`${id}`);
              button3.setAttribute('id', 'btn-post3');
              const button4=document.createElement('button');
              button4.setAttribute('data-id',`${id}`);
              button4.setAttribute('class','btn-post4');
              const div1=document.createElement('div');
              div1.setAttribute('id','div1-textarea');
              const div2=document.createElement('div');
              div2.setAttribute('id','div2-date');
              const div3=document.createElement('div');
              div3.setAttribute('id','div3-post');
              const div_user=document.createElement('button');

              // div_user.setAttribute('id',`${user_id}`);
              div_user.setAttribute('data-user_ID',`${user_id}`);
              div_user.setAttribute('class','user-name');
               const dd =div_user.dataset.user_id;
               console.log(dd);
             
              
              const post=document.querySelector('#post_post')
              div_user.innerHTML=`${user}`
              // div_user.innerHTML=append(document.createTextNode(`${user}`));
              div.append(div_user);
              div.appendChild(document.createTextNode(`${textarea}`));
              div.appendChild(document.createTextNode(`${date}`));
              
            
              post.appendChild(div);
              
           
              button1.appendChild(document.createTextNode('edit'));
              button2.appendChild(document.createTextNode('Like'));
              button3.appendChild(document.createTextNode('Unlike'));
              button4.appendChild(document.createTextNode('Delete'))


              div3.append(button1,button2,button3,button4);
              div.appendChild(div3);
// comment area 
              const form=document.createElement('form');
              form.setAttribute('id', `${id}`);
              const comment=document.createElement('textarea')
              comment.setAttribute('id','comment-area')
              comment.setAttribute('placeholder','write comment here')
              const input=document.createElement('input');
              input.setAttribute('type','submit');
              input.setAttribute('value','post');
              form.append(comment,input);

              const div4=document.createElement('div');
              div4.setAttribute('id','comment-div');

              div4.append(form);
              div.appendChild(div4)

              fetch(`${id}/comment`)
              .then(response => response.json())
              .then(data => {console.log(data);
                             const div5=document.createElement('div');
                             div5.setAttribute('id','comment-comment');
                             div5.appendChild(document.createTextNode(`${data.comments}`))
                             div.appendChild(div5)
                             }) ;


              div_user.onclick=() =>{
                fetch(`${user_id}/profile`)
                .then(response => response.json())
                .then(data => {console.log(data)
                  console.log(data.length)
                  for (var i=0; i<data.length; i++){
                  console.log(data[i]['text_field']);
                  const username=data[i]['user']
                  const textarea=data[i]['text_field'];
                  const data=data[i]['data_created_on']
                  const profile=document.querySelector('#profile');
                  const following_post =document.querySelector('#post-following');
                  const div1=document.createElement('div');
                  div1.setAttribute('id','id1');
                  const div2=document.createElement('div');
                  div2.setAttribute('id','id2');
                  const div3=document.createElement('div');
                  div3.setAttribute('id','id3');
                  const div0=document.createElement('div')
                  div0.setAttribute('id','div0')
                  
                  const div4=document.createElement('div4')
                  div4.setAttribute('id','div4')

                  div1.append(document.createTextNode(username));
                  div2.append(document.createTextNode(textarea));
                  div3.append(document.createTextNode(date))
                  // div4.append(div1, div2, div3)
                  div0.append(div1, div2, div3);
                  
                  following_post.appendChild(div0)
                   }
                    });
               };
                            


              }
               })

               
}



function following_post(){
  fetch('/following_post')
        .then(response => response.json())
        .then(data => {console.log(data.followed)
                       console.log('following check')
                       const follow=document.querySelector('#post-follow')
                     
                       const div=document.querySelector('#post-div')
                       follow.appendChild(div)

                      }) 
   
console.log('following check 2')

}
function profile (){
           console.log('profile cheking')

          //  const cd=document.createElement('div');
          //  cd.setAttribute('data-idname','comment');
          //  cd.setAttribute('class','comment');
          //  const cd2=document.querySelector('#comment');
          //  console.log(cd2)
          // console.log(cd2.dataset.idname)
         
           
          //  <button data-rebo="50" class="tam" id="1">new</button>
           const big=document.querySelector('.tam');
           console.log(big); 

           console.log(big.dataset.rebo);
           big.setAttribute('id','bigy'); 
           console.log(big.getAttribute('id'));
           console.log(big.id)
           big.getAttribute('onclick');
//           

 }

















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
