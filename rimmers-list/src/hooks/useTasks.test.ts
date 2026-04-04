import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTasks } from './useTasks'

const STORAGE_KEY = 'rimmers-list-tasks'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('useTasks – initialisation', () => {
  it('loads tasks from localStorage when data is present', () => {
    const stored = [{ id: '1', text: 'Buy milk', completed: false }]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toEqual(stored)
  })

  it('returns empty array when localStorage is empty', () => {
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toEqual([])
  })

  it('returns empty array when localStorage contains invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json{{{')
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toEqual([])
  })
})

describe('useTasks – addTask', () => {
  it('appends a new task with unique id, trimmed text, and completed: false', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('  Hello world  ') })
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].text).toBe('Hello world')
    expect(result.current.tasks[0].completed).toBe(false)
    expect(result.current.tasks[0].id).toBeTruthy()
  })

  it('does not add a task when given an empty string', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('') })
    expect(result.current.tasks).toHaveLength(0)
  })

  it('does not add a task when given only whitespace', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('   ') })
    expect(result.current.tasks).toHaveLength(0)
  })

  it('writes updated task array to localStorage', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Test') })
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(saved).toHaveLength(1)
    expect(saved[0].text).toBe('Test')
  })
})

describe('useTasks – toggleTask', () => {
  it('flips completed for the matching id', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Flip me') })
    const id = result.current.tasks[0].id
    act(() => { result.current.toggleTask(id) })
    expect(result.current.tasks[0].completed).toBe(true)
    act(() => { result.current.toggleTask(id) })
    expect(result.current.tasks[0].completed).toBe(false)
  })

  it('leaves other tasks unchanged', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('A') })
    act(() => { result.current.addTask('B') })
    const idA = result.current.tasks[0].id
    act(() => { result.current.toggleTask(idA) })
    expect(result.current.tasks[1].completed).toBe(false)
  })

  it('writes updated array to localStorage', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Persist toggle') })
    const id = result.current.tasks[0].id
    act(() => { result.current.toggleTask(id) })
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(saved[0].completed).toBe(true)
  })
})

describe('useTasks – deleteTask', () => {
  it('removes the task with the matching id', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Delete me') })
    const id = result.current.tasks[0].id
    act(() => { result.current.deleteTask(id) })
    expect(result.current.tasks).toHaveLength(0)
  })

  it('leaves other tasks intact', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Keep') })
    act(() => { result.current.addTask('Remove') })
    const idToRemove = result.current.tasks[1].id
    act(() => { result.current.deleteTask(idToRemove) })
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].text).toBe('Keep')
  })

  it('writes updated array to localStorage', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Gone') })
    const id = result.current.tasks[0].id
    act(() => { result.current.deleteTask(id) })
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(saved).toHaveLength(0)
  })
})

describe('useTasks – activeCount', () => {
  it('counts only tasks where completed === false', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('One') })
    act(() => { result.current.addTask('Two') })
    act(() => { result.current.addTask('Three') })
    const idOne = result.current.tasks[0].id
    act(() => { result.current.toggleTask(idOne) })
    expect(result.current.activeCount).toBe(2)
  })
})
