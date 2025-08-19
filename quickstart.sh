#!/bin/bash

# 🚀 Todo App QuickStart Script
# This script sets up and runs the todo application automatically

set -e  # Exit on any error

echo "🚀 Starting Todo App QuickStart..."
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
print_step "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

print_success "Node.js $(node --version) is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_success "npm $(npm --version) is installed"

# Install dependencies
print_step "Installing dependencies..."
npm install
print_success "Dependencies installed successfully"

# Generate Prisma client
print_step "Generating Prisma client..."
npm run db:generate
print_success "Prisma client generated"

# Set up database
print_step "Setting up SQLite database..."
npm run db:push
print_success "Database setup complete"

# Check if port 3000 is available
print_step "Checking if port 3000 is available..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Port 3000 is already in use. The app will try to use the next available port."
fi

print_success "Setup complete! 🎉"
echo ""
echo "=================================="
echo -e "${GREEN}🎉 Todo App is ready to launch!${NC}"
echo "=================================="
echo ""

# Start the development server
print_step "Starting development server..."
echo -e "${YELLOW}The app will open in your browser automatically...${NC}"
echo -e "${YELLOW}If it doesn't open, visit: http://localhost:3000${NC}"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop the server${NC}"
echo ""

# Function to open browser (cross-platform)
open_browser() {
    local url="http://localhost:3000"
    
    # Wait a moment for the server to start
    sleep 3
    
    # Detect OS and open browser accordingly
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$url"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open "$url"
        elif command -v gnome-open &> /dev/null; then
            gnome-open "$url"
        fi
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Windows (Git Bash/Cygwin)
        start "$url"
    fi
}

# Open browser in background
open_browser &

# Start the development server (this will block)
npm run dev