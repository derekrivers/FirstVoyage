import { useState, useEffect } from 'react'
import type { Task } from '../types/Task'

const STORAGE_KEY = 'rimmers-list-tasks'

function loadFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Task[]
  } catch {
    return []
  }
}

function saveToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadFromStorage())

  useEffect(() => {
    saveToStorage(tasks)
  }, [tasks])

  const addTask = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const activeCount = tasks.filter((t) => !t.completed).length

  return { tasks, addTask, toggleTask, deleteTask, activeCount }
}
