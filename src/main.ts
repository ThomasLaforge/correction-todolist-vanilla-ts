const app = document.querySelector('#app') as HTMLDivElement

// Get initial tasks from local storage
let savedTasks: string[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []
let savedStatus: boolean[] = localStorage.getItem('status') ? JSON.parse(localStorage.getItem('status') as string) : []

// Create input and button for tje top bar
const input = document.createElement('input')
input.setAttribute('type', 'text')
input.setAttribute('placeholder', 'Nouvelle tâche')

const button = document.createElement('button')
button.innerHTML = 'Ajouter'
button.addEventListener('click', () => {
  if (input.value === '') {
    return
  }

  savedTasks.push(input.value)
  savedStatus.push(false)
  localStorage.setItem('tasks', JSON.stringify(savedTasks))
  localStorage.setItem('status', JSON.stringify(savedStatus)) 

  const task = document.createElement('div')
  task.classList.add('task')

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.addEventListener('change', () => onCheckboxChange(checkbox, task))
  task.appendChild(checkbox)
  
  const label = document.createElement('label')
  label.innerText = input.value
  task.appendChild(label)

  const remove = document.createElement('button')
  remove.innerText = 'Supprimer'
  remove.addEventListener('click', () => {
    list.removeChild(task)
    
  })
  task.appendChild(remove)
  
  list.appendChild(task)
  input.value = ''
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

// Add saved tasks to the list
savedTasks.forEach((task, index) => {
  const taskElement = document.createElement('div')
  taskElement.classList.add('task')
  
  const checkbox = document.createElement('input') as HTMLInputElement
  checkbox.setAttribute('type', 'checkbox')
  checkbox.addEventListener('change', () => onCheckboxChange(checkbox, taskElement))
  taskElement.appendChild(checkbox)
  
  const label = document.createElement('label')
  label.innerText = task
  taskElement.appendChild(label)
  
  const remove = document.createElement('button')
  remove.innerText = 'Supprimer'
  remove.addEventListener('click', () => onTaskRemove(taskElement, index))
  
  taskElement.appendChild(remove)
  list.appendChild(taskElement)
  
  if (savedStatus[index]) {
    checkbox.checked = true
    taskElement.classList.add('done')
  }
})

// events on a task
const onCheckboxChange = (checkbox: HTMLInputElement, taskElement: HTMLDivElement) => {
    
    if (checkbox.checked) {
      taskElement.classList.add('done')
    } else {
      taskElement.classList.remove('done')
    }

    savedStatus = savedStatus.map((status, index) => {
      if (index === savedTasks.indexOf(taskElement.querySelector('label')?.innerText as string)) {
        return checkbox.checked
      }

      return status
    })
    localStorage.setItem('status', JSON.stringify(savedStatus))

}

const onTaskRemove = (taskElement: HTMLDivElement, index: number) => {
  list.removeChild(taskElement)
  savedTasks.splice(index, 1)
  savedStatus.splice(index, 1)
  localStorage.setItem('tasks', JSON.stringify(savedTasks))
  localStorage.setItem('status', JSON.stringify(savedStatus))
}