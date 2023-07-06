import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Todos } from './components/Todos'
import { type TodoId, type Todo as TodoType, type FilterValue, type TodoTitle } from './types'
import { TODO_FILTERS } from './utils/const'

const mockTodos = [
  {
    id: '1',
    title: 'Aprender React',
    completed: false
  },
  {
    id: '2',
    title: 'Estudiar Nest JS',
    completed: false
  },
  {
    id: '3',
    title: 'Hacer una app con express',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    console.log(filter)

    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemoveOnCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header
        onAddTodo={handleAddTodo}
      />

      <Todos
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />
      <Footer
        activeCount={ activeCount }
        completedCount={completedCount }
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveOnCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
