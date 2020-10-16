// create map
const mymap = L.map('mapid').setView([-13.860, -40.082], 16);

// create and add tilelayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

// create icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68]
})

let marker
// create and add marker
mymap.on('click', (event) => {
    const lat = event.latlng.lat
    const lng = event.latlng.lng

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon
    marker && mymap.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat, lng], {icon:icon}).addTo(mymap)
})

function addPhotoField(){
    // pegar o container de fotos #images
    const container = document.querySelector('#images')
    // pegar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')
    // realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length-1].cloneNode(true)
    // verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]
    if(input.value == ""){
        return
    }
    // limpar o campo antes de adicionar ao contador de imagens
    input.value = '';
    // adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)
}

function deleteField(event){
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2){
        // limpar o valor do campo
        span.parentNode.children[0].value = ''
        return
    }

    // deletar o campo
    span.parentNode.remove()
}

function toggleSelect(event){
    // retirar a class .active (dos botoes)
    document.querySelectorAll('.button-select button')
    .forEach(function(button) {
        button.classList.remove('active')
    })
    // colocar a class .active no botao clicado
    const button = event.currentTarget
    button.classList.add('active')
    // atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    // verificar se sim ou não
    input.value = button.dataset.value
    
}