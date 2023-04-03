/*? no js js needed from me */
const board = document.querySelector(".board");
console.log(board);
const levelTxt = document.getElementById('levelTxt')

const randomPosition = () => ~~(Math.random() * 20) + 1;

let config = {
  speed: 120,
  level: 0,
  player: {
    x: randomPosition(),
    y: randomPosition(),
  },
  food: {
    x: randomPosition(),
    y: randomPosition(),
  },
  velocity: {
    x: 0,
    y: 0,
  },
  showTittle() {
    const title = document.getElementById("title__1");
    title.style.opacity = "1";
    title.style.visibility = "visible";
    title.style.zIndex = "1";

    setTimeout(function () {
      title.style.opacity = "0";
      title.style.visibility = "hidden";
      title.style.zIndex = "-1";
    }, 3000);
  },
};

// METODE
const games = {
  createFood() { 
    // console.log('food created on position: ', config.food.x)
    board.innerHTML = `<div class="food" style="grid-area: ${config.food.y} / ${config.food.x}"></div>`;
  },
  createPlayer() {
    // console.log('player created on position ', config.player.x)
    board.innerHTML += `<div class="player" id="player" style="grid-area: ${config.player.y} / ${config.player.x}"></div>`;
    // PAKE += SUPAYA TIDAK MENIMPA DIV.FOOD atau MENAMBAHKAN DIV BARU
  },
  movePlayer() {
    config.player.x += config.velocity.x;
    config.player.y += config.velocity.y;
  },
  // MERISET KETIKA PLAYER MELEBIHI LEBAR LAYAR
  resetPlayerPosition() {
    if ( config.player.x <= 0 || config.player.x >= 21 || config.player.y <= 0 || config.player.y >= 21) 
    {
      config.player.x = randomPosition();
      config.player.y = randomPosition();
    }
    // console.log(this.resetPlayerPosition)
  },
  levelUp() {
      config.level += 1;
  },
  isWin() {
    if (config.player.x == config.food.x && config.player.y == config.food.y) {
      // config.showTittle();     
      this.levelUp()
      levelTxt.innerHTML = config.level
      console.log({ level: config.level });
      return true;
    }
    return false;
  },
  
  randomFoodPosition() {
    config.food.x = randomPosition();
    config.food.y = randomPosition();
  },
};

function movement(listen) {
  // console.log(listen.key);
  switch (listen.key) {
    case "ArrowUp":
      config.velocity.y = -1;
      config.velocity.x = 0;
      break;

    case "ArrowDown":
      config.velocity.y = 1;
      config.velocity.x = 0;
      break;

    case "ArrowLeft":
      config.velocity.x = -1;
      config.velocity.y = 0;
      break;

    case "ArrowRight":
      config.velocity.x = 1;
      config.velocity.y = 0;
      break;

    default:
      break;
  }
}

//MENGATUR ARAH KEPALA PLAYER
function Headmovement() {
  const playerStyle = document.getElementById("player");
  if (config.velocity.x == 1) {
    playerStyle.style.transform = "scaleX(-1)";
  }
  if (config.velocity.y == 1) {
    playerStyle.style.transform = "rotate(-90deg)";
  }
  if (config.velocity.y == -1) {
    playerStyle.style.transform = "rotate(90deg)";
  }
}

function start() {
  games.createFood();
  games.createPlayer();
  games.movePlayer();
  games.resetPlayerPosition();
  Headmovement();
  const win = games.isWin();
  if (win) games.randomFoodPosition();

  // console.table({ player_position: config.player });
}

setInterval(start, config.speed);

document.addEventListener("keydown", movement);
