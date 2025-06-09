# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Development**: `npm run dev` - Start development server at http://localhost:3000
- **Build**: `npm run build` - Build production application
- **Lint**: `npm run lint` - Run ESLint checks
- **Start**: `npm start` - Start production server

## Architecture Overview

This is an interactive design system roadmap platform built with Next.js 15, React 18, TypeScript, and Tailwind CSS. The application provides a visual learning path with session-based progress tracking.

### Core Architecture Patterns

**Data Flow**: The app uses a module/lesson structure defined in `src/types/roadmap.ts` with hierarchical content organization:
- Modules contain multiple lessons
- Lessons can have sub-lessons for nested structures
- Progress is tracked per lesson ID using localStorage

**Session Management**: Session-based progress tracking without authentication:
- `useProgress` hook manages completion state via localStorage
- Session data includes sessionId, timestamps, and completed nodes
- Progress persists across browser sessions

**Component Structure**:
- `src/components/roadmap_v2/` - Current roadmap components (ModuleSection, LessonCard, ProgressTracker)
- `src/components/lesson-old/` - Legacy lesson components
- `src/hooks/useProgress.ts` - Progress management logic

### Key Data Structures

```typescript
// Main data types in src/types/roadmap.ts
interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  description?: string;
  subLessons?: Lesson[];
}
```

### Routing Structure

- `/` - Home page with roadmap introduction
- `/roadmap` - Main roadmap visualization page
- `/roadmap/[moduleId]/[lessonId]` - Individual lesson content pages

### Progress Tracking Implementation

The `useProgress` hook provides:
- `toggleNodeCompletion(nodeId)` - Toggle lesson completion
- `isNodeCompleted(nodeId)` - Check completion status
- `resetProgress()` - Clear all progress with confirmation
- Session management with automatic timestamp updates

### Styling Approach

- Tailwind CSS with utility-first approach
- ShadCN UI components for consistent design
- Responsive design with mobile-first approach
- Component-level styling without global CSS dependencies

## Development Notes

- Use existing component patterns from `src/components/roadmap_v2/`
- Progress tracking relies on lesson IDs - maintain consistency when adding new lessons
- Session storage keys: `completedNodes`, `designSystemSession`
- The app is designed for deployment on Railway with GitHub integration

## Authentication

- Better Auth is integrated for user management
- Sign-in/sign-up pages available at `/auth/signin` and `/auth/signup`
- Currently configured with in-memory database (development only)
- Auth UI components in Header component with sign-in/sign-out functionality
- For production, update `src/lib/auth.ts` to use a persistent database

## Modern Design System

- Left sidebar navigation with collapsible modules and progress tracking
- Responsive design with mobile-first approach
- Modern card-based layouts with gradient accents
- Interactive progress indicators and completion states
- Sticky headers and smooth animations throughout