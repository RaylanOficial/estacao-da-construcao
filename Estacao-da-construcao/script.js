const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");

let idx = 0;

function Carrossel(){
  idx++;

  if(idx > img.length - 1){
   idx = 0;
}

imgs.style.transform = `translateX(${-idx *  1000}px)`;
}

setInterval (Carrossel,  10000);