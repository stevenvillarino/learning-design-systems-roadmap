# Setup & Development Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or later
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stevenvillarino/learning-design-systems-roadmap.git
   cd learning-design-systems-roadmap
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Visit: http://localhost:3000
   - Alternative: http://localhost:3001 (if port 3000 is busy)

## 🛠 Development Commands

### Essential Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Port Configuration
If port 3000 is occupied, use:
```bash
PORT=3001 npm run dev
# or
npx next dev --port 3001
```

## 🏗 Project Structure

```
learning-design-systems-roadmap/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── auth/              # Authentication pages
│   │   │   ├── signin/        # Sign-in page
│   │   │   └── signup/        # Sign-up page
│   │   ├── roadmap/           # Roadmap pages
│   │   │   ├── [moduleId]/    # Dynamic module routes
│   │   │   │   └── [lessonId]/ # Dynamic lesson routes
│   │   │   └── page.tsx       # Main roadmap page
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Better Auth API
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── layout/            # Layout components
│   │   │   ├── AppLayout.tsx  # Main layout wrapper
│   │   │   ├── Header.tsx     # Top navigation
│   │   │   └── Sidebar.tsx    # Left navigation panel
│   │   ├── providers/         # Context providers
│   │   └── roadmap_v2/        # Modern roadmap components
│   │       ├── LessonCard.tsx
│   │       ├── ModuleSection.tsx
│   │       ├── ProgressTracker.tsx
│   │       └── RoadmapPage.tsx
│   ├── data/                  # Static data
│   │   └── roadmapData.ts     # Roadmap content structure
│   ├── hooks/                 # Custom React hooks
│   │   └── useProgress.ts     # Progress tracking logic
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # Better Auth configuration
│   │   ├── auth-client.ts     # Auth client setup
│   │   └── utils.ts           # Utility functions
│   ├── styles/                # Global styles
│   │   └── globals.css        # Tailwind CSS imports
│   └── types/                 # TypeScript definitions
│       └── roadmap.ts         # Type definitions
├── public/                    # Static assets
├── docs/                      # Documentation
├── CLAUDE.md                  # Claude Code guidance
├── FEATURES.md                # Features documentation
├── SETUP.md                   # Setup guide (this file)
└── README.md                  # Project overview
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```bash
# Optional: Custom port
PORT=3000

# Optional: Custom hostname
HOSTNAME=localhost

# Database (for production Better Auth)
# DATABASE_URL=your_database_url_here
```

### Tailwind CSS
Configuration in `tailwind.config.js`:
- **Custom colors** for the design system
- **Typography** settings for consistent text
- **Responsive breakpoints** for mobile-first design
- **Animation** utilities for smooth interactions

### TypeScript
Configuration in `tsconfig.json`:
- **Strict mode** enabled for better type safety
- **Path mapping** with `@/` prefix for clean imports
- **Next.js optimizations** for performance
- **Component props** fully typed for better DX

## 🎨 Styling Guide

### Design Tokens
```css
/* Primary Colors */
--blue-50: #eff6ff
--blue-500: #3b82f6
--blue-600: #2563eb
--blue-700: #1d4ed8

/* Gradients */
--gradient-primary: linear-gradient(to right, #3b82f6, #6366f1)
--gradient-surface: linear-gradient(to right, #eff6ff, #eef2ff)

/* Spacing Scale */
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-4: 1rem       /* 16px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
```

### Component Patterns
```tsx
// Standard component structure
export interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({ props }) => {
  // Hooks and state
  
  return (
    <div className="standard-classes">
      {/* Component content */}
    </div>
  );
};
```

### Responsive Design
```tsx
// Mobile-first approach
className="
  flex flex-col           // Mobile: stack vertically
  lg:flex-row            // Large screens: horizontal layout
  gap-4                  // Consistent spacing
  p-4 lg:p-8            // Responsive padding
"
```

## 🔐 Authentication Setup

### Better Auth Configuration
Located in `src/lib/auth.ts`:

```typescript
// Development (current)
database: {
  type: "sqlite",
  url: ":memory:",
}

// Production (recommended)
database: {
  type: "postgres", // or mysql, sqlite file
  url: process.env.DATABASE_URL,
}
```

### Auth Pages
- **Sign In**: `/auth/signin`
- **Sign Up**: `/auth/signup`
- **API Routes**: `/api/auth/*` (handled by Better Auth)

### User Session Management
```tsx
import { authClient } from '@/lib/auth-client';

// In components
const { data: session, isPending } = authClient.useSession();

// Authentication actions
await authClient.signIn.email({ email, password });
await authClient.signUp.email({ email, name, password });
await authClient.signOut();
```

## 📱 Mobile Development

### Testing on Mobile
1. **Find your local IP**:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. **Start with network access**:
   ```bash
   npx next dev --hostname 0.0.0.0
   ```

3. **Access from mobile**:
   ```
   http://YOUR_LOCAL_IP:3000
   ```

### Mobile-Specific Features
- **Touch-friendly navigation** with proper tap targets
- **Swipe gestures** for lesson navigation (future)
- **Offline support** for downloaded content (future)
- **App-like experience** with PWA capabilities (future)

## 🧪 Testing

### Manual Testing Checklist
- [ ] **Homepage loads** with proper hero section
- [ ] **Sidebar navigation** opens and closes properly
- [ ] **Module expansion** works correctly
- [ ] **Lesson pages** load with proper content
- [ ] **Progress tracking** saves and restores
- [ ] **Authentication** sign-in/sign-up flows work
- [ ] **Responsive design** works on mobile
- [ ] **Navigation** between lessons functions
- [ ] **Completion status** updates correctly
- [ ] **Reset progress** works with confirmation

### Performance Testing
```bash
# Check bundle size
npm run build
npm run analyze  # if available

# Lighthouse audit
# Run in Chrome DevTools > Lighthouse
```

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect GitHub repository**
2. **Set environment variables** for production
3. **Configure build settings**:
   - Build command: `npm run build`
   - Output directory: `.next`
   - Install command: `npm install`

### Railway
1. **Connect GitHub repository**
2. **Set environment variables**
3. **Configure deployment**:
   - Build command: `npm run build`
   - Start command: `npm start`

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start

# Or export static files
npm run export  # if configured
```

## 🔍 Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Find process using port
lsof -ti:3000
# Kill process
kill -9 PID
# Or use different port
PORT=3001 npm run dev
```

**Module not found errors**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**:
```bash
# Check TypeScript configuration
npx tsc --noEmit
# Clear Next.js cache
rm -rf .next
```

**Authentication not working**:
- Check `src/lib/auth.ts` configuration
- Verify API routes are accessible
- Clear browser localStorage and cookies
- Check console for error messages

**Styles not loading**:
- Verify Tailwind CSS is properly configured
- Check `src/styles/globals.css` imports
- Clear browser cache
- Restart development server

### Getting Help
1. **Check documentation** in this repository
2. **Review console errors** in browser DevTools
3. **Check network tab** for failed requests
4. **Verify file paths** and imports
5. **Test in incognito mode** to rule out browser issues

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Dark Mode](https://tailwindcss.com/docs/dark-mode)

### Better Auth
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [React Integration](https://www.better-auth.com/docs/integrations/react)
- [Database Setup](https://www.better-auth.com/docs/concepts/database)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Next.js TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)