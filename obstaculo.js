function Obstacle(x, size, horizon, color) {

  this.x = x;
  this.y = horizonte - size;

  this.size = size;
  this.color = color;

  this.onScreen = true;
}

/**
	*	lidar com valores x na tela
	*/
Obstacle.prototype.update = function(speed) {

	/* verifica os valores fora da tela */
	this.onScreen = (this.x > -this.size);

	/* movimento */
	this.x -= speed;
};
 //Obstaculos
Obstacle.prototype.draw = function() { 

	fill(this.color);
	stroke(255);
	strokeWeight(2);
	rect(this.x, this.y, this.size, this.size);
};

/**
	* verifica colisões
	*/
Obstacle.prototype.hits = function(dino) {

    var metadeTamanho= this.size / 2;
	var distanciaMinima = metadeTamanho+ (dino.raio); // mais próximo antes da colisão

	/* encontrar coordenadas do centro */
	var xCentro = this.x + metadeTamanho;
	var yCentro = this.y + metadeTamanho;

	var distancia = dist(xCentro, yCentro, dino.x, dino.y); // calcular a distância dos centros

	return (distancia < distanciaMinima); // resultado de retorno

};
