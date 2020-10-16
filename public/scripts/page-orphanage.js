const options = {
    dragging: false,
    touchZoom: false,
    doubleClick: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// create map
const mymap = L.map('mapid', options).setView([-13.860, -40.082], 16);

// create and add tilelayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

// create icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
})

// create popup overlay


// create and add marker
L.marker([-13.860, -40.082], {icon: icon}).addTo(mymap)

function selectImage(event){
    const button = event.currentTarget;

    // remover classes active
    const buttons = document.querySelectorAll(".images button")
    buttons.forEach(removeActiveClass)
    function removeActiveClass(button){
        button.classList.remove("active")
    }

    // selecionar a imagem clicada
    const image = button.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")

    

    // atualizar o container de image
    imageContainer.src = image.src


    // adicionar a classe .active para este botao
    button.classList.add('active');
}