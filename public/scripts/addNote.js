const formBody = document.querySelector('.container.form-group')
const noteButtons = document.querySelector('#note-buttons')

// const removeButton = document.createElement('button')
// removeButton.setAttribute('class','btn btn-danger')
// removeButton.type = 'button'
// removeButton.onclick = () => {
//         formBody.removeChild(titleLabel)
//         formBody.removeChild(titleInput)
//         formBody.removeChild(contentLabel)
//         formBody.removeChild(contentInput)
//         removeButton.setAttribute('class','d-none')
//         addButton.setAttribute('class','d-block')
// }       
// removeButton.innerText = 'Remove Note'

const titleLabel = document.createElement('label')
titleLabel.for = 'title'
titleLabel.innerText = 'Title'
const titleInput = document.createElement('input')
titleInput.name = 'title'
titleInput.id = 'title'
titleInput.type = 'text'
titleInput.required = true

const contentLabel = document.createElement('label')
contentLabel.for = 'content'
contentLabel.innerText = 'Content'
const contentInput = document.createElement('textarea')
contentInput.name = 'content'
contentInput.id = 'content'
contentInput.type = 'text'
contentInput.rows = '5'
contentInput.required = true

const addFields =  () => {
        const lbArray = [titleLabel,contentLabel].forEach(label => {
                label.setAttribute('class','mb-1')
        })
        const ttArray = [titleInput,contentInput].forEach(input => {
                input.setAttribute('class','form-control mb-3')
        })

        noteButtons.children[0].classList.add('d-none')
        noteButtons.children[1].classList.remove('d-none')
        
        formBody.append(titleLabel,titleInput,contentLabel,contentInput)
}


const removeFields = () => {
        const fields = [titleLabel,titleInput,contentLabel,contentInput]

        noteButtons.children[0].classList.remove('d-none')
        noteButtons.children[1].classList.add('d-none')

        fields.forEach(field => {
                formBody.removeChild(field)
        })
}