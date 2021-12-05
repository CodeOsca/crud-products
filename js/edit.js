const products = JSON.parse( localStorage.getItem('products') )
const form = document.getElementById("form")
const id = localStorage.getItem('product-id')

function getProducts() {
    return products.find( item => item.id === id )
}

function dateCurrent() {
    let date = new Date(),
        month = date.getMonth()+1,
        day = date.getDate(),
        year = date.getFullYear()
    return `${year}-${month}-${day}`
}

function main() {
    const { name, description, price, urlImage } = getProducts()
    form[0].value = name
    form[1].value = description
    form[2].value = price
    form[3].value = urlImage
}

main()

function getValueInput(Id){
    let value = document.getElementById(Id).value
    if(Id === 'description' && value === '') return 'No tengo una descripción, pero por favor cómprame (｡>﹏<｡) 😭🙏'
    if(Id === 'urlImage' && !value) return './img/no-image.jpg'
    return value
}

function createProducts(){
    return {
        id,
        name: getValueInput('name'),
        description: getValueInput('description'),
        urlImage: getValueInput('urlImage'),
        price: getValueInput('price'),
        create_at: dateCurrent()
    }
}


form.addEventListener('submit', e =>{
    e.preventDefault()
    let index = products.findIndex( item => item.id === id  )
    products[index] = createProducts()
    localStorage.setItem('products', JSON.stringify(products) )
})