// imagens das cartas
let imagens =[];
for(let i = 1; i<=8; i++) imagens.push( `http://picsum.photos/id/${i}/80`);
let fundo = 'https://picsum.photos/80?grayscale';

//Estado de cartas
let cartas = [1 ,1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let cliquesTravados = false;
let tenCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;
const timerDoJogo = new Timer('#timer');

onload = () => {

    //Criar as imagens de fundo
let elemImagens = document.querySelectorAll('#memoria img');
elemImagens.forEach((img, i) => {
        img.src = fundo;
        img.setAttribute('data-valor', i);
        img.style.opacity = 0.4;
    })

    document.querySelector('#btInicio').onclick = iniciaJogo;
}; 

//Inicia jogo

const iniciaJogo = () => {

    //Embaralhar as cartas
    for(let i = 0; i<cartas.length; i++){
        let p =  Math.trunc( Math.random() * cartas.length);
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;
    }


    //Associar evento às imagens
    let elemImagens = document.querySelectorAll('#memoria img');
     elemImagens.forEach((img, i) => {
         img.onclick = trataCliqueImagem;
         img.style.opacity = 1;
         img.src = fundo;
     });


     //Reinica o estado do jogo
     cliquesTravados = false;
     tenCartaVirada = false;
     posicaoCartaVirada = -1;
     valorCartaVirada = 0;
     pontos = 0;

     //ajusta a inteface 
     document.querySelector('#btInicio').disabled = true;
     document.querySelector('#timer').style.backgroundColor = 'orange';
      timerDoJogo.start();

}; 

//Procesa o clique da imagem
const trataCliqueImagem = (e) =>{
    if(cliquesTravados) return;
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor - 1];
    e.target.onclick = null;


    if(!tenCartaVirada) {
        tenCartaVirada = true;
        posicaoCartaVirada = p;
        valorCartaVirada = valor;
    }else{
        if( valor == valorCartaVirada){
            pontos ++;
        }else{
            let po = posicaoCartaVirada;
            cliquesTravados = true;
    setTimeout( () => {
        e.target.src = fundo;
        e.target.onclick = trataCliqueImagem;
        let img = document.querySelector('#memoria #i'+ po);
        img.src = fundo;
        img.onclick = trataCliqueImagem;

        cliquesTravados = false;
    }, 1500);
 
        }
        tenCartaVirada = false;
        posicaoCartaVirada = -1;
        valorCartaVirada = 0;
    }

    if(pontos == 8){
        document.querySelector('#btInicio').disabled = false; 
        document.querySelector('#timer').style.backgroundColor = 'lightgreen';
        timerDoJogo.stop();
    }
};


function Timer(e){

    this.element = e;
    this.control = null;
    this.time = 0;
    this.start = () => {
        this.time = 0;
       this.control =  setInterval( ()=>{
           this.time ++;
           const minutes = Math.trunc(this.time/60);
           const seconds = this.time % 60;
           document.querySelector(this.element).innerHTML = 
           (minutes < 10 ? '0' : '') +
           minutes + ':' + 
           (seconds < 10 ? '0' : '') +
           seconds;
       }, 1000);
    };
    this.stop = () => {
        clearInterval(this.control);
    };
}

 