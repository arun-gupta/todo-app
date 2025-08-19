# Todo App

A simple and clean todo list application built with Next.js, TypeScript, Tailwind CSS, and SQLite.

## Features

- ✅ **Add Tasks**: Create new tasks with title and optional description
- 📋 **View Tasks**: Display all tasks in a clean, organized list
- 🗑️ **Delete Tasks**: Remove tasks with confirmation dialog
- 💾 **Persistent Storage**: SQLite database for data persistence
- 🎨 **Clean UI**: Responsive design with Tailwind CSS
- ⚡ **Type Safety**: Full TypeScript coverage
- 🔄 **Real-time Updates**: Instant UI updates after operations
- 📱 **Mobile Friendly**: Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **API**: Next.js API Routes

## 🚀 QuickStart

### Option 1: Automated Setup (Recommended)
Run the automated script that does everything for you and opens the browser:

```bash
# Clone the repository
git clone https://github.com/arun-gupta/todo-app.git
cd todo-app

# Run the automated quickstart script
./quickstart.sh
```

The script will:
- ✅ Check Node.js and npm installation
- ✅ Install all dependencies
- ✅ Set up the database
- ✅ Start the development server
- ✅ Automatically open your browser to http://localhost:3000

### Option 2: Manual Setup
If you prefer to run commands manually:

```bash
# Clone the repository
git clone https://github.com/arun-gupta/todo-app.git
cd todo-app

# Install dependencies
npm install

# Set up the database
npm run db:generate
npm run db:push

# Start the development server
npm run dev
```

**That's it!** Open [http://localhost:3000](http://localhost:3000) in your browser and start managing your tasks! 🎉

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
todo-app/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tasks/         # API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── TaskForm.tsx       # Add task form
│   │   ├── TaskItem.tsx       # Individual task
│   │   └── TaskList.tsx       # Tasks list
│   ├── lib/
│   │   └── prisma.ts          # Prisma client
│   └── types/
│       └── task.ts            # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## API Endpoints

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `DELETE /api/tasks/[id]` - Delete a specific task

## Database Schema

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Features in Detail

### Task Management
- **Create**: Add new tasks with required title and optional description
- **Read**: View all tasks sorted by creation date (newest first)
- **Delete**: Remove tasks with confirmation dialog to prevent accidents

### User Experience
- **Loading States**: Visual feedback during API operations
- **Error Handling**: Comprehensive error messages and retry options
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Clean Interface**: Minimalist design focused on productivity

### Technical Features
- **Type Safety**: Full TypeScript coverage for better development experience
- **Database**: SQLite for simple, file-based persistence
- **API Design**: RESTful API endpoints with proper error handling
- **Component Architecture**: Modular, reusable React components

## Future Enhancements

The application is designed to be easily extensible. Potential improvements include:

- Task completion/status toggle
- Task editing functionality
- Categories and tags
- Search and filtering
- Due dates and priorities
- User authentication
- Task sharing
- Dark mode theme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.