import './bootstrap';
import axios from 'axios';

Echo.private('notification')
    .listen('UserSessionChanged', (e) => {
        const notificationElement = document.getElementById('notification');
       //Agregar al elemento
        notificationElement.innerText = e.message;
        // remover la clase que sea invisible
        notificationElement.classList.remove('invisible');
        // Remover las clases
        notificationElement.classList.remove('alert-success');
        notificationElement.classList.remove('alert-danger');
        
        notificationElement.classList.add('alert-' + e.type);

    });


    
// window.axios.get('/api/users')
// .then((response) => {
//     const usersElement = document.getElementById('users');
 
//     let users = response.data;
 
//     users.forEach((user, index) => {
//         let element = document.createElement('li');
 
//         element.setAttribute('id', user.id);
//         element.innerText = user.name;
 
//         usersElement.appendChild(element);
//     });
// });

// Echo.channel('users')
//     .listen('UserCreated', (e) => {
//         const usersElement = document.getElementById('users');
        
//         let element = document.createElement('li');
 
//         element.setAttribute('id', e.user.id);
//         element.innerText = e.user.name;
 
//         usersElement.appendChild(element);
//     })
//     .listen('UserUpdated', (e) => {
//         let element = document.getElementById(e.user.id);
//         element.innerText = e.user.name; 
 
//     })
//     .listen('UserDeleted', (e) => {
//         let element = document.getElementById(e.user.id);
//         element.parentNode.removeChild(element);

//     })


    // Ejecucion del juego

    const circleElement = document.getElementById('circle');
    const timerElement = document.getElementById('timer');
    const winnerElement = document.getElementById('winner');
    const betElement = document.getElementById('bet');
    const resultElement = document.getElementById('result');

    Echo.channel('game')
    .listen('RemainingTimeChanged', (e) => {
        timerElement.innerText = e.time;
        // Girar ruleta
        circleElement.classList.add('refresh');
        // Ocultar numero ganador
        winnerElement.classList.add('d-none');

        resultElement.innerText = '';

        winnerElement.classList.remove('text-success');
        winnerElement.classList.remove('text-danger'); 

        
    })
    .listen('WinnerNumberGenerated', (e) =>{
        // Detener ruleta
        circleElement.classList.remove('refresh');

        let winner = e.number;

        winnerElement.innerText = winner;
        // Poner visible el numero
        winnerElement.classList.remove('d-none');
        
        let bet = betElement[betElement.selectedIndex].innerText;
          
        if(bet == winner){
            resultElement.innerText = 'You Win'; 
            resultElement.classList.add('text-success');
        } else {
            resultElement.innerText = 'You Lose'; 
            resultElement.classList.add('text-danger');
        }
    });

    //Chat Online

    const usersElement = document.getElementById('users');
    const messagesElement = document.getElementById('messages');

    Echo.join('chat')
    .here((users) => {
        //Recorrer los usuarios
        users.forEach((user, index) => {
            let element = document.createElement('li');
    
            element.setAttribute('id', user.id);
            element.setAttribute('onclick', 'greetUser("' + user.id + '")')
            element.innerText = user.name;
    
            usersElement.appendChild(element);
        });
    })
    .joining((user) => {
        let element = document.createElement('li');
    
        element.setAttribute('id', user.id);
        element.setAttribute('onclick', 'greetUser("' + user.id + '")')
        element.innerText = user.name;

        usersElement.appendChild(element);
    })
    .leaving((user) => {
        let element = document.getElementById(user.id);
        element.parentNode.removeChild(element);
    }).listen('MessageSent', (e) => {
        let element = document.createElement('li');
    
        element.setAttribute('id', e.user.id);
        element.innerText = e.user.name + ': ' + e.message;

        messagesElement.appendChild(element);
    })


    const sendElement = document.getElementById('send');
    const messageElement = document.getElementById('message');


    sendElement.addEventListener('click', (e) => {  
        e.preventDefault();
        //Enviar al controlador
        window.axios.post('/chat/message', {
            message: messageElement.value
        }).then((response) => {
            // Imprimir respuesta
            console.log(response);
        })
        // Reiniciar variable
        messageElement.value = '';
    })

    // function greetUser(id){
    //     window.axios.post('/chat/greet/'+id);
    // }
  
    Echo.private('chat.greet.'+userId)
        .listen('GreetingSent', (e) => {
            let element = document.createElement('li');
    
            element.innerText = e.message;
            element.classList.add('text-success');

            messagesElement.appendChild(element);
        });