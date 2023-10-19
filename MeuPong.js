//OBS: É preciso dos arquivos de som para tocar as músicas do game :)

// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

// Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
  if (meusPontos >= 5 || pontosDoOponente >= 5) {
    // Alguém ganhou, você pode adicionar ações para encerrar o jogo aqui
    textAlign(CENTER);
    textSize(32);
    fill(255);
    text("Fim de Jogo", width / 2, height / 2);
    noLoop(); // Pausa o loop de desenho
  }
}

function mostraBolinha() {
  ellipse(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar() {
  stroke(255);
  textSize(16);
  fill(color(0, 100, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(0, 100, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
    reposicionaBolinha();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
    reposicionaBolinha();
  }
}

function reposicionaBolinha() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  // Define a direção da bola após um ponto ser marcado (escolha a direção que desejar)
  velocidadeXBolinha = 6;
  velocidadeYBolinha = 6;
}

function verificaColisaoRaquete(xRaquete, yRaquete) {
  if (
    xBolinha - raio < xRaquete + raqueteComprimento &&
    xBolinha + raio > xRaquete &&
    yBolinha + raio > yRaquete &&
    yBolinha - raio < yRaquete + raqueteAltura
  ) {
    velocidadeXBolinha *= -1; // Inverte a direção horizontal da bolinha
    raquetada.play();
  }
}
