const puzzleText = document.getElementById('puzzle-text');

const correctPositions = {
  head:   { x: 720, y: 270 },
  body:   { x: 815, y: 440 },
  paw:    { x: 740, y: 440 },
  tail:   { x: 920, y: 460 },
  leash:  { x: 450, y: 290 },
  choker: { x: 785, y: 430 }
};

const CORRECT_ANGLE = 0;
const ALLOWED_ERROR = 30;

const pics = document.querySelectorAll('.pic');

const names = Object.keys(correctPositions);



const arePlaced = {}; 

pics.forEach(pic => {
  let currentAngle = 0;
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  
  pic.addEventListener('dblclick', () => {
    currentAngle += 90;
    if (currentAngle === 360) 
      currentAngle = 0;
    pic.style.transform = `rotate(${currentAngle}deg)`;
    checkAllSolved();
  });

 
  pic.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - pic.offsetLeft;
    offsetY = e.clientY - pic.offsetTop;
    pic.style.cursor = 'grabbing';
  });

 
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    pic.style.left = (e.clientX - offsetX) + 'px';
    pic.style.top  = (e.clientY - offsetY) + 'px';
  });

  
  document.addEventListener('mouseup', () => {
    if (!isDragging) return;

    isDragging = false;
    pic.style.cursor = 'grab';

    
    const picName = names.find(name => pic.classList.contains(name));
    if (!picName) return;

    const target = correctPositions[picName];

    const dx = Math.abs(pic.offsetLeft - target.x);
    const dy = Math.abs(pic.offsetTop  - target.y);

    const res = dx < ALLOWED_ERROR && dy < ALLOWED_ERROR && currentAngle === CORRECT_ANGLE;
    arePlaced[picName] = res;

    checkAllSolved();
  });
});


function checkAllSolved() {
  const allSolved = names.every(name => arePlaced[name] === true);

  if (allSolved){
     puzzleText.textContent = 'Правильно!';
     end();
  }
  else {
    puzzleText.textContent = 'Соберите картинку здесь';
  }    
}

function end() {
  document.querySelector('.head').classList.add('spin');
  document.querySelector('.tail').classList.add('spin');
}


