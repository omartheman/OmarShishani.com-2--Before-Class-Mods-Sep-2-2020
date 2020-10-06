let star_fall_distance;
let idClicked;
let timerOnOffChecker = -1;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timeRemaining;
let new_star_left;
let star_num;
let star_delay;
let star_color;
let placeHours = ""
let placeMins = ""
let placeSecs = ""
let radios = document.getElementsByName('timer-radio');

let audio_tequila = new Audio("audio/tequila.mp3");
let audio_forest = new Audio("audio/forest.mp3");
let airhorn = new Audio("audio/airhorn.mp3");

let setTimeFromInputs = () => {
  hours = $(".timer__hours-input").val();
  minutes = $(".timer__minutes-input").val();
  seconds = $(".timer__seconds-input").val();
}
let showTimeRemaining = () => {
  console.log('inside showTimeRemaining')
  console.log(placeMins)
  console.log(minutes)
  console.log(timeRemaining)
  timeRemaining = `<span class="timer__span--values">${placeHours}${hours}:${placeMins}${minutes}:${placeSecs}${seconds}</span>`;
  console.log(timeRemaining)

  $(".text-main__grid-module--top").html(timeRemaining);  
}

let changeBlankToZero = () => {
  if (hours == "") {hours = 0};
  if (minutes == "") {minutes = 0};
  if (seconds == "") {seconds = 0};
}
let audioPause = () => {
  audio_tequila.pause();
  audio_tequila.currentTime = 0;
  airhorn.pause();
  airhorn.currentTime = 0;
  audio_forest.pause();
  audio_forest.currentTime = 0;
}

let timerPlaceholderZeros = () => {
  // These first three 'ifs' add two zeros to the initial hrs/sec/min display, when play button is first pressed. These are added if no value is entered for hrs/mins/secs
  console.log('inside timerPlaceholderZeros')
  console.log(`inside timerPlaceholderZeros, placeMins = ${placeMins}, minutes = ${minutes}`)
  if (hours === "") {
    hours = 0;
    placeHours = 0;
  }
  if (minutes === "") {
    minutes = 0;
    placeMins = 0;
  }
  if (seconds === "") {
    seconds = 0;
    placeSecs = 0;
  }
  else if (hours < 10 || minutes < 10 || seconds < 10) {
    
  console.log('entering first "else" in timerPlaceholderZeros');
    if (hours < 10){
      placeHours = 0
    } else {
      placeHours = ""
    }
    if (minutes < 10){
      console.log('setting placeMins to 0')
      placeMins = 0
    } else {
      placeMins = ""
    }
    if (seconds < 10) {
      placeSecs = 0
    } else {
      placeSecs = ""
    }
  }
}
$(document).ready(
  function mainTimerCountdownStarter(){
    $(".timer__button--play").click(function(e){
      timerOnOffChecker *= -1;
      console.log(`play clicked. Timeronoffchecker is now ${timerOnOffChecker}`)
      document.querySelector('.timer__button--play').classList.toggle('timer__button--clicked');
      document.querySelector('.timer__button--pause').classList.toggle('timer__button--clicked');

      if (hours === 0 && minutes === 0 && seconds === 0) {
        setTimeFromInputs();
        changeBlankToZero();
        timerPlaceholderZeros();
        timeRemaining = `<span class="timer__span--values">${placeHours}${hours}:${placeMins}${minutes}:${placeSecs}${seconds}</span>`;
        $(".text-main__grid-module--top").html(timeRemaining);
        console.log(`Started mainTimerCountdownStarter. Entered 'if' because all time values equal 0`)
        console.log('about to activate timerCountdown')
        timerCountdown();
      } else {
        timerCountdown();
      }
    });
    $(".timer__button--reset").click(function(){
      if (timerOnOffChecker === 1) {
        document.querySelector('.timer__button--pause').classList.toggle('timer__button--clicked');
        document.querySelector('.timer__button--play').classList.toggle('timer__button--clicked');
      }
      console.log('reset entered')
      timerOnOffChecker = -1;
      audioPause();
      setTimeFromInputs();
      timerPlaceholderZeros();
      showTimeRemaining();
    });
    $(".timer__button--pause").click(function(){
      document.querySelector('.timer__button--pause').classList.toggle('timer__button--clicked');
      document.querySelector('.timer__button--play').classList.toggle('timer__button--clicked');
      audioPause();
      console.log(timerOnOffChecker)
      timerOnOffChecker *= -1;
      console.log(timerOnOffChecker)
      console.log(`Pause clicked. timerOnOffChecker is now ${timerOnOffChecker}`);
    });
    $(".timer__button--resume").click(function(){
      console.log(`timerOnOffChecker is value: ${timerOnOffChecker}`)
      timerOnOffChecker *= -1;
      timerCountdown();
      audioPause();
    });
  }
);

