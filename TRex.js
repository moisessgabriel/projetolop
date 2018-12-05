function TRex(x, y, raio) {
	
	
	
	this.x = x;
	this.y = y;

	this.yVelocidade = 0;
	this.speed = 1;
	this.onGround = true;

	this.raio = raio; // raio do dino
}

/**
	*	lidar com valores de y
	*/

TRex.prototype.update = function(plataforma) {

	var inferior = this.y + this.raio; // pixel inferior do círculo
	var proximoInferior = inferior + this.yVelocidade; // calcular o fundo do próximo quadro

  if (inferior <= plataforma && proximoInferior >= plataforma) { // próximo quadro será na plataforma

		this.yVelocidade = 0; // redefinir velocidade
		this.y = plataforma - this.raio; // não passe da plataforma
		this.onGround = true;
  } else if (plataforma - inferior > 1) { // longe de plataforma

		this.yVelocidade += this.speed; // aumentar velocidade
		this.onGround = false;
  }

	/* movimento */
	this.y += this.yVelocidade;
};

/**
	* faça o dino pular
	*/
TRex.prototype.jump = function() {

	this.yVelocidade = -(this.raio * 0.7); // jump
};

TRex.prototype.draw = function() { //draw do dino.

  
  time++;
	if(time%animeSpeed===0){
		image(figs[sprite],this.x, this.y-20);
		sprite++;
		if(sprite===8){
			sprite=0;
			
		}
	}
	//disparo
	if (keyIsDown(70) ) { 
		disparo = true; 
		
		//posicao da bala 
		balasY = this.y; 
		balasX = this.x;
	}
	// movimentação do disparo 
		if(disparo==true){
			balasX = balasX - 5;
		}	
		
				
		// se o disparo sumir na tela 
		if (balasX < 0 ) {
			balasX = -20;
			disparo=false;
		}
		if(disparo){ 
		ellipse(balasX,balasY,5,5);
	}


	
};
