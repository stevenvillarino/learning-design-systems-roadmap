import { RoadmapData } from '../types/roadmap';

export const designSystemRoadmap: RoadmapData = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    description: 'Core concepts and philosophy behind our Design System.',
    lessons: [
      {
        id: 'welcome',
        title: 'Welcome to the System',
        description: 'Why we have a design system and how it helps us ship faster.',
        content: `
# Welcome to our Design System

Welcome to our Design System learning path. This platform is built to help you understand not just **how** to use our components, but **why** we built them this way.

A Design System is more than just a component library; it's the shared language between our designers and engineers. It ensures that when a designer says *"primary button"*, a developer knows exactly what code to write, and a product manager knows exactly how it will behave.

## What you get "for free"
By using this system, you get:
- **Accessibility**: WCAG AA compliant out of the box.
- **Responsiveness**: Mobile-first layouts that work on any device.
- **Consistency**: Unified branding across all our products.

This allows you to focus on solving *unique user problems* rather than reinventing the wheel.
`
      },
      {
        id: 'core-principles',
        title: 'Core Principles',
        description: 'The guiding values that drive our design and code decisions.',
        content: `
# Our Core Principles

Every decision in our design system is guided by these core principles:

### 1. Accessibility First
We don't bolt on accessibility at the end. It is baked into every component, color, and interaction pattern from day one.

### 2. Flexibility with Guardrails
Our components are designed to be flexible enough for different contexts, but rigid enough to prevent brand inconsistency.

### 3. Developer Experience
We prioritize APIs that are intuitive, well-documented, and type-safe.

\`\`\`typescript
// Example of a type-safe component prop
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'; // Strict types
  size: 'sm' | 'md' | 'lg';
}
\`\`\`

### 4. Composability
We prefer small, focused components that can be composed together to build complex UIs, rather than massive "do-everything" components.
`
      },
      {
        id: 'what-is-a-component',
        title: 'What is a Component?',
        description: 'Defining the basic building block of our UI.',
        content: `
# What is a Component?

In our system, a **"Component"** is a reusable piece of UI that encapsulates structure, style, and behavior.

But it's more than just a React file or a Figma symbol. A true System Component includes:

- **Production-ready code** (React)
- **Design assets** (Figma)
- **Documentation** (Usage guidelines)
- **Tests** (Unit and Accessibility)

> **Core Concept:** When we say "don't build one-offs," we mean that if you find yourself copying standard UI elements and tweaking them slightly, you might be missing an opportunity to use (or improve) a standardized Component.
`
      }
    ]
  },
  {
    id: 'using-the-system',
    title: 'Using the System',
    description: 'Practical guides for Designers and Developers.',
    lessons: [
      {
        id: 'for-designers',
        title: 'For Designers',
        targetAudience: ['designer'],
        description: 'How to enable libraries and use components in Figma.',
        content: `
# Designer Workflow

As a designer, your primary touchpoint with the system is **Figma**.

### 1. Enable the Library
Open your "Assets" panel (Key: \`Shift + I\`) and toggle on the **Design System** library. This gives you instant access to all production components.

### 2. Using Components
- **Drag and drop** from the assets panel.
- Use the **Properties Panel** to switch variants (e.g., *Primary* vs. *Secondary*, *Small* vs. *Large*).

> **Warning:** Try to avoid detaching instances! Detaching breaks the link to the master component, meaning you won't get future updates.
`
      },
      {
        id: 'for-developers',
        title: 'For Developers',
        targetAudience: ['developer'],
        description: 'Installation, setup, and consuming components.',
        content: `
# Developer Workflow

Getting started is simple. We distribute our system as an npm package.

### Installation
\`\`\`bash
npm install @our-org/design-system
\`\`\`

### Setup
Wrap your application in our \`ThemeProvider\` to ensure tokens (colors, fonts) are available.

\`\`\`jsx
import { ThemeProvider } from '@our-org/design-system';

export default function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
\`\`\`

### Usage
Import components directly.

\`\`\`jsx
import { Button } from '@our-org/design-system';

<Button variant="primary">Click Me</Button>
\`\`\`

Always check the Props documentation before creating custom wrappers. We've likely exposed the prop you need.
`
      },
      {
        id: 'tokens-vs-values',
        title: 'Tokens vs. Hardcoded Values',
        description: 'Why we use variables for color, spacing, and typography.',
        content: `
# Understanding Design Tokens

You'll hear us talk a lot about **"Design Tokens"**.

A token is just a variable name for a design value.
- Instead of \`color: #0066CC\`, use \`color: tokens.color.primary.main\`
- Instead of \`margin: 16px\`, use \`margin: tokens.spacing.md\`

### Why use tokens?
1. **Theming**: We can change the value of \`primary.main\` in one place, and it updates everywhere (e.g., Dark Mode support).
2. **Consistency**: It prevents "magic numbers" and slight variations in colors or spacing across the app.
3. **Maintenance**: If our brand color changes next year, we change one line of code, not 5,000.
`
      }
    ]
  },
  {
    id: 'contributing',
    title: 'Contributing',
    description: 'How to give back to the system and propose changes.',
    lessons: [
      {
        id: 'contribution-model',
        title: 'How We Work',
        description: 'The lifecycle of a contribution.',
        content: `
# The Federated Model

We run on a **Federated model**. This means while there is a core team maintaining the infrastructure, *you* are encouraged to contribute.

### The Lifecycle
1. **Proposal**: You identify a need.
2. **Discussion**: We chat about it (Weekly Office Hours or Slack).
3. **Design/Build**: You (or we) build the draft.
4. **Review**: We check for accessibility and consistency.
5. **Release**: It becomes part of the shared library.

Don't be afraid to contribute! A system that doesn't evolve is a dead system.
`
      },
      {
        id: 'proposing-features',
        title: 'Proposing New Features',
        description: 'What to do when the system is missing something.',
        content: `
# Proposing New Features

Code is the easy part. The hard part is ensuring a new feature is actually needed by multiple teams.

### Before building:
1. **Check existing components**: Can a current component be extended precisely?
2. **Talk to us**: Drop a message in our channel. *"Hey, I need a DatePicker that selects ranges."*
3. **Draft a Spec**: What props will it need? What variants?

We love new components, but we want to make sure they are robust enough for everyone to use, not just specific to your one page.
`
      },
      {
        id: 'reporting-bugs',
        title: 'Reporting Bugs',
        description: 'See something weird? Say something.',
        content: `
# Reporting Bugs

If a component looks broken or behaves strangely:

1. **Confirm it's the component**: Isolate it. Does it happen on an empty page?
2. **Check the Docs**: Is it a known limitation?
3. **File an Issue**: Use our JIRA template. Include screenshots and, if possible, a code sandbox reproduction.

> **Please don't just override the CSS locally and move on!** That creates technical debt. Let's fix it at the source.
`
      }
    ]
  },
  {
    id: 'terminology',
    title: 'Terminology',
    description: 'Common terms we use every day.',
    lessons: [
      {
        id: 'accessibility',
        title: 'Accessibility (a11y)',
        content: `
# Accessibility (a11y)

The practice of making your website usable by as many people as possible, including those with disabilities (vision, motor, cognitive).

**Standard**: We adhere to **WCAG 2.1 AA** standards.
`
      },
      {
        id: 'governance',
        title: 'Governance',
        content: `
# Governance

The set of rules and processes that decide how the design system evolves. It prevents chaos while allowing growth. It defines **who** can make changes and **how** those changes are approved.
`
      },
      {
        id: 'pattern',
        title: 'Pattern',
        content: `
# Pattern

A reusable combination of components that solves a specific user problem.

**Example**: A "Login Form" is a pattern made of:
- \`Input\` (Component)
- \`Button\` (Component)
- \`Link\` (Component)
- Layout rules
`
      }
    ]
  }
];