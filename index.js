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
const protocol = location.protocol;
const hostname = location.hostname;
const fullOverlay = document.getElementById('fullOverlay');
const counter = document.getElementById('counter');
const parent = document.getElementById('parent');
const sandbag = document.getElementById('sandbag');
const bangClone = document.getElementById('bang_clone');
const startBtnArea = document.getElementById('start_btn_area');
const startBtn = document.getElementById('start_btn');
const startTitle = document.getElementById('start_title');
const titleArea = document.getElementById('title_area');
const title = document.getElementById('title');
const resetBtnArea = document.getElementById('reset_btn_area');
const resetBtn = document.getElementById('reset_btn');
const twitterArea = document.getElementById('twitter_area');
const twitterShare = document.getElementById('twitter_share');
counter.innerText = count;

const init = () => {
  count = 0;
  counter.innerText = count;
  const countDownArea = document.getElementById('count_down_area');
  countDownArea.remove();
  const node = document.createElement('div');
  node.setAttribute('id', 'count_down_area');
  node.classList.add('count_down_area');
  titleArea.appendChild(node);
  startTitle.classList.add('hidden');
  startBtnArea.classList.remove('hidden');
  resetBtnArea.classList.add('hidden');
  twitterArea.classList.add('hidden');
  title.classList.remove('hidden');
  sandbag.style.backgroundImage = `url(img/sandbag_start-min.png)`;
}

const fadeout = (node) => {
  node.classList.add('fadeout');
  setTimeout(function(){ 
    node.style.display = 'none'; 
  }, 600);
}

const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const countDownNode = (num) => {
  return new Promise((resolve, reject) => {
    const countDownArea = document.getElementById('count_down_area');
    const node = document.createElement('div');
    node.classList.add('count_down');
    node.innerText = num;
    countDownArea.appendChild(node);
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
  startTitle.classList.remove('hidden');
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
  const countDownArea = document.getElementById('count_down_area');
  const node = document.createElement('div');
  node.classList.add('count_down');
  node.innerText = count + "回";
  countDownArea.appendChild(node);
  resetBtnArea.classList.remove('hidden');
  twitterArea.classList.remove('hidden');
  makeTwiterUrl(count);
}

const makeTwiterUrl = (count) => {
  const url = `https://twitter.com/share?url=https://game.rude7.com/barrage/&via=rude_rockers&related=rude_rockers&hashtags=hashtag,hashtag2&text=連打記録${count}回!!`;
  twitterShare.setAttribute('href', url);
}

// クリックイベント
startBtn.addEventListener('click', function () {
  title.classList.add('hidden');
  startBtnArea.classList.add('hidden');
  startGame();
});

resetBtn.addEventListener('click', function () {
  init();
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

  const bang = bangClone.cloneNode(true);
  parent.appendChild(bang);
  bang.removeAttribute('id');
  bang.style.left = Math.floor(x) + 'px';
  bang.style.top = Math.floor(y) + 'px';
  bang.classList.remove('hidden');
  fadeout(bang);

  const num = randRange(0, sandbags.length-1);

  sandbag.style.backgroundImage = `url(${sandbags[num]})`;
});

window.onload = () => {
  init();
}
