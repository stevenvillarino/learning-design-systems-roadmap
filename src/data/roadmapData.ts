import { RoadmapData } from '../types/roadmap';

export const designSystemRoadmap: RoadmapData = [
  {
    id: 'understand-basics',
    title: 'Understand the Basics',
    description: 'Grasp the fundamental concepts of Design Systems.',
    estimatedTime: 180,
    difficulty: 'beginner',
    metadata: {
      lastUpdated: '2024-11-01',
      lastReviewedDate: '2024-11-01',
      version: '2.0',
      curator: 'Design Systems Team',
      status: 'current',
      sources: [
        {
          title: 'Design Systems Handbook',
          url: 'https://www.designbetter.co/design-systems-handbook',
          type: 'book',
          organization: 'InVision',
        },
        {
          title: 'Building Design Systems',
          url: 'https://www.smashingmagazine.com/design-systems-book/',
          type: 'book',
          author: 'Alla Kholmatova',
        },
      ],
      updateFrequency: 'quarterly',
      nextReviewDate: '2025-02-01',
    },
    lessons: [
      {
        id: 'what-is-a-design-system',
        title: 'What is a Design System?',
        description: 'Learn the definition and purpose of a design system.',
        estimatedTime: 15,
        difficulty: 'beginner',
        metadata: {
          lastUpdated: '2024-11-01',
          lastReviewedDate: '2024-11-01',
          status: 'current',
          curator: 'Design Systems Team',
          sources: [
            {
              title: 'What is a Design System?',
              url: 'https://www.nngroup.com/articles/design-systems-101/',
              type: 'article',
              author: 'Therese Fessenden',
              organization: 'Nielsen Norman Group',
              publishedDate: '2021-03-14',
            },
            {
              title: 'A comprehensive guide to design systems',
              url: 'https://www.invisionapp.com/inside-design/guide-to-design-systems/',
              type: 'article',
              organization: 'InVision',
            },
          ],
          updateFrequency: 'annual',
        },
        resources: [
          {
            title: 'Design Systems 101',
            url: 'https://www.nngroup.com/articles/design-systems-101/',
            type: 'article',
            description: 'Comprehensive introduction from Nielsen Norman Group',
            difficulty: 'beginner',
          },
          {
            title: 'Design Systems Repo',
            url: 'https://designsystemsrepo.com/',
            type: 'tool',
            description: 'Collection of design system examples',
          },
        ],
      },
      {
        id: 'why-need-a-design-system',
        title: 'Why need a Design System',
        description: 'Understand the benefits and reasons for using a design system.',
        estimatedTime: 20,
        difficulty: 'beginner',
        metadata: {
          lastUpdated: '2024-10-15',
          lastReviewedDate: '2024-10-15',
          status: 'current',
          sources: [
            {
              title: 'The Value of Design Systems',
              url: 'https://alistapart.com/article/design-systems-ops/',
              type: 'article',
              author: 'Kaelig Deloumeau-Prigent',
              publishedDate: '2020-05-13',
            },
          ],
        },
      },
      {
        id: 'design-system-vs-component-library',
        title: 'Design System vs Component Library',
        description: 'Differentiate between a design system and a component library.',
        estimatedTime: 15,
        difficulty: 'beginner',
      },
      {
        id: 'what-is-atomic-design',
        title: 'What is Atomic Design',
        description: 'Explore the principles of Atomic Design methodology.',
        estimatedTime: 25,
        difficulty: 'intermediate',
        metadata: {
          lastUpdated: '2024-09-20',
          lastReviewedDate: '2024-09-20',
          status: 'current',
          sources: [
            {
              title: 'Atomic Design',
              url: 'https://atomicdesign.bradfrost.com/',
              type: 'book',
              author: 'Brad Frost',
              publishedDate: '2016-12-01',
            },
          ],
        },
        resources: [
          {
            title: 'Atomic Design by Brad Frost',
            url: 'https://atomicdesign.bradfrost.com/',
            type: 'documentation',
            description: 'Original methodology by Brad Frost - free online book',
            difficulty: 'beginner',
          },
        ],
      },
      {
        id: 'traits-of-a-good-design-system',
        title: 'Traits of a Good Design System',
        description: 'Identify the characteristics of an effective design system.',
        estimatedTime: 20,
        difficulty: 'intermediate',
      },
      {
        id: 'stakeholders-involved',
        title: 'Stakeholders Involved',
        description: 'Recognize the various roles and people involved in a design system.',
        estimatedTime: 15,
        difficulty: 'beginner',
      },
      {
        id: 'design-system-examples',
        title: 'Design System Examples',
        description: 'Look at real-world examples of successful design systems.',
        estimatedTime: 30,
        difficulty: 'beginner',
        metadata: {
          lastUpdated: '2024-11-01',
          lastReviewedDate: '2024-11-01',
          status: 'current',
          sources: [
            {
              title: 'Material Design',
              url: 'https://material.io/',
              type: 'documentation',
              organization: 'Google',
            },
            {
              title: 'Polaris',
              url: 'https://polaris.shopify.com/',
              type: 'documentation',
              organization: 'Shopify',
            },
            {
              title: 'Carbon Design System',
              url: 'https://carbondesignsystem.com/',
              type: 'documentation',
              organization: 'IBM',
            },
          ],
          updateFrequency: 'quarterly',
        },
        resources: [
          {
            title: 'Material Design',
            url: 'https://material.io/',
            type: 'example',
            description: "Google's comprehensive design system",
          },
          {
            title: 'Polaris',
            url: 'https://polaris.shopify.com/',
            type: 'example',
            description: "Shopify's design system for commerce",
          },
          {
            title: 'Carbon',
            url: 'https://carbondesignsystem.com/',
            type: 'example',
            description: "IBM's open-source design system",
          },
        ],
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