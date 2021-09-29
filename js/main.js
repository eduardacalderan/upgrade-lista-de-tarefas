function list() {
  const inputTasks = document.querySelector('#input-tasks')
  const btnTasks = document.querySelector('.btn-add-tasks')
  const tasks = document.querySelector('.tasks')

  // HABILITAR O ENTER PARA ADD TAREFA
  inputTasks.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      if (!inputTasks.value) return
      creatTasks(inputTasks.value)
    } /*13 corresponde a tecla ENTER -- ou seja, se enter for cliclado::: */
  })

  // LIMPAR O INPUT QUANDO ELE FOR SUBMITIDO
  function cleanInput() {
    inputTasks.value = '' /*igual a nada */
    inputTasks.focus()
  }

  // CRIAR LI

  function creatLi() {
    const li = document.createElement('li')
    return li
  }

  // CRIAR BUTTON

  function creatButton(li) {
    const button = document.createElement('button')
    button.innerHTML += ''
    button.setAttribute('class', 'icon-bin')
    button.setAttribute('title', 'Apagar esta tarefa')

    li.innerText += ' '
    li.appendChild(button)
  }

  // EXIBINDO AS TASKS
  function creatTasks(textInput) {
    const li = creatLi()

    li.innerText += textInput
    tasks.appendChild(li)

    cleanInput()
    creatButton(li)
    saveTasks()
  }

  // HABILITAR QUE APAREÇA AS TAREFAS QUANDO O BUTTON FOR CLICADO
  btnTasks.addEventListener('click', function () {
    if (!inputTasks.value) return
    creatTasks(inputTasks.value)
  })

  // REMOVER TAREFAS

  document.addEventListener('click', function (e) {
    const el = e.target

    if (el.classList.contains('icon-bin')) {
      el.parentElement.remove()
      saveTasks()
    }
  })

  //SLVAR AS TAREFAS
  function saveTasks() {
    const liTasks = tasks.querySelectorAll('li')
    const toDoList = []

    for (let task of liTasks) {
      let textTask = task.innerText
      textTask = textTask.replace('Apagar', '') /*replace sig. substituir */
      toDoList.push(textTask)
    }

    const tasksJSON = JSON.stringify(toDoList) //converti o array em um json em string e agr posso salvar em algum lugar e converter de volta em um array

    localStorage.setItem('tasks', tasksJSON)
  }

  //LER AS TAREFAS E JOGA-LAS DE VOLTA NA WEB

  function addSavedTasks() {
    const tasks = localStorage.getItem('tasks')
    const toDoList = JSON.parse(tasks)

    for (let task of toDoList) {
      creatTasks(task)
    }
  }
  addSavedTasks()
}

list()
