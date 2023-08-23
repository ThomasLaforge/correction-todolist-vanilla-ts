//  -------------------------------- DOM strucure --------------------------------

const app = document.querySelector('#app') as HTMLDivElement

// Create input and button for the top bar
const input = document.createElement('input')
input.classList.add('task-input')
input.setAttribute('type', 'text')
input.setAttribute('placeholder', 'Nouvelle tâche')

const button = document.createElement('button')
button.innerText = 'Ajouter'
button.addEventListener('click', () => {
  if (input.value != '') {  
    addTask(input.value)
    saveData();
    input.value = ''
  }
})

// Add on top bar
const topBar = document.createElement('div')
topBar.classList.add('top-bar')
topBar.appendChild(input)
topBar.appendChild(button)

// Create list
const list = document.createElement('div')
list.classList.add('todo-list')

app.appendChild(topBar)
app.appendChild(list)

//  ----------------------------- Add initial datas -----------------------------------

// Get initial tasks from local storage
let savedTasks: string[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []
let savedStatus: boolean[] = localStorage.getItem('status') ? JSON.parse(localStorage.getItem('status') as string) : []

// Add saved tasks to the list
savedTasks.forEach((task, index) => {
  const taskStatus = savedStatus[index]
  addTask(task, taskStatus)
})

//  -------------------------------- Functions ----------------------------------------

// Add a task to the list with a value and a status (checked or not) only if the value is not empty
function addTask(value: string, status: boolean = false){
  // Create a task parent element
  const task = document.createElement('div')
  task.classList.add('task')

  // Create childs elements of the task
  const label = document.createElement('label')
  label.classList.add('task-label')
  label.innerText = value
  
  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.classList.add('task-checkbox')
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      label.classList.add('done')
    } else {
      label.classList.remove('done')
    }
    saveData();
  })
  if(status === true){
    checkbox.checked = status
    label.classList.add('done')
  }

  const removeButton = document.createElement('button')
  removeButton.innerText = 'Supprimer'
  removeButton.addEventListener('click', () => {
    task.remove()
    saveData();
  })
  
  // Add elements to the task in this order : checkbox, label, removeButton
  task.appendChild(checkbox)
  task.appendChild(label)
  task.appendChild(removeButton)
  
  // Add the task to the list
  list.appendChild(task)
}

// Save all datas (tasks and status) in local storage
function saveData(){
  const tasksDOM = document.querySelectorAll('.task-label')
  const tasksElements = Array.from(tasksDOM) as HTMLParagraphElement[]
  const tasks = tasksElements.map(task => task.innerText)
  localStorage.setItem('tasks', JSON.stringify(tasks))

  const tasksCheckboxDOM = document.querySelectorAll('.task-checkbox')
  const tasksCheckboxElements = Array.from(tasksCheckboxDOM) as HTMLInputElement[]
  const tasksCheckbox = tasksCheckboxElements.map(task => task.checked)
  localStorage.setItem('status', JSON.stringify(tasksCheckbox))
}