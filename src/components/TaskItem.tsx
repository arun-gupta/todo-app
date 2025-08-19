'use client'

import { useState } from 'react'
import { Task } from '@/types/task'

interface TaskItemProps {
  task: Task
  onDelete: (taskId: number) => Promise<void>
  isDeleting?: boolean
}

/**
 * TaskItem Component
 * 
 * Displays an individual task with its details and a delete button.
 * Includes confirmation dialog for delete action and loading states.
 */
export default function TaskItem({ task, onDelete, isDeleting = false }: TaskItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Handle delete confirmation
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  // Handle confirmed delete action
  const handleConfirmDelete = async () => {
    try {
      await onDelete(task.id)
      setShowDeleteConfirm(false)
    } catch (error) {
      console.error('Error deleting task:', error)
      // Keep the confirmation dialog open on error
    }
  }

  // Handle cancel delete action
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="task-card">
      {/* Task Content */}
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          {/* Task Title */}
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {task.title}
          </h3>
          
          {/* Task Description */}
          {task.description && (
            <p className="text-gray-600 mt-1 text-sm leading-relaxed">
              {task.description}
            </p>
          )}
          
          {/* Task Metadata */}
          <div className="flex items-center mt-3 text-xs text-gray-500 space-x-4">
            <span>Created: {formatDate(task.createdAt)}</span>
            {task.updatedAt !== task.createdAt && (
              <span>Updated: {formatDate(task.updatedAt)}</span>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <div className="ml-4 flex-shrink-0">
          {!showDeleteConfirm ? (
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          ) : (
            /* Delete Confirmation */
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Delete?</span>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="btn-danger text-xs py-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  'Yes'
                )}
              </button>
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="btn-secondary text-xs py-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}