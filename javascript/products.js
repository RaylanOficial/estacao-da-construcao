const produtosContainerHtml = document.querySelector(".products-container");
const orderSelectHtml = document.querySelector("#ordenarpor");
const searchResultCountHtml = document.querySelector("#search-result-count");
const searchResultTermHtml = document.querySelector("#search-result-term");
const filtraPrecoBtnHtml = document.querySelector("#filtrarpreco");
const filtraPrecoInputMinHtml = document.querySelector("#precomin-input");
const filtraPrecoInputMaxHtml = document.querySelector("#precomax-input");

const productsHtml = `
    <div class="produtos ">
    </div>`;

const produtoHtml = `
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

function getQueryString() {
    return window.location.href.split('?')[1];
}

function getQueryParams() {
    if (!getQueryString()) return [];
    const queryString = getQueryString();
    return queryString.split('&');
}

function getQueryParamsObj() {
    /* return getQueryParams().map(param => {
        let obj = {};
        let paramAssign = param.split('=');
        obj[paramAssign[0]] = paramAssign[1]
        return obj;
    }); */
    return getQueryParams().reduce((prev, curr) => {
        let paramAssign = curr.split('=');
        return {...prev, [paramAssign[0]]: paramAssign[1]}
    }, {});
}

/** This function recovers all products from db according to the queryParams */
async function listProducts() {
    let products = [];
/* 
    await fetch('http://localhost:3000/products')
        .then((res) => res.json())
        .then((res) => products = res);
 */
products = new Array(36 * 4 + 5).fill({
    preco: 100,
    name: 'prod',
    description: 'desc'
})
    const queryParams = getQueryParamsObj();
    console.log({ queryParams })

    if (queryParams.orderBy) {
        products.sort((a, b) => a[queryParams.orderBy] - b[queryParams.orderBy]);
    }

    if (queryParams.precoMin) {
        products = products.filter((prod) => prod.preco >= Number(queryParams.precoMin));
    }

    if (queryParams.precoMax) {
        products = products.filter((prod) => prod.preco <= Number(queryParams.precoMax));
    }

    if (queryParams.searchTerm) {
        products = products.filter((prod) => prod.name.toUpperCase().includes(queryParams.searchTerm.toUpperCase()));
    }

    searchResultTermHtml.innerText = queryParams.searchTerm;
    searchResultCountHtml.innerText = `${products.length} Resultados`;

    return products;
}

function addQueryParam(url, obj) {
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    const objAsQueryParams = keys.reduce((prev, curr, index) => {
        let assignment = '';
        const paramsObj = getQueryParamsObj();
        if (!curr in paramsObj) {
            assignment = (curr + '=' + values[index]);
        } else {
            assignment = (curr + '=' + paramsObj[curr]);
        }
        const isLastItem = index === keys.length - 1;
        return prev + assignment + (!isLastItem ? '&' : '');
    }, '');
    console.log({ objAsQueryParams });

    const urlHasQueryParams = url.split('?')[1];
    return urlHasQueryParams ? (url + (objAsQueryParams ? '&' + objAsQueryParams : '')) : (url + '?' + objAsQueryParams);
}

orderSelectHtml.addEventListener("change", (e) => {
    if (!e.target.value) return;
    //window.location.href = addQueryParam(window.location.href, { orderBy: e.target.value });
});

filtraPrecoBtnHtml.addEventListener("click", () => {
    const precoMin = Number(filtraPrecoInputMinHtml.value);
    const precoMax = Number(filtraPrecoInputMaxHtml.value);
    
    if (!precoMin && !precoMax) return;
    
    window.location.href = addQueryParam(window.location.href, { precoMin, precoMax });
})

/* 
async function loadProducts() {
    //produtosContainerHtml.innerHTML = productsHtml;
    console.log({ prods: await listProducts() })
}
loadProducts();
 */

async function loadPagination() {

    const pages = new Array(Math.round((await listProducts()).length / 36)).fill('_');

    const paginationHtml = `
        ${pages.map((p, i) => {
            return `
                <span class="pagination__item">${i}</span>
            `;
        }).reduce((prev, curr) => {
            return curr + prev
        }, '')}
        <span class="pagination__item"><i class="fa-solid fa-angle-right"></i></span>
        <span class="pagination__item"><i class="fa-solid fa-angles-right"></i></span>
    `;

    document.querySelector("pagination").innerHTML = paginationHtml;

}