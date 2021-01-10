
// Welcome to my game project JavaScript code. My name is Omar Shishani

// GAME IDEAS:
// On the harder levels, create one game that makes a block pop up at random places on the map. 
// Create power-ups that allow you to move faster!
// Create power-ups that allow you to move slower
// Create power-ups that allow you to shoot laser beams, and destroy all of the blocks on the last level 
// Create an animation for when you die
// Create some levels with fat cubes, some with thin cubes
// Create a level with little tiny cubes

// Create a level counter.
// Start with number 0, and add from there. Add one number to the counter each time. First increase blocks, then add more. 
// Make a difficulty counter, showing greyed out portions of the rainbow 

//const selects block 1 and 2. Block 2 was initally used as a moving block, but now block 2 is just a stationary obstacle. 
const block_1 = document.querySelector('.block-1');
const block2 = document.querySelector('.block-2');
// block_1_new is going to be used to give block-1 new position values.
let block_1_new = 0;
block_1.style.top = block_1_new;
let block_1_new_horiz = 0;
block_1.style.left = block_1_new_horiz;
const body = document.querySelector('body');
let block_1_info;
let block2Info;
// Below EventListener listens for keystrokes of 'W', 'A', 'S', & 'D', and adjusts position of block_1 accordingly. 
body.addEventListener('keypress', function(){
  const x = event.keyCode;
  // w = 119
  // a = 97
  // s = 115
  // d = 100
  if (x == 115) {
    block_1_new += 15; 
    block_1.style.top = `${block_1_new}px`;
  } else if (x == 119) {
    block_1_new -= 15; 
    block_1.style.top = `${block_1_new}px`;
  } else if (x == 97) {
    block_1_new_horiz -= 15; 
    block_1.style.left = `${block_1_new_horiz}px`;
  } else if (x == 100) {
    block_1_new_horiz += 15; 
    block_1.style.left = `${block_1_new_horiz}px`;
  };
  // Below code moves player block back to 'top=0px', if you move it above top of screen. 
  block_1_info = block_1.getBoundingClientRect();
  if (block_1_info.top < 0) {
    block_1_new = 0;
    /*
    Interesting problem:
    if you use:
    let block_1_new = window.innerHeight - 60;
    block gets stuck at bottom, but its info value reads negative, as if it's still above the screen...
    */
    block_1.style.top = `${block_1_new}px`;
  }
  // Below code moves player block back to top if it reaches bottom. 
  else if (block_1_info.top > window.innerHeight - block_1_info.height) {
    block_1_new = 0;
    block_1.style.top = `${block_1_new}px`;
    levelCounter++;
    newBlockFunc(levelCounter);
    // How to delete the old blocks? Or better yet, how to only add new blocks, don't loop the old levelCounter integers. 
    console.log(levelCounter);
  }
  // The following if/else if will make sure that if the player block reaches the left or right side of the screen, it will switch back to the opposite side of the screen, so that the block never actually goes off screen. 
  if (block_1_info.left > window.innerWidth - block_1_info.width) {
    block_1_new_horiz = 0;
    block_1.style.left = `${block_1_new_horiz}px`;
  }
  else if (block_1_info.left < 0) {
    block_1_new_horiz = window.innerWidth - block_1_info.width;
    block_1.style.left = `${block_1_new_horiz}px`;
  }

  // The following ifs will be to check if block 1 (player block) is overlapping position with block 2...
  block2Info = block2.getBoundingClientRect();
  if (block_1_info.top > block2Info.top-50  &&  block_1_info.left < block2Info.left+50  &&  block_1_info.left > block2Info.left-50  &&  block_1_info.top < block2Info.top+50) {
    block_1_new = 0;
    block_1.style.top = `${block_1_new}px`;
  }
});

block_1_info = block_1.getBoundingClientRect();
block2Info = block2.getBoundingClientRect();

// Below code allows block2 to detect block1, even when block1 isnt moving
setInterval(function(){
  block_1_info = block_1.getBoundingClientRect();
  block2Info = block2.getBoundingClientRect();
  if (block_1_info.top > block2Info.top-50  &&  block_1_info.left < block2Info.left+50  &&  block_1_info.left > block2Info.left-50  &&  block_1_info.top < block2Info.top+50) {
    block_1_new = 0;
    block_1.style.top = `${block_1_new}px`;
  }
}, 1);

// Below setInterval listens for the block to reach bottom, to display sign that you won.
setInterval(function(){
  // Below: number 66 is used because object is 50px, each movement is 15px, so if its 15 + 50 + 1, then block can't reach bottom without tripping the 'if'
  if (block_1_info.top+66 >= window.innerHeight) {
    console.log('win');
  }
}, 1);

// Below code makes block2 move 
/*
let block2LeftNew = 0;
window.setInterval(function(){
  let block2Info = block2.getBoundingClientRect();
  if (block2Info.left > window.innerWidth - 50) {
    block2LeftNew = 0;
    block2.style.left = "0px";
  } 
  block2LeftNew += 1;
  block2.style.left = `${block2LeftNew}vw`
}, 0.1);
*/

