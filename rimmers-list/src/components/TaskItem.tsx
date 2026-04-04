import type { Task } from '../types/Task'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'active' : 'completed'}`}
      />
      <span className="task-text">{task.text}</span>
      <button onClick={() => onDelete(task.id)} aria-label={`Delete "${task.text}"`}>
        Delete
      </button>
    </li>
  )
}
