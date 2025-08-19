import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateTaskRequest } from '@/types/task'

// GET /api/tasks - Fetch all tasks
export async function GET() {
  try {
    // Fetch all tasks from database, ordered by creation date (newest first)
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: tasks
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tasks'
      },
      { status: 500 }
    )
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: CreateTaskRequest = await request.json()
    
    // Validate required fields
    if (!body.title || body.title.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Task title is required'
        },
        { status: 400 }
      )
    }

    // Create new task in database
    const newTask = await prisma.task.create({
      data: {
        title: body.title.trim(),
        description: body.description?.trim() || null
      }
    })

    return NextResponse.json({
      success: true,
      data: newTask
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create task'
      },
      { status: 500 }
    )
  }
}