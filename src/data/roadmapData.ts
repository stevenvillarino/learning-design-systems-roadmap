import { RoadmapData } from '../types/roadmap';

export const designSystemRoadmap: RoadmapData = [
  {
    id: 'understand-basics',
    title: 'Understand the Basics',
    description: 'Grasp the fundamental concepts of Design Systems.',
    lessons: [
      {
        id: 'what-is-a-design-system',
        title: 'What is a Design System?',
        description: 'Learn the definition and purpose of a design system.',
      },
      {
        id: 'why-need-a-design-system',
        title: 'Why need a Design System',
        description: 'Understand the benefits and reasons for using a design system.',
      },
      {
        id: 'design-system-vs-component-library',
        title: 'Design System vs Component Library',
        description: 'Differentiate between a design system and a component library.',
      },
      {
        id: 'what-is-atomic-design',
        title: 'What is Atomic Design',
        description: 'Explore the principles of Atomic Design methodology.',
      },
      {
        id: 'traits-of-a-good-design-system',
        title: 'Traits of a Good Design System',
        description: 'Identify the characteristics of an effective design system.',
      },
      {
        id: 'stakeholders-involved',
        title: 'Stakeholders Involved',
        description: 'Recognize the various roles and people involved in a design system.',
      },
      {
        id: 'design-system-examples',
        title: 'Design System Examples',
        description: 'Look at real-world examples of successful design systems.',
      },
    ],
  },
  {
    id: 'making-a-design-system',
    title: 'Making a Design System',
    description: 'Learn the process of creating a design system.',
    lessons: [
      {
        id: 'from-scratch',
        title: 'From Scratch',
        description: 'Understand the steps to build a design system from the ground up.',
      },
      {
        id: 'from-existing-design',
        title: 'From Existing Design',
        description: 'Learn how to develop a design system based on an existing design.',
      },
      {
        id: 'stakeholders-involved-making', // Differentiated ID from the one in "Understand the Basics"
        title: 'Stakeholders Involved',
        description: 'Identify key stakeholders in the creation process.',
      },
    ],
  },
  {
    id: 'terminology',
    title: 'Terminology',
    description: 'Familiarize yourself with common design system terms.',
    lessons: [
      { id: 'component', title: 'Component' },
      { id: 'component-library', title: 'Component Library' },
      { id: 'design-language', title: 'Design Language' },
      { id: 'governance', title: 'Governance' },
      { id: 'guidelines', title: 'Guidelines' },
      { id: 'pattern', title: 'Pattern' },
      { id: 'pilot', title: 'Pilot' },
      { id: 'token', title: 'Token' },
      { id: 'ui-kit', title: 'UI Kit' },
    ],
  },
  // Add other main sections like "Existing Design Analysis", "Creating Design Language", etc.
  // Example for a nested structure (sub-lessons), if needed based on your content mapping:
  // {
  //   id: 'example-nested',
  //   title: 'Example with Nested Lessons',
  //   lessons: [
  //     {
  //       id: 'parent-lesson',
  //       title: 'Parent Lesson',
  //       subLessons: [
  //         { id: 'child-lesson-1', title: 'Child Lesson 1'},
  //         { id: 'child-lesson-2', title: 'Child Lesson 2'},
  //       ]
  //     }
  //   ]
  // }
]; 