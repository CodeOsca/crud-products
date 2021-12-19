localStorage.removeItem('product-id')
const products = JSON.parse(localStorage.getItem('products'))
const $section = document.querySelector('section.row')
const form = document.getElementById('form')


function main() {
    products.forEach(el => {
        let article = document.createElement('article')
        article.setAttribute('class', 'col s12 m6')
        article.innerHTML =
            `<div class="card">
            <div class="card-image">
                <img src="${el.urlImage}" />
                <span class="card-title">
                ${el.name}
                <br>
                <small>Actualizado el ${el.create_at}</small>
                </span>
            </div>

            <div class="card-content">
                <p>
                ${el.description}
                <br>
                <strong class="teal-text text-accent-4">Precio ${el.price}</strong>
                </p>
            </div>

            <div class="card-action">
                <button class="waves-effect waves-light btn">Editar</button>
                <button class="waves-effect waves-light btn red" id="${el.id}">Eliminar</button>
            </div>

            <div class="progress">
                <div class="indeterminate"></div>
            </div>
        </div>`
        $section.appendChild(article)
    });
}

main()


function remove(id) {
    let p = products.findIndex(el => el.id === id)
    products.splice(p, 1)
    localStorage.setItem('products', JSON.stringify(products))
    $section.removeChild(document.getElementById(id).parentElement.parentElement.parentElement)
}

function confirm(id) {
    Swal.fire({
        title: '¿Seguro de querer eliminarlo?',
        showDenyButton: true,
        confirmButtonText: 'Si, seguro',
    }).then((result) => {
        if (result.isConfirmed) {
            remove(id)
            Swal.fire('El producto se ha eliminado correctamente', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('El producto seguira vigente', '', 'info')
        }
    })
}

function redirectEdit(id) {
    localStorage.setItem('product-id', id)
    location.href = 'edit.html'
}

document.addEventListener('click', e => {
    if (e.target.matches('button[class*="red"]')) confirm(e.target.id)
    if (e.target.matches('button[class="waves-effect waves-light btn"]')) redirectEdit(e.target.nextElementSibling.id)
})



form.addEventListener('submit', e => {
    e.preventDefault()
    $section.innerHTML = ''
    let productFinded = []
    products.forEach((product) => {
            productFinded.push(product)
            if (product.name.toUpperCase().includes(e.target.name.value.toUpperCase())) {
                let article = document.createElement('article')
                article.setAttribute('class', 'col s12 m6')
                article.innerHTML =
                    `<div class="card">
            <div class="card-image">
                <img src="${product.urlImage}" />
                <span class="card-title">
                ${product.name}
                <br>
                <small>Actualizado el ${product.create_at}</small>
                </span>
            </div>

            <div class="card-content">
                <p>
                ${product.description}
                <br>
                <strong class="teal-text text-accent-4">Precio ${product.price}</strong>
                </p>
            </div>

            <div class="card-action">
                <button class="waves-effect waves-light btn">Editar</button>
                <button class="waves-effect waves-light btn red" id="${product.id}">Eliminar</button>
            </div>

            <div class="progress">
                <div class="indeterminate"></div>
            </div>
        </div>`
                $section.appendChild(article)
            }

            setTimeout(() => {
                if ($section.innerHTML === '') {
                    $section.innerHTML = `<h2>No se han encontrado productos con el termino ${form.name.value} </h2>`
                }
            }, 500)
        }

    );
})