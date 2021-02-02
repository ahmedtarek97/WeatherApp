const weatherForm = document.querySelector('.weather-form');
const locationInput = document.querySelector('.location');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';

    const location = locationInput.value;

    fetch(`/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
        if(data.error){            
            messageOne.textContent = data.error;
        }else{         
            messageOne.textContent = 'Location: ' + data.location;
            messageTwo.textContent = 'Current Tempreature: ' + data.forecast;
            messageThree.textContent = 'Tempreature feels like: ' + data.feelsLike;
            messageFour.textContent = 'Humidity: '+ data.humidity;
        }
});
    
})