const productsContainer = document.querySelector('div.produtos');
console.log(productsContainer);

let produtosArray = new Array(9).fill({
    cod: 89820773,
    name: "Carrinho de mão",
    descricao: 'Carrinho de Mão',
    preco: 100,
    quant: 100,
    avaliacao: 5,
    qtdAvaliacao: 127,
    valorParcela: 111.11,
    qtdParcelas: 5,
    descontos: [
        {
            tipo: 'padrao',
            valor: 0.2,
        },
        {
            tipo: 'pix',
            parcelamento: false,
            valor: 0.1,
        }
    ],
    image: 'http://placeholder.com/544',
});
fetch('http://localhost:3000/products').then((res) => res.json()).then((res) => loadProducts(res));

const produtoHTML = `
    <div class="produto">
        <div class="thumb">
            <img src="http://placeholder.com/544" alt="carrinho de mao" class="carrinho">
            <p class="desconto-pix">-10% à vista no pix</p>
        </div>
        <div class="desc">
            <h3>Carrinho de mão</h3>
            <span class="cod">Cód. 89820773</span>
            <div class="avaliacao">5 estrelas (127)</div>
        </div>
        <div class="info-preco">
            <p class="preco-ant">R$ 360,00 cada</p>
            <p class="preco-agora">R$ 299,00 cada</p>
            <span class="parcelamento">5x de R$ 111,11 s/juros</span>
        </div>
    </div>
`;
/* 
productsContainer.innerHTML = produtosArray.map((l, i) => produtoHTML).reduce((prev, curr) => {
    return prev + curr;
}, '');
 */
const loadProduct = (i) => {
    console.log(i);
    const card = productsContainer.children[i];

    // img
    const prodThumb = card.querySelector('.thumb img');
    prodThumb.src = produtosArray[i].image;

    // pix
    const descontoPixHTML = card.querySelector('.desconto-pix');
    const descontoPix = produtosArray[i].descontos.find((desc) => desc.tipo === 'pix');
    if (descontoPix)
        descontoPixHTML.textContent = '-' + descontoPix.valor * 100 + `% ${descontoPix.parcelamento ? 'parcelado' : 'à vista'} no PIX`;
    else {
        descontoPixHTML.style.display = 'none';
    }

    // desc
    const prodDescHTML = card.querySelector('.desc h3');
    prodDescHTML.textContent = produtosArray[i].description;

    // cod
    const prodCodigoHTML = card.querySelector('.cod');
    prodCodigoHTML.textContent = 'Cód. ' + produtosArray[i].cod;
    
    // avaliacao
    const avaliacaoHTML = card.querySelector('.avaliacao');
    const qtdAvaliacao = produtosArray[i].avaliacoes.length;
    const mediaAvaliacao = produtosArray[i].avaliacoes.reduce((curr, prev) => curr + prev / qtdAvaliacao, 0);
    avaliacaoHTML.textContent = `${mediaAvaliacao} estrelas (${qtdAvaliacao})`;
    
    // preco ant
    const precoAntHTML = card.querySelector('.preco-ant');
    const precoAnt = produtosArray[i].preco;
    precoAntHTML.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoAnt) + ' cada';
    
    // preco agora
    const precoAgoraHTML = card.querySelector('.preco-agora');
    let precoAgora = produtosArray[i].preco;
    const descontoPadrao = produtosArray[i].descontos.find((desc) => desc.tipo === 'padrao');
    if (descontoPadrao) {
        precoAgora = produtosArray[i].preco - produtosArray[i].preco * descontoPadrao.valor;
    }
    precoAgoraHTML.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoAgora) + ' cada';
    
    // parcelamento
    const parcelamentoHTML = card.querySelector('.parcelamento');
    parcelamentoHTML.textContent = `${produtosArray[i].qtdParcelas}x de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produtosArray[i].valorParcela)} s/juros`;
    
}

const loadProducts = (res) => {
    produtosArray = res;
    productsContainer.innerHTML = produtosArray.map((l, i) => produtoHTML).reduce((prev, curr) => {
        return prev + curr;
    }, '');
    
    console.log(produtosArray);
    produtosArray.forEach((p, i) => loadProduct(i));
}

console.log(productsContainer.children[0]);