const blocks = {
  colors: ["red", "yellow"],
};
// Create a random number between 0 and blocks.colors.length, and use this to randomly change the colors of block2. 
// Create a function that sets a new random color every few seconds. 
// could also create a rgb function, so that random values are input into the rgb each time 


setInterval(function(){
  // Create a random number between 0 and 6. 
  // math.random returns a random number between 0 and 1. 
  let num = Math.round(Math.random()*blocks.colors.length);
  block2.style.backgroundColor = blocks.colors[num];
}, 1000);

// Below code creates a class that will allow new random blocks to be created
class newBlock {
  constructor (height, width, color, speed, top) {
    this.height = height;
    this.width = width; 
    this.color = color;
    this.speed = speed; 
    this.top = top;
  }
};

// Create a function that inputs random values within a certain range to the newBlock constructor.
// The variable 'arr' is defined below to have a place to put the data for all the new blocks that are going to be created by the new function 'newBlockFunc'
const arr = [];
// Below code creates a counter to keep track of levels. 
let levelCounter = 1; 
function newBlockFunc(num) {
  // Below code declares all variables that will be used in a loop within this function. The loop will be used to create 'num' number of random blocks. 
  let rgbR,
      rgbG,
      rgbB,
      height,
      width,
      color,
      speed,
      top,
      arrCurrent;
  
  document.querySelector('.level-counter').innerHTML = `
  <div class="level-counter">Level: ${levelCounter}</div>
  `;
  console.log(`level counter is ${num}`);
  // Should probably add constructor here
  // Below code creates random color, height, width, speed, position values for each new block
  rgbR = Math.round(Math.random()*255);
  rgbG = Math.round(Math.random()*255);
  rgbB = Math.round(Math.random()*255);

  // Create 'ifs' to make the first 5 levels red. 
  // Each 'if' checks the level counter (num) and adjusts a ceratin RGB value accordingly. If the value is too high, a new number is randomly generated until the number is in the correct range. This is done by the 'while' loop.
  if (num <= 5) {
    while (rgbR < 200) {
      rgbR = Math.round(Math.random()*255);
    }
  }
  if (num <= 5) {
    while (rgbG > 50) {
      rgbG = Math.round(Math.random()*255);
    }
  }
  if (num <= 5) {
    while (rgbB > 50) {
      rgbB = Math.round(Math.random()*255);
    } 
  }
  // Below code creates ifs to make the next 5 levels orange
  if (num >= 6 && num <= 10) {
    while (rgbR < 200) {
      rgbR = Math.round(Math.random()*255);
    }
  }
  if (num >= 6 && num <= 10) {
    while (rgbG > 150 && rgbG < 50) {
      rgbG = Math.round(Math.random()*255);
    }
  }
  if (num >= 6 && num <= 10) {
    while (rgbB > 10) {
      rgbB = 5;
    } 
  }
  // Below code creates ifs to make the next 5 levels yellow
  if (num >= 11 && num <= 15) {
    rgbR = 255;
  }
  if (num >= 11 && num <= 15) {
    while (rgbG < 200) {
      rgbG = Math.round(Math.random()*255);
    }
  }
  if (num >= 11 && num <= 15) {
    while (rgbB > 10) {
      rgbB = 5;
    } 
  }
  // The height and width variables create random heights and widths for the moving obstacle blocks, each with a max value of 200px. 
  height = Math.random()*200;
  width = Math.random()*200;
  // Below color variable sets template literal format for RGB values 
  color = `rgb(${rgbR},${rgbG},${rgbB})`;
  speed = Math.random(); 
  // Below code: 'top' uses window.innerHeight so that the new block is never positioned outside of the window's height. 'top' also subtracts the height of the new block, so that, if the newBlock is positioned close enough to the bottom, that it won't go outside of the screen because of newBlock's height. The code adds 100 so that the new block won't start overlapping the player block. The code also subtracts 60px to make up for the border swelling animation of the new blocks, which shouldn't be greater than a total of 30px, since the max size of each border is 15px.
  top = Math.random()*window.innerHeight - height;
  // The following 'while' is added to make sure that the 'top' value will never be greater than 100, so the new block doesn't start and collide with the gamer block.
  // Also, the 'greater than' value of 'window.innerHeight-height' is added to make sure the new block never goes below the bottom of the screen;
  while (top < 100 || top > window.innerHeight-height-60) {
    top = Math.random()*window.innerHeight - height + 100;
  };
  // Below code pushes the data from this iteration of the 'for' loop ('i'), to the array that we created earlier, 'arr'. 
  // For our function to create a number of blocks automatically, we want this array to be part of the function? Or we want the below constructor iteration to be part of the loop? That way we're using the same variable 'i'..
  arr[num] = new newBlock(height, width, color, speed, top);

  // Below code creates new 'div' for new block
  body.insertAdjacentHTML('beforeend',`<div class="newBlock newBlock${num}"></div>`);
  
  // Code below adds data from the array created by the above function and constructor
  // Code below applies CSS styles from values from constructor.
  arrCurrent = document.querySelector(`.newBlock${num}`);
  arrCurrent.style.position = 'absolute';
  arrCurrent.style.height = `${arr[num].height}px`;
  arrCurrent.style.width = `${arr[num].width}px`;
  arrCurrent.style.backgroundColor = arr[num].color;
  arrCurrent.style.top = `${arr[num].top}px`; 

  // Below code makes new block move 
  // It seems like just moving 'arrCurrentLeftNew' down here (as opposed to outside the 'for' loop with the other variable declarations) has fixed the problem of all the blocks moving at the same speed.
  let arrCurrentLeftNew = 0;
  const blockMove = window.setInterval(function(){
    // Below code makes each new block move at it's respective speed value 
    arrCurrent = document.querySelector(`.newBlock${num}`);
    let arrCurrentInfo = arrCurrent.getBoundingClientRect();
    // Below code resets the new block position to 'left: 0px' if it goes outside window right
    if (arrCurrentInfo.left > window.innerWidth - arrCurrentInfo.width - 10) {
      arrCurrentLeftNew = 0;
      arrCurrent.style.left = "0px";
    } 
    arrCurrentLeftNew += arr[num].speed;
    arrCurrent.style.left = `${arrCurrentLeftNew}vw`;
    
    // Below code checks if block 1 is overlapping position with current block
    blockCurrentInfo = arrCurrent.getBoundingClientRect();
    if (block_1_info.top+block_1_info.height > blockCurrentInfo.top  &&  block_1_info.top < blockCurrentInfo.top+blockCurrentInfo.height && block_1_info.left + block_1_info.width > blockCurrentInfo.left  &&  block_1_info.left < blockCurrentInfo.left+blockCurrentInfo.width) {
      block_1_new = 0;
      block_1.style.top = `${block_1_new}px`;
    }      
  }, 30);
  
  // Code below checks if the level is at least 'x', and if it is, will run and release the slow-motion power-up. 
  // variable below allows two 'ifs' to be changed with one value change
  const powerUpLevel = 5; 
  if (levelCounter == 5) {
    // Code below inserts power-up into DOM
    body.insertAdjacentHTML('afterbegin', `
    <div class="power-up__speed"></div>
    `);
    window.setInterval(function(){
      const blockPower = document.querySelector('.power-up__speed');
      console.log('set');
      // Create code that will make the power-up jump to random spots in teh code. 
      // Create a random number for 'top' and 'left', the power-up's new coordinates. 
      powerUpTop = Math.random()*window.innerHeight/2+100; 
      powerUpLeft = Math.random()*window.innerWidth-80; 
      console.log(powerUpTop);
      console.log(powerUpLeft);
      blockPower.style.top = `${powerUpTop}px`;
      blockPower.style.left = `${powerUpLeft}px`;
      blockPowerInfo = blockPower.getBoundingClientRect();
    }, 2000);
  }
  if (levelCounter > 5) {
    // Below code checks if block 1 is overlapping position with current block
    const blockPower = document.querySelector('.power-up__speed');
    blockPowerInfo = blockPower.getBoundingClientRect();
    let powerUpTop;
    let powerUpLeft;
    window.setInterval(function(){
      if (block_1_info.top+block_1_info.height > blockPowerInfo.top  &&  block_1_info.top < blockPowerInfo.top+blockPowerInfo.height && block_1_info.left + block_1_info.width > blockPowerInfo.left  &&  block_1_info.left < blockPowerInfo.left+blockPowerInfo.width) {
        block_1_new = 0;
        block_1.style.top = `${block_1_new}px`;
        clearInterval(blockMove);
        // Following code sets a new movement function for the non-player blocks, making them move slower when the power-up is reached. 
        const blockMoveSlow = window.setInterval(function(){
          // Below code makes each new block move at it's respective speed value 
          for (let i = 0; i < arr.length; i++) {
            arrCurrent = document.querySelector(`.newBlock${num}`);
            let arrCurrentInfo = arrCurrent.getBoundingClientRect();
            // Below code resets the new block position to 'left: 0px' if it goes outside window right
            if (arrCurrentInfo.left > window.innerWidth - arrCurrentInfo.width - 10) {
              arrCurrentLeftNew = 0;
              arrCurrent.style.left = "0px";
            } 
            arrCurrentLeftNew += arr[num].speed/100;
            // Want to make speed value lower, so that the block will move slower. 
            arrCurrent.style.left = `${arrCurrentLeftNew}vw`;
            
            // Below code checks if block 1 is overlapping position with current block
            blockCurrentInfo = arrCurrent.getBoundingClientRect();
            if (block_1_info.top+block_1_info.height > blockCurrentInfo.top  &&  block_1_info.top < blockCurrentInfo.top+blockCurrentInfo.height && block_1_info.left + block_1_info.width > blockCurrentInfo.left  &&  block_1_info.left < blockCurrentInfo.left+blockCurrentInfo.width) {
              block_1_new = 0;
              block_1.style.top = `${block_1_new}px`;
            }
          }
        }, 30);
      }
    });
  }
}; // <--- End of function 

// Select each of the new blocks individually, and slow their speed. 
