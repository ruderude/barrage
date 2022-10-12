// 連打で画面が拡大縮小するのを防止
document.addEventListener("dblclick", function(e){ e.preventDefault();}, { passive: false });

const sandbags = [
  "./img/sandbag_left1-min.png",
  "./img/sandbag_left2-min.png",
  "./img/sandbag_left3-min.png",
  "./img/sandbag_right1-min.png",
  "./img/sandbag_right2-min.png",
  "./img/sandbag_right3-min.png",
];

let count = 0;
const fullOverlay = document.getElementById('fullOverlay');
const counter = document.getElementById('counter');
const parent = document.getElementById('parent');
const sandbag = document.getElementById('sandbag');
const bang_clone = document.getElementById('bang_clone');
const btn_area = document.getElementById('btn_area');
const start_btn = document.getElementById('start_btn');
const start_title = document.getElementById('start_title');
const count_down_area = document.getElementById('count_down_area');
const title = document.getElementById('title');
counter.innerText = count;

const fadeout = (node) => {
  node.classList.add('fadeout');
  setTimeout(function(){ 
    node.style.display = 'none'; 
  }, 600);
}

const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const countDownNode = (num) => {
  return new Promise((resolve, reject) => {
    const node = document.createElement('div');
    node.classList.add('count_down');
    node.innerText = num;
    count_down_area.appendChild(node);
    node.classList.add('fadeout_count_down');
    setTimeout(() => {
      node.classList.add('hidden');
      resolve();
    },1000);
  });
}

const countDown = async () => {
  await countDownNode(3);
  await countDownNode(2);
  await countDownNode(1);
  fullOverlay.classList.add('hidden');
  start_title.classList.remove('hidden');
}

const startGame = async () => {
  await countDown();
  await playGame();
  endGame();
}

const playGame = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    },5000);
  });
}

const endGame = () => {
  fullOverlay.classList.remove('hidden');
  const node = document.createElement('div');
  node.classList.add('count_down');
  node.innerText = count + "回";
  count_down_area.appendChild(node);
}

// クリックイベント
start_btn.addEventListener('click', function () {
  title.classList.add('hidden');
  btn_area.classList.add('hidden');
  startGame();
});


parent.addEventListener('click', function (event) {
  count++;
  counter.innerText = count;
	const click_x = event.pageX ;
	const click_y = event.pageY ;

	// 要素の位置を取得
	const client_rect = this.getBoundingClientRect() ;
	const position_x = client_rect.left + window.pageXOffset ;
	const position_y = client_rect.top + window.pageYOffset ;

	// 要素内におけるクリック位置を計算
	const x = click_x - position_x - 60;
  const y = click_y - position_y - 60;
  console.log(x, y);

  const bang = bang_clone.cloneNode(true);
  parent.appendChild(bang);
  bang.removeAttribute('id');
  bang.style.left = Math.floor(x) + 'px';
  bang.style.top = Math.floor(y) + 'px';
  bang.classList.remove('hidden');
  fadeout(bang);

  const num = randRange(0, sandbags.length-1);

  sandbag.style.backgroundImage = `url(${sandbags[num]})`;
});


