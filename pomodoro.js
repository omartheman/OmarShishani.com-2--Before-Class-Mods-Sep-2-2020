let star_fall_distance;
let idClicked;
let timerOnOffChecker = -1;
let hours;
let minutes;
let seconds;
let timeRemaining;
let new_star_left;
let star_num;
let star_delay;
let star_color;
let placeHours = ""
let placeMins = ""
let placeSecs = ""

let audio_tequila = new Audio("audio/tequila.mp3");
let audio_forest = new Audio("audio/forest.mp3");
let airhorn = new Audio("audio/airhorn.mp3");

let audioPause = () => {
  audio_tequila.pause();
  audio_tequila.currentTime = 0;
  airhorn.pause();
  airhorn.currentTime = 0;
  audio_forest.pause();
  audio_forest.currentTime = 0;
}
let timerOnOffCheckerSwitcher = () => {
  console.log('Running timerOnOffCheckerSwitcher');
  if (timerOnOffChecker === 1) {
    timerOnOffChecker *= -1;
  }
  return
};
let timerCountdown = () => {
  let timerInterval = setInterval(function (){
    console.log('interval is running')
    if (timerOnOffChecker === -1) {
      clearInterval(timerInterval);
      console.log('timer countdown cleared')
      return
    }
    if (hours < 10 || minutes < 10 || seconds < 10) {
      if (hours < 10){
        placeHours = 0
      } else {
        placeHours = ""
      }
      if (minutes < 10){
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
    timeRemaining = `<span class="timer__span--values">${placeHours}${hours}:${placeMins}${minutes}:${placeSecs}${seconds}</span>`;
    $(".text-main__grid-module--top").html(timeRemaining);  
    if (hours >= 1 && minutes >= 1 && seconds <= 0) {
      minutes--;
      seconds = 59;
      $(".timer__display-text").html(timeRemaining);  
    } else if (hours >= 1 && minutes <= 0 && seconds <= 0) {
      hours--;
      minutes = 59; 
      seconds = 59; 
      $(".timer__display-text").html(timeRemaining); 
    }
    else if (minutes >= 1 && seconds <= 0) {
      minutes--;
      seconds = 59;
      $(".timer__display-text").html(timeRemaining);  
    } else if (minutes >= 1 && seconds >= 0) {
      seconds--;
      $(".timer__display-text").html(timeRemaining);  
    } else if (minutes <= 1 && seconds > 0) {
      seconds--;
      $(".timer__display-text").html(timeRemaining);  
    } else if (seconds <= 0) {
      clearInterval(timerInterval);
      $(".timer__display-text").html(`${timeRemaining}: <span class="timer__span--values">Timer Complete!</span>`);
      if (idClicked === "timer-button-tequila") {
        audio_tequila.play();
        airhorn.play();
        newSVG();
      } else if (idClicked === "timer-button-forest") {
        audio_forest.play();
        newSVG();
      }
      $('.timer__star').toggleClass('timer__star--rotate');
      $('.timer__star').animate({top: `${star_fall_distance}`}, 7000);  
    } 
  }, 1000);
}


let timerStartedChecker = -1;
$(document).ready(
  function mainTimerCountdownStarter(){
    $(".timer__button--play").click(function(e){
      document.querySelector('.timer__button--play').classList.toggle('timer__button--clicked');
      document.querySelector('.timer__button--pause').classList.toggle('timer__button--clicked');
      if (timerOnOffChecker === 1) {
        // Resume
        console.log(`RESUMING timerOnOffChecker is value: ${timerOnOffChecker}`)
        timerOnOffChecker *= -1;
        timerStartedChecker *= -1;
        timerCountdown();
        audioPause();
      }
      timerStartedChecker *= -1;
      timerOnOffChecker *= -1;
      idClicked = e.target.id;
      console.log(e.target.id)
      audioPause();
      $(".text-main--timer").css('display', 'block');
      hours = $(".timer__hours-input").val();
      minutes = $(".timer__minutes-input").val();
      seconds = $(".timer__seconds-input").val();
      if (hours == "") {hours = 0};
      if (minutes == "") {minutes = 0};
      if (seconds == "") {seconds = 0};
      timeRemaining = `<span class="timer__span--values">${hours}</span> hours, <span class="timer__span--values">${minutes}</span> minutes, <span class="timer__span--values">${seconds}</span> seconds`;
      $(".timer__display-text").html(timeRemaining);  
      timerCountdown();
    });
    $(".timer__button--reset").click(function(){
      console.log(`timerOnOffChecker is value: ${timerOnOffChecker}`)
      audioPause();
      timerOnOffCheckerSwitcher();
      console.log("reset clicked");
      $(".text-main--timer").css('display', 'block');
      if (hours == "") {hours = 0};
      if (minutes == "") {minutes = 0};
      if (seconds == "") {seconds = 0};
      hours = 0;
      minutes = 0;
      seconds = 0;
      timeRemaining = `<span class="timer__span--values">${hours}</span> hours, <span class="timer__span--values">${minutes}</span> minutes, <span class="timer__span--values">${seconds}</span> seconds`;
      $(".timer__display-text").html(timeRemaining);
    });
    $(".timer__button--pause").click(function(){
      document.querySelector('.timer__button--pause').classList.toggle('timer__button--clicked');
      document.querySelector('.timer__button--play').classList.toggle('timer__button--clicked');
      console.log(`timerOnOffChecker is value: ${timerOnOffChecker}`)
      audioPause();
      timerOnOffCheckerSwitcher();
      console.log("pause clicked");
    });
    $(".timer__button--resume").click(function(){
      console.log(`timerOnOffChecker is value: ${timerOnOffChecker}`)
      timerOnOffChecker *= -1;
      timerCountdown();
      audioPause();
    });
  }
);


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
      return
    }
    if (i < 1000){
      createLeaf()
    }
  }, 100)
}

function newSVG(){
  new_star_left = Math.random()*97;
  animation_number = Math.ceil(Math.random()*4);
  star_delay = Math.random()*20000;
  star_color_random_id = Math.ceil(Math.random()*2);
  
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
function starVanish(i, star_delay){
  setTimeout(function(){
    $(`.timer__star__${i}`).css('display', 'none');
  }, star_delay);
};