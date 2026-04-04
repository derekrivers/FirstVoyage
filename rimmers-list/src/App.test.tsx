import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(() => {
  localStorage.clear()
})

describe('App', () => {
  it('displays the page heading "Rimmers List"', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /rimmers list/i })).toBeInTheDocument()
  })

  it('shows "0 tasks left" initially', () => {
    render(<App />)
    expect(screen.getByText(/0 tasks left/i)).toBeInTheDocument()
  })

  it('updates active count after adding a task', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'New task')
    await userEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(screen.getByText(/1 task left/i)).toBeInTheDocument()
  })

  it('updates active count after toggling a task completed', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'Toggle me')
    await userEvent.click(screen.getByRole('button', { name: /add/i }))
    await userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByText(/0 tasks left/i)).toBeInTheDocument()
  })

  it('updates active count after deleting a task', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'Delete me')
    await userEvent.click(screen.getByRole('button', { name: /add/i }))
    await userEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(screen.getByText(/0 tasks left/i)).toBeInTheDocument()
  })
})
