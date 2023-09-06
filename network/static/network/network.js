document.addEventListener("DOMContentLoaded",() =>{
    document.querySelector('#create_post').onclick=()=>{create_post();};
    document.querySelector('#following').onclick=()=>{user_following();};
    // document.querySelector(`#{a.setdata.post_id}`).onclick=()=>{user_profile()};
    user_profile();
    document.querySelector('#edit_link').onclick=()=>{edit()};
    document.querySelector('#post_edit').onsubmit=()=>{update();};
    // document.querySelector('#profile_link').onclick=()=>{unfollow()};
   
    posts();
    
   
});

function posts() {
    document.querySelector('#create_post_div').style.display="none";
    document.querySelector('#post_list').style.display="block";
    document.querySelector('#user_following').style.display="none";
    document.querySelector('#user_profile').style.display="none";
};

function create_post() {
    document.querySelector('#create_post_div').style.display="block";
    document.querySelector('#post_list').style.display="none";
    document.querySelector('#user_following').style.display="none";
    document.querySelector('#user_profile').style.display="none";

};

document.addEventListener('DOMContentLoaded', function(){
// function user_profile() {
    
    const user_prof=document.querySelector('#profile_link');
    user_prof.onclick= function() {
        //  document.querySelector('#create_post_div').style.display="none";
        // document.querySelector('#post_list').style.display="none";
        // document.querySelector('#user_following').style.display="none";
        // document.querySelector('#user_profile').style.display="block";
    
    }
     unfollow();
})

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
        console.log(id);
        console.log(text_field)
        fetch(`${id}/update`,
        {   method:'put',
            body:JSON.stringify({text_field:text_field})})
            .then(response=>response.json)
            .then(data=>{resp=data.message;
                         ducument.querySelector('#response_message').innerHText = resp

            })
        
}