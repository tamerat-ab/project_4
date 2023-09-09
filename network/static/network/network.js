document.addEventListener("DOMContentLoaded", () =>{
    // document.querySelector('#create_post').onclick=()=>{create_post();};
    // document.querySelector('#following').onclick=()=>{user_following();};
    // document.querySelector(`#{a.setdata.post_id}`).onclick=()=>{user_profile()};
    // user_profile();
    // document.querySelector('#edit_link').onclick=()=>{edit()};
    // document.querySelector('#post_edit').onsubmit=()=>{update();};
    // document.querySelector('#profile_link').onclick=()=>{unfollow()};
   
    posts();
    
   
});

function posts() {
//    id= Button.setdata.edit_post
//    console.log(id);
    document.querySelector('#all-posts').style.display="block";
    document.querySelector('#create_post_div').style.display="none";
    document.querySelector('#following-post').style.display="none";
    document.querySelector('#user_profile').style.display="none";
   
    document.querySelector('#edit-post').style.display="none";
    // document.querySelector('#follow-count').style.display="block";
};

function create_post() {
    document.querySelector('#post_list').style.display="none";
    document.querySelector('#user_following').style.display="none";
    document.querySelector('#user_profile').style.display="none";
    document.querySelector('#create_post_div').style.display="block";

};


// function user_profile() {

    
//     const user_profile=document.querySelector('#profile_link');
//     user_profile.addEventListener('click',(e) => {
//         // id_1=document.querySelector(`#${page}`)
//        const id=e.target.getAttribute('id');
//         if (e.target.innerText==='like'){
//         fetch(`{id}/profile`)}
//         if (e.target.innerText==='unlike'){
//         fetch(`{id}/profile`)}
//         if (e.target.getAttribute('id')==='profile_link'){

//         document.querySelector('#create_post_div').style.display="none";
//         document.querySelector('#post_list').style.display="none";
//         document.querySelector('#user_following').style.display="none";
//         document.querySelector('#user_profile').style.display="block";
//           }
//     });
    
//      unfollow();
// }

function user_following() {
    document.querySelector('#create_post_div').style.display="none";
    document.querySelector('#post_list').style.display="none";
    document.querySelector('#user_profile').style.display="none";
    document.querySelector('#user_following').style.display="block";};


function unfollow() {
    const name=document.querySelector("#user_name");
    const user=document.querySelector("#username");
    if(name.innerHText==user.innerText){()=>{document.querySelector('#follow_link').style.display='none'} }
    console.log(name.innerText)
}

function edit() {
    document.querySelector('#create_post_div').style.display="none";
    document.querySelector('#post_list').style.display="none";
    document.querySelector('#user_following').style.display="none";
    document.querySelector('#user_profile').style.display="none";
    document.querySelector('#edit').style.display="block";
}

function update() {
   
        // const id=document.querySelectorAll('button').forEach(function(button){button.setdata.edit_post})
        const id=Button.setdata.edit_post
        const text_field=document.querySelector('#textarea').value
        
        fetch(`${id}/update`,
        {   method:'put',
            body:JSON.stringify({text_field:text_field})})
            .then(response=>response.json)
            .then(data=>{resp=data.message;
                         ducument.querySelector('#response_message').innerHText = resp

            })
        
}

$(document).ready(function() {
    $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        e.stopPropagation();
    });

    $('html').click(function(){
        $('.nav-dropdown').hide();
    })
    $('#nav-toggle').click(function(){
        $('nav ul').slideToggle();
    })
    $('#nav-toggle').on('click', function(){
        this.classList.toggle('active');
    });
});