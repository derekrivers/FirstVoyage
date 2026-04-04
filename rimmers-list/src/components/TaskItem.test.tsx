import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskItem } from './TaskItem'
import type { Task } from '../types/Task'

const activeTask: Task = { id: '1', text: 'Walk the dog', completed: false }
const completedTask: Task = { id: '2', text: 'Feed the cat', completed: true }

describe('TaskItem', () => {
  it('renders task text and unchecked checkbox for active task', () => {
    render(<TaskItem task={activeTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders checked checkbox for completed task', () => {
    render(<TaskItem task={completedTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onToggle with task id when checkbox is clicked', async () => {
    const onToggle = vi.fn()
    render(<TaskItem task={activeTask} onToggle={onToggle} onDelete={vi.fn()} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('calls onDelete with task id when Delete button is clicked', async () => {
    const onDelete = vi.fn()
    render(<TaskItem task={activeTask} onToggle={vi.fn()} onDelete={onDelete} />)
    await userEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('applies completed class for completed tasks', () => {
    const { container } = render(
      <TaskItem task={completedTask} onToggle={vi.fn()} onDelete={vi.fn()} />
    )
    expect(container.querySelector('.task-item')).toHaveClass('completed')
  })

  it('does not apply completed class for active tasks', () => {
    const { container } = render(
      <TaskItem task={activeTask} onToggle={vi.fn()} onDelete={vi.fn()} />
    )
    expect(container.querySelector('.task-item')).not.toHaveClass('completed')
  })
})
