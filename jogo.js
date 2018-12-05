
var horizonte;
var VelocidadeObstaculo;
var pontuacao;
var obstaculos = [];
var dino;
//animacao
var figs = [];
var i;
const NUM_IMAGES = 8;
const PATH = "img/dino";
var sprite = 0;
var animeSpeed = 1;
var time = 0;
//disparo pum
var disparo = false;
var balasX;
var balasY;
var som;
var pum;


function preload() {
	//heroi
	for(i=0;i<NUM_IMAGES;i++){
		figs[i]= loadImage(PATH+i+'.png');
	}

  //fases
  Cenario1 = loadImage('img/florest_bg.jpg');
  Cenario2 = loadImage('img/city_bg.png');
  Cenario3 = loadImage('img/sewer_bg.jpg');
  Cenario4 = loadImage('img/ufrn.png');
  //carrega o som do jogo
   
   pum = loadSound("pum.ogg", loaded);
   som = loadSound("airship.ogg");
}


function setup() {
	
	som.loop();
	som.setVolume(0.5);

    createCanvas(1280, 720);

    textAlign(CENTER);

    horizonte = height - 60;

	pontuacao = 0;
	VelocidadeObstaculo = 6;

	var size = 20;
	dino = new TRex(size * 2, height - horizonte, size);

  textSize(20);
  	 
}
function loaded(){
  pum.play();
}

function draw() {
	
		
if(pontuacao < 1000){
	background(Cenario1);
	fill(255);
	noStroke();
	text("Fase 1: FLORESTA", width / 6, 30);
} if(pontuacao>=1000){
    background(Cenario2);
	fill(255);
	noStroke();
	text("Fase 2: CIDADE", width / 6, 30);
} if(pontuacao>=2000){
	background(Cenario3);
	fill(255);
	noStroke();
	text("Fase 3: ESGOTO", width / 6, 30);
} if(pontuacao>=5000){
	background(Cenario4);
    fill(0);
	noStroke();
	text("Fase 4: ECT", width / 6, 30);
} if(disparo===true){
	loaded();
}
	

	drawHUD();

	LidarNivel(frameCount);

	dino.update(horizonte);

    handleObstaculos();

}

/**
	* desenha linha e pontuação
	*/
function drawHUD() {

    /* desenhar linha */
    stroke(255);
    strokeWeight(2);
    line(0, horizonte, width, horizonte);

	/* marcar pontuação */
	fill(255);
	noStroke();
    text("Pontuação: " + pontuacao, width / 2, 30);

	/* desenhar personagem */
	dino.draw();
}

/**
	*	atualiza, desenha e limpa os obstáculos
	*/
function handleObstaculos() {

  for (var i = obstaculos.length - 1; i >= 0; i--) {

		obstaculos[i].update(VelocidadeObstaculo);
		obstaculos[i].draw();

		if (obstaculos[i].hits(dino)) // se houver uma colisão
			endGame();

    if (!obstaculos[i].onScreen) // se não estiver mais mostrando
      obstaculos.splice(i, 1); // excluir da matriz
  }
}


/**
	* acelera jogo, empurra novos obstáculos, e lida com pontuação
	*/
function LidarNivel(n) {

    if (n % 30 === 0) { // a cada 0,5 segundos

    var n = noise(n); // noisey - tráfego de obstaculos. 

    if (n > 0.5){
      NovoObstaculo(n); // empurre novo obstáculo
	}
	if (n % 120 === 0){ // a cada 2 segundos
	    VelocidadeObstaculo *= 1.05; // acelerar
   }
}
	pontuacao++;

}

/**
	* empurra obstáculo aleatório
	*/
function NovoObstaculo(n) {

	var col = color(random(255), random(255), random(255));
	var size = random(30) + 20;
    var obs = new Obstacle(width + size, size, horizonte, col);

  obstaculos.push(obs);
}

function keyPressed() {

	if ((keyCode === UP_ARROW || keyCode === 32)  && dino.onGround) // pule se possível
		dino.jump();
}

function endGame() {

  noLoop();
  noStroke();
  som.stop();
  textSize(40);
  fill(255);
  text("FIM DE JOGO!!!", width / 2, height / 2);
  textSize(20);
  text("CRTL+R PARA JOGAR NOVAMENTE", width / 2, height / 2 + 20);
}