let timerCountdown = () => {
  let timerInterval = setInterval(function (){
    if (timerOnOffChecker === -1) {
      clearInterval(timerInterval);
      return
    }

    timerPlaceholderZeros();
    // error in inital zero caused here
    if (hours >= 1 && minutes >= 1 && seconds <= 0) {
      minutes--;
      seconds = 59;
      placeSecs = ""
      showTimeRemaining();
    } else if (hours >= 1 && minutes <= 0 && seconds <= 0) {
      hours--;
      minutes = 59; 
      seconds = 59;  
      placeMins = ""
      placeSecs = ""
      showTimeRemaining();
    } else if (minutes >= 1 && seconds <= 0) {
      minutes--;
      seconds = 59;
      placeSecs = ""
      showTimeRemaining();
    } else if (minutes >= 1 && seconds >= 0) {
      console.log('inside timerCountdown > timerINterval')
      console.log(minutes, placeMins)
      seconds--; 
      showTimeRemaining();
    } else if (minutes <= 1 && seconds > 0) {
      seconds--; 
      showTimeRemaining();
    } else if (seconds <= 0) {
      showTimeRemaining();
      if (timerOnOffChecker === -1) {
        setTimeFromInputs();
        timerCountdown;
      } 
      clearInterval(timerInterval);

      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          if (radios[i].value == "tequila") {
            audio_tequila.play();
            airhorn.play();
            newSVG();
          } else if (radios[i].value == "forest") {
            audio_forest.play();
            newSVG();
          }
          break;
        }
      }
      $('.timer__star').toggleClass('timer__star--rotate');
      $('.timer__star').animate({top: `${star_fall_distance}`}, 7000);  
    } 
  }, 1000);
}

function newSVG(){
  new_star_left = Math.random()*97;
  animation_number = Math.ceil(Math.random()*4);
  star_delay = Math.random()*20000;
  star_color_random_id = Math.ceil(Math.random()*2);

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      if (radios[i].value == "tequila") {
        console.log('radio is tequlia')
        if (timerOnOffChecker === -1) {
          timerOnOffChecker *= -1;
        }
        console.log('newSVG entered, idClicked is tequila, run animation createStar')
        createStar(new_star_left, animation_number, starSVG, star_color, star_fall_distance)
      } else if (radios[i].value == "forest") {
        if (star_color_random_id === 1){
          star_color = `rgb(255, ${Math.round(Math.random()*255)}, 0)`;  
        } else {
          star_color = `rgb(255, 0, ${Math.round(Math.random()*75)})`;
        }
        if (timerOnOffChecker === -1) {
          timerOnOffChecker *= -1;
        }
        console.log('radio is forest')
        createLeaf(new_star_left, animation_number, starSVG, star_color, star_fall_distance)
      }
      break;
    }
  }

  if (idClicked === "timer-button-forest") {
    if (star_color_random_id === 1){
      star_color = `rgb(255, ${Math.round(Math.random()*255)}, 0)`;  
    } else {
      star_color = `rgb(255, 0, ${Math.round(Math.random()*75)})`;
    }
  }

  if (idClicked === "timer-button-tequila") {
    if (timerOnOffChecker === -1) {
      timerOnOffChecker *= -1;
    }
    console.log('newSVG entered, idClicked is tequila, run animation createStar')
    createStar(new_star_left, animation_number, starSVG, star_color, star_fall_distance)
  } else if (idClicked === "timer-button-forest") {
    console.log('idClicked is forest')
    createLeaf(new_star_left, animation_number, starSVG, star_color, star_fall_distance)
  }
};


let i = 1;
let createStar = () => {
  setTimeout (() => {
    new_star_left = Math.random()*97;
    animation_number = Math.ceil(Math.random()*4);
    star_delay = 7000;
    star_color_random_id = Math.ceil(Math.random()*2);
    star_color = `rgb(255, ${Math.floor(Math.random()*255)}, 0)`;
    star_fall_distance = '150vh'
    
    if (star_color_random_id === 1){
      star_color = `rgb(255, ${Math.round(Math.random()*255)}, 0)`;  
    } else {
      star_color = `rgb(255, 0, ${Math.round(Math.random()*255)})`;
    }

    $('.main').prepend(
      `<svg class="timer__star timer__star__${i} timer__star--rotate" style="animation: star_rotate_${animation_number} 20s forwards; left:${new_star_left}%"${starSVG}fill="${star_color}" stroke="#000" stroke-width=".16008"/>
      </g>
      </svg>`
    )
    $(`.timer__star__${i}`).animate({
      top: `${star_fall_distance}`
    }, 7000);
    starVanish(i, star_delay);  
    i++
    if (timerOnOffChecker === -1){ //Exits setTimeout if a pause button is clicked
      console.log('returning from createstar becasue of onoff checker')
      return
    }
    if (i < 1000){
      createStar();
    }
  }, 100)
}
let createLeaf = () => {
  setTimeout (() => {
    new_star_left = Math.random()*97;
    animation_number = Math.ceil(Math.random()*4);
    star_delay = 7000;
    star_color_random_id = Math.ceil(Math.random()*2);
    star_color = `rgb(255, ${Math.floor(Math.random()*255)}, 0)`;
    star_fall_distance = '150vh'
    

    $('.main').prepend(
      `<svg class="timer__star timer__star__${i} timer__star--rotate" style="animation: star_rotate_${animation_number} 20s forwards; left:${new_star_left}%" width="30" height="30" version="1.1" viewBox="0 0 7.9375 7.9375" xmlns="http://www.w3.org/2000/svg">${leafSVG1}fill="${star_color}"${leafSVG2}`
    );
    $(`.timer__star__${i}`).animate({
      top: `${star_fall_distance}`
    }, 7000);
    starVanish(i, star_delay);  
    i++
    if (timerOnOffChecker === -1){
      console.log('returning because of onoffchecker')
      return
    }
    if (i < 1000){
      createLeaf()
    }
  }, 100)
}

function starVanish(i, star_delay){
  setTimeout(function(){
    $(`.timer__star__${i}`).css('display', 'none');
  }, star_delay);
};