const todos = [{
    title: 'Order cat food',
    complete: true
}, {
    title: 'Clean kitchen',
    complete: false      
}, {
    title: 'Buy food',
    complete: false
}, {
    title: 'Do work',
    complete: true
}]

const filters = {
    searchText: '',
    hideCompleted: false
}

const renderTodos = function (todos, filters) {
    
    let filteredTodos = todos.filter(function (todo){
        return todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(function (todo){
        return !filters.hideCompleted || !todo.complete
    })

    const incompleteTodos = filteredTodos.filter(function (todo){
        return !todo.complete
    })

    const completeTodos = filteredTodos.filter(function(todo){
        return todo.complete
    })
    
    document.querySelector('#todos').innerHTML = ''

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} tasks left`
    document.querySelector('#todos').appendChild(summary)
    
    filteredTodos.forEach(function (todo){
        const p = document.createElement('p')
        p.textContent = todo.title
        document.querySelector('#todos').appendChild(p)
    })

}

renderTodos(todos, filters)


document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#add-todo').addEventListener('submit', function(e){
    e.preventDefault()
    todos.push({
        title: e.target.elements.todoTitle.value,
        complete: false
    })
    renderTodos(todos, filters)
    e.target.elements.todoTitle.value = ''
})

// document.querySelector('#remove-all').addEventListener('click', function(e){
//     todos.splice(0, todos.length)
//     renderTodos(todos, filters)
// })

document.querySelector('#hide-completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})