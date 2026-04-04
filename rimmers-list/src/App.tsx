import { useTasks } from './hooks/useTasks'
import { TaskInput } from './components/TaskInput'
import { TaskList } from './components/TaskList'
import './App.css'

function App() {
  const { tasks, addTask, toggleTask, deleteTask, activeCount } = useTasks()

  return (
    <div className="app">
      <h1>Rimmers List</h1>
      <p className="active-count">{activeCount} task{activeCount !== 1 ? 's' : ''} left</p>
      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  )
}

export default App
