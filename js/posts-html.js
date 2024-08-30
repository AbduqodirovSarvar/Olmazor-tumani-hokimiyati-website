function renderPost(){
    const queryString = window.location.search;
console.log(queryString);

    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('ID')
console.log(product);
    console.log(window.location.search);
}

renderPost();