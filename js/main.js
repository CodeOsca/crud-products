localStorage.removeItem('product-id')
const products = JSON.parse(localStorage.getItem('products')) || []
function ID () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function jsonString(object) {
    return JSON.stringify(object)
}

function jsonParse(stringContent) {
    return JSON.parse(stringContent)
}


function dateCurrent() {
    let date = new Date(),
        month = date.getMonth()+1,
        day = date.getDate(),
        year = date.getFullYear()
    return `${year}-${month}-${day}`
}

function getValueInput(Id){
    let value = document.getElementById(Id).value
    if(Id === 'description' && value === '') return 'No tengo una descripción, pero por favor cómprame (｡>﹏<｡) 😭🙏'
    if(Id === 'urlImage' && !value) return './img/no-image.jpg'
    return value
}

function createProducts(){
    return {
        id:ID(),
        name: getValueInput('name'),
        description: getValueInput('description'),
        urlImage: getValueInput('urlImage'),
        price: getValueInput('price'),
        create_at: dateCurrent()
    }
}

function addProduct() {
    products.push( createProducts() )
}


function saveProduct() {
    localStorage.setItem('products', jsonString(products))
}

document.getElementById('form').addEventListener('submit', e =>{
    e.preventDefault()
    addProduct()
    saveProduct()
    e.target.reset()
    location.href = 'list.html'
})