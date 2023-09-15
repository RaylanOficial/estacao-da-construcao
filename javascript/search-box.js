const searchInput = document.querySelector("#pesquisar-input");

searchInput.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "../paginas/Products.html?searchTerm=" + searchInput.children[0].value;
})
