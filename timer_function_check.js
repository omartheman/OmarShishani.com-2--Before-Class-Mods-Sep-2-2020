function timer(seconds){
  console.log(seconds);
  let timer_sec = setInterval(function(){
    seconds--
    console.log(seconds);
    if (seconds <= 0) {
      console.log('Timer Complete');
      clearInterval(timer_sec);
    }
  }, 1000);
}
timer(5);