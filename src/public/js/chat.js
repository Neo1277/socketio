const socket = io()
//console.log('It works');
let btn = document.getElementById('send');
let message_info = document.getElementById('message');

window.onload = enterpage;

btn.addEventListener('click', function(){
    socket.emit('message_send', {
        message: message_info.value
    });
    console.log(message);
});

function enterpage(){
    socket.emit('users_num');
    socket.emit('username');
}

socket.on('users_num', function(act_users){
    //console.log(act_users);
    users.innerHTML = ``
    users.innerHTML = `${act_users}`
});

socket.on('username', function(user_name){
    //user.innerHTML = '';
    user.innerHTML += `<p>${user_name}: Se ha unido</p>`
});

socket.on('message_send', function(data, id){
    user.innerHTML += `<p>
        <strong>${id}</strong>: ${data.message}
    </p>`
});

