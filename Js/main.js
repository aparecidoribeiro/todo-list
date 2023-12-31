const list = document.querySelector('.list')
const form = document.querySelector('.form')
const listTask = JSON.parse(localStorage.getItem('listTask')) || []


listTask.forEach(task => {
    criaElemento(task.nome)
})

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    const tarefa = evento.target.elements['tarefa']
    const tarefaMaiuscula = tarefa.value.toUpperCase()
    const buscarTarefa = await listTask.find(e => e.nome == tarefaMaiuscula)


    if (buscarTarefa) {
        alert("Essa tarefa já existe")
    }
    else if (tarefaMaiuscula == "") {
        alert("Não é possível criar uma tarefa vazia")
    }
    else {
        valorId = listTask[listTask.length - 1] ? listTask.length : 0;
        const taskAtual = {
            "nome": tarefaMaiuscula,
            "id": valorId
        }
        listTask.push(taskAtual)
        criaElemento(tarefaMaiuscula)
        localStorage.setItem('listTask', JSON.stringify(listTask))
        tarefa.value = ''
    }

})

function criaElemento(tarefa) {
    const elemento = document.createElement('li')
    elemento.classList.add('list__task')


    const nomeElemento = document.createElement('p')
    nomeElemento.classList.add('task__name')
    nomeElemento.innerText = tarefa

    elemento.appendChild(nomeElemento)
    elemento.appendChild(buttonRemove())
    list.appendChild(elemento)

    removeLista()

}

function buttonRemove() {
    const buttonElemento = document.createElement('button')
    buttonElemento.classList.add('task__remove')
    buttonElemento.innerHTML = '<i class="bi bi-trash-fill icon"></i>'

    buttonElemento.addEventListener('click', function () {
        removeElemento(this.parentNode.innerText, this.parentNode)
    })

    return buttonElemento
}

function removeElemento(tarefa, pai) {
    const element = listTask.find(e => e.nome === tarefa)
    pai.remove()
    listTask.splice(listTask.findIndex(e => e.id === element.id), 1)
    localStorage.setItem('listTask', JSON.stringify(listTask))

    removeLista()
}

function removeLista() {
    if (listTask.length == 0) {
        list.style.display = 'none'
    }
    else {
        list.style.display = 'block'
    }
}