// TypeScript interfaces for Task-related operations

// Main Task interface matching our Prisma model
export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

// Interface for creating a new task (excludes auto-generated fields)
export interface CreateTaskRequest {
  title: string
  description?: string
}

// Interface for updating a task (all fields optional except id)
export interface UpdateTaskRequest {
  id: number
  title?: string
  description?: string
  completed?: boolean
}

// API response types
export interface TaskResponse {
  success: boolean
  data?: Task
  error?: string
}

export interface TasksResponse {
  success: boolean
  data?: Task[]
  error?: string
}

// Form state interface for task form component
export interface TaskFormData {
  title: string
  description: string
}