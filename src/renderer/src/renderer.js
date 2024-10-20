const createRow = (user, usersTable) => {
  const tr = document.createElement('tr')
  const [name, age, phone, email] = user
  ;[name, email, age, phone].forEach((data) => {
    const td = document.createElement('td')
    td.textContent = data
    tr.appendChild(td)
  })
  usersTable.appendChild(tr)
  return tr
}

const renderTable = async () => {
  const table = document.createElement('table')
  table.classList.add('table')
  const thead = document.createElement('thead')
  const tr = document.createElement('tr')
  const columns = ['name', 'email', 'age', 'phone']
  columns.map((col) => {
    const th = document.createElement('th')
    th.textContent = col
    tr.appendChild(th)
  })
  thead.appendChild(tr)
  table.appendChild(thead)
  const fragment = document.createDocumentFragment()
  const users = await window.api.parseCSV()
  users.forEach((user) => {
    fragment.appendChild(createRow(user, table))
  })
  table.appendChild(fragment)
  document.getElementById('wrapper').replaceChildren(table)
  const createUserBtn = document.createElement('button')
  createUserBtn.classList.add('createUser')
  createUserBtn.textContent = 'Create User'
  createUserBtn.addEventListener('click', async () => {
    renderForm()
  })
  document.getElementById('wrapper').appendChild(createUserBtn)
}

renderTable()

const createUser = async () => {
  const name = document.querySelector('input[name="name"]').value
  const email = document.querySelector('input[name="email"]').value
  const age = document.querySelector('input[name="age"]').value
  const phone = document.querySelector('input[name="phone"]').value
  const newUser = `${name}, ${age}, ${phone}, ${email}`
  await window.api.writeCSV(newUser)
}

const renderForm = () => {
  const form = document.createElement('form')
  const headerForm = document.createElement('h2')
  headerForm.textContent = 'new User'
  const fields = ['name', 'email', 'age', 'phone']
  fields.map((field) => {
    const input = document.createElement('input')
    input.setAttribute('required', true)
    input.setAttribute('name', field)
    input.setAttribute('placeholder', field)
    switch (field) {
      case 'name':
        input.setAttribute('type', 'text')
        break
      case 'email':
        input.setAttribute('type', 'email')
        break
      case 'phone':
        input.setAttribute('type', 'tel')
        break
      case 'age':
        input.setAttribute('type', 'number')
        break
    }
    form.appendChild(input)
  })
  const submitButton = document.createElement('button')
  submitButton.classList.add('userSubmit')
  submitButton.setAttribute('type', 'submit')
  submitButton.textContent = 'Create'
  form.appendChild(submitButton)
  document.getElementById('wrapper').replaceChildren(form)
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    createUser()
    renderTable()
  })
  const backBtn = document.createElement('button')
  backBtn.textContent = 'Back to the list of users'
  backBtn.addEventListener('click', renderTable)
  document.getElementById('wrapper').appendChild(backBtn)
}
