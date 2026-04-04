import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskInput } from './TaskInput'

describe('TaskInput', () => {
  it('calls onAdd with trimmed text when Add button is clicked', async () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await userEvent.type(screen.getByRole('textbox'), '  Buy groceries  ')
    await userEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(onAdd).toHaveBeenCalledWith('  Buy groceries  ')
  })

  it('calls onAdd when Enter is pressed in the input', async () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await userEvent.type(screen.getByRole('textbox'), 'Press enter{Enter}')
    expect(onAdd).toHaveBeenCalled()
  })

  it('clears the input after adding', async () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Clear me')
    await userEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(input).toHaveValue('')
  })

  it('does not call onAdd for empty input', async () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await userEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(onAdd).not.toHaveBeenCalled()
  })
})
