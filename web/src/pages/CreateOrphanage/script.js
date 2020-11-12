export function addPhotoField(){
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

export function deleteField(event){
    var span = event.currentTarget
    const fieldsContainer = document.querySelectorAll('.new-upload')
    if(fieldsContainer.length < 2){
        // limpar o valor do campo
        span.parentNode.children[0].value = ''
        return
    }

    // deletar o campo
    span.parentNode.remove()
}

export const images = []

export function returnImages(){
    const input = document.querySelectorAll('.takeValue')
    
    input.forEach((imp) => {
        images.push(imp.value)
    })
    return images
}