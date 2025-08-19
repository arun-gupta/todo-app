import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE /api/tasks/[id] - Delete a specific task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Parse the task ID from the URL parameters
    const taskId = parseInt(params.id)
    
    // Validate that the ID is a valid number
    if (isNaN(taskId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid task ID'
        },
        { status: 400 }
      )
    }

    // Check if the task exists before attempting to delete
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!existingTask) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found'
        },
        { status: 404 }
      )
    }

    // Delete the task from the database
    await prisma.task.delete({
      where: { id: taskId }
    })

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete task'
      },
      { status: 500 }
    )
  }
}