'use client'

import { useState } from 'react'
import { TaskFormData } from '@/types/task'

interface TaskFormProps {
  onSubmit: (taskData: TaskFormData) => Promise<void>
  isLoading?: boolean
}

/**
 * TaskForm Component
 * 
 * A form component for creating new tasks with title and optional description.
 * Includes validation and loading states for better user experience.
 */
export default function TaskForm({ onSubmit, isLoading = false }: TaskFormProps) {
  // Form state management
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState<{ title?: string }>({})

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear errors when user starts typing
    if (errors.title && name === 'title') {
      setErrors({})
    }
  }

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: { title?: string } = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
      
      // Reset form after successful submission
      setFormData({
        title: '',
        description: ''
      })
      setErrors({})
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter task title..."
            className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Task Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter task description..."
            rows={3}
            className="input-field resize-none"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Task...
              </span>
            ) : (
              'Add Task'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}