# Interactive Design System Roadmap - Architecture Design

## Overview
This document outlines the architecture for an interactive design system roadmap platform based on roadmap.sh/design-system. The platform will provide a visual learning path with lesson completion tracking and session-based progress for onboarding new design system team members.

## Core Requirements
- Visual roadmap similar to roadmap.sh/design-system
- Interactive lesson completion tracking
- Session-based progress tracking
- Modern UI using ShadCN/Tailwind
- Deployment via GitHub and Railway

## Data Structure

### Roadmap Node
```typescript
interface RoadmapNode {
  id: string;
  title: string;
  type: 'main' | 'sub' | 'leaf'; // Main nodes (yellow), sub-categories, leaf nodes
  description?: string;
  content?: string; // Lesson content in markdown
  parentId?: string; // For hierarchical structure
  position: {
    x: number;
    y: number;
  };
  connections: string[]; // IDs of connected nodes
}
```

### Progress Tracking
```typescript
interface UserProgress {
  sessionId: string;
  completedNodes: {
    [nodeId: string]: {
      completed: boolean;
      completedAt: string; // ISO date string
    }
  };
  lastVisited: string; // nodeId
}
```

### Session Management
```typescript
interface Session {
  id: string;
  createdAt: string; // ISO date string
  lastActive: string; // ISO date string
}
```

## Component Architecture

### Core Components
1. **RoadmapCanvas**: Main visualization component displaying the roadmap nodes and connections
2. **NodeComponent**: Individual node representation with status indicators
3. **ConnectionLine**: Visual representation of connections between nodes
4. **LessonView**: Content display for individual lessons
5. **ProgressTracker**: Component to manage and display progress
6. **SessionManager**: Handles session creation and persistence

### Page Structure
1. **Home Page**: Introduction and roadmap overview
2. **Roadmap View**: Interactive visualization of the design system roadmap
3. **Lesson Page**: Individual lesson content with completion tracking
4. **Progress Dashboard**: Overview of completed lessons and progress

## User Flow

1. **Initial Visit**:
   - User arrives at the platform
   - System creates a new session
   - User is presented with the roadmap overview

2. **Lesson Navigation**:
   - User clicks on a node in the roadmap
   - System displays the lesson content
   - User reads/interacts with the lesson

3. **Progress Tracking**:
   - User marks lesson as complete
   - System updates progress in session storage
   - Roadmap visually reflects completed lessons

4. **Return Visit**:
   - System checks for existing session
   - If found, restores previous progress
   - User continues from last position

## Technical Implementation

### Session-Based Storage
- Use browser localStorage for session persistence
- Structure:
  ```
  localStorage.setItem('designSystemSession', JSON.stringify({
    sessionId: 'unique-id',
    createdAt: '2025-05-20T00:00:00Z',
    progress: {
      // progress data
    }
  }));
  ```

### Visual Representation
- Use SVG for roadmap visualization
- React components for interactive elements
- ShadCN UI components for consistent styling

### Responsive Design
- Mobile-first approach
- Adaptive layout for different screen sizes
- Touch-friendly interactions for mobile devices

## Integration Points

### Content Management
- Markdown files for lesson content
- JSON structure for roadmap node relationships
- Static assets for images and diagrams

### Progress Persistence
- LocalStorage for session-based progress
- Optional: API endpoints for server-side persistence (future enhancement)

## Technical Constraints
- Browser compatibility: Modern browsers only (Chrome, Firefox, Safari, Edge)
- No authentication required for MVP (session-based only)
- Static deployment via Railway

## Future Enhancements
- User accounts and persistent progress
- Content management system
- Analytics for tracking user engagement
- Additional interactive elements (quizzes, exercises)
