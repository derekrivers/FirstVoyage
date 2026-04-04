import { useState, type KeyboardEvent } from 'react'

interface TaskInputProps {
  onAdd: (text: string) => void
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState('')

  const handleAdd = () => {
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div className="task-input">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task…"
        aria-label="New task"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}
