'use client'

import { useState, useEffect } from 'react'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import { Task, TaskFormData, TasksResponse, TaskResponse } from '@/types/task'

/**
 * Home Page Component
 * 
 * Main page of the todo application that orchestrates all functionality:
 * - Fetches and displays tasks
 * - Handles task creation
 * - Handles task deletion
 * - Manages loading and error states
 */
export default function HomePage() {
  // State management
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch all tasks from the API
  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/tasks')
      const data: TasksResponse = await response.json()
      
      if (data.success && data.data) {
        // Convert date strings back to Date objects
        const tasksWithDates = data.data.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }))
        setTasks(tasksWithDates)
      } else {
        setError(data.error || 'Failed to fetch tasks')
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setError('Failed to connect to the server')
    } finally {
      setIsLoading(false)
    }
  }

  // Create a new task
  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      setIsCreating(true)
      setError(null)
      
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
      
      const data: TaskResponse = await response.json()
      
      if (data.success && data.data) {
        // Convert date strings back to Date objects
        const newTask = {
          ...data.data,
          createdAt: new Date(data.data.createdAt),
          updatedAt: new Date(data.data.updatedAt)
        }
        
        // Add new task to the beginning of the list
        setTasks(prevTasks => [newTask, ...prevTasks])
      } else {
        setError(data.error || 'Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
      setError('Failed to create task')
    } finally {
      setIsCreating(false)
    }
  }

  // Delete a task
  const handleDeleteTask = async (taskId: number) => {
    try {
      setDeletingTaskId(taskId)
      setError(null)
      
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Remove task from the list
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
      } else {
        setError(data.error || 'Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      setError('Failed to delete task')
    } finally {
      setDeletingTaskId(null)
    }
  }

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  // Retry function for error states
  const handleRetry = () => {
    fetchTasks()
  }

  return (
    <div className="space-y-8">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-800 font-medium">Error: {error}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleRetry}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Retry
              </button>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Creation Form */}
      <TaskForm 
        onSubmit={handleCreateTask} 
        isLoading={isCreating}
      />

      {/* Tasks List */}
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        isLoading={isLoading}
        deletingTaskId={deletingTaskId}
      />
    </div>
  )
}