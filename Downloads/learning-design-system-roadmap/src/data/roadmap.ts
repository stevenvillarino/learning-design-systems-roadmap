// This file contains the data structure for the design system roadmap
// Based on the structure from roadmap.sh/design-system

export interface RoadmapNode {
  id: string;
  title: string;
  type: 'main' | 'sub' | 'leaf';
  description?: string;
  parentId?: string;
  position: {
    x: number;
    y: number;
  };
  connections: string[]; // IDs of connected nodes
}

// Main categories from the roadmap
export const roadmapNodes: RoadmapNode[] = [
  // Main nodes
  {
    id: 'understand-basics',
    title: 'Understand the Basics',
    type: 'main',
    description: 'Learn the fundamental concepts of design systems',
    position: { x: 400, y: 100 },
    connections: ['making-design-system', 'terminology']
  },
  {
    id: 'making-design-system',
    title: 'Making a Design System',
    type: 'main',
    description: 'Learn how to create a design system from scratch or existing design',
    position: { x: 200, y: 300 },
    connections: ['identify-design-elements', 'identify-components', 'existing-design-analysis']
  },
  {
    id: 'terminology',
    title: 'Terminology',
    type: 'main',
    description: 'Understand the key terminology used in design systems',
    position: { x: 600, y: 300 },
    connections: ['component', 'component-library', 'design-language', 'governance', 'guidelines']
  },
  {
    id: 'existing-design-analysis',
    title: 'Existing Design Analysis',
    type: 'main',
    description: 'Analyze existing design to extract patterns and components',
    position: { x: 400, y: 500 },
    connections: ['existing-design-process', 'visual-audit', 'ab-tests', 'regional-requirements', 'documentation']
  },
  {
    id: 'creating-design-language',
    title: 'Creating Design Language',
    type: 'main',
    description: 'Establish a consistent design language for your system',
    position: { x: 600, y: 500 },
    connections: ['guidelines-accessibility', 'logo', 'brand']
  },
  {
    id: 'creating-core-components',
    title: 'Creating Core Components',
    type: 'main',
    description: 'Build the essential components for your design system',
    position: { x: 800, y: 300 },
    connections: ['avatar', 'button', 'card', 'input-text', 'modal']
  },
  {
    id: 'tooling',
    title: 'Tooling',
    type: 'main',
    description: 'Tools and processes for managing your design system',
    position: { x: 400, y: 700 },
    connections: ['design', 'development', 'communications', 'project-management']
  },
  
  // Sub-nodes for "Understand the Basics"
  {
    id: 'what-is-design-system',
    title: 'What is a Design System',
    type: 'sub',
    parentId: 'understand-basics',
    description: 'Definition and purpose of design systems',
    position: { x: 200, y: 150 },
    connections: []
  },
  {
    id: 'need-of-design-system',
    title: 'Need of Design System',
    type: 'sub',
    parentId: 'understand-basics',
    description: 'Why organizations need design systems',
    position: { x: 350, y: 150 },
    connections: []
  },
  {
    id: 'design-system-vs-component-library',
    title: 'Design System vs Component Library',
    type: 'sub',
    parentId: 'understand-basics',
    description: 'Understanding the differences between design systems and component libraries',
    position: { x: 500, y: 150 },
    connections: []
  },
  {
    id: 'what-is-atomic-design',
    title: 'What is Atomic Design',
    type: 'sub',
    parentId: 'understand-basics',
    description: 'Introduction to atomic design methodology',
    position: { x: 650, y: 150 },
    connections: []
  },
  
  // Sub-nodes for "Making a Design System"
  {
    id: 'from-scratch',
    title: 'From Scratch',
    type: 'sub',
    parentId: 'making-design-system',
    description: 'Creating a design system from the beginning',
    position: { x: 100, y: 350 },
    connections: []
  },
  {
    id: 'from-existing-design',
    title: 'From Existing Design',
    type: 'sub',
    parentId: 'making-design-system',
    description: 'Extracting a design system from existing products',
    position: { x: 250, y: 350 },
    connections: []
  },
  
  // Sub-nodes for "Identify Design Elements"
  {
    id: 'identify-design-elements',
    title: 'Identify Design Elements',
    type: 'sub',
    parentId: 'making-design-system',
    description: 'Identifying the core design elements in your system',
    position: { x: 100, y: 450 },
    connections: []
  },
  {
    id: 'color',
    title: 'Color',
    type: 'leaf',
    parentId: 'identify-design-elements',
    description: 'Color palette and usage guidelines',
    position: { x: 50, y: 500 },
    connections: []
  },
  {
    id: 'typography',
    title: 'Typography',
    type: 'leaf',
    parentId: 'identify-design-elements',
    description: 'Typography styles and hierarchy',
    position: { x: 100, y: 500 },
    connections: []
  },
  {
    id: 'spacing',
    title: 'Spacing',
    type: 'leaf',
    parentId: 'identify-design-elements',
    description: 'Spacing and layout guidelines',
    position: { x: 150, y: 500 },
    connections: []
  },
  {
    id: 'icons',
    title: 'Icons',
    type: 'leaf',
    parentId: 'identify-design-elements',
    description: 'Icon design and usage',
    position: { x: 200, y: 500 },
    connections: []
  },
  
  // Sub-nodes for "Identify Components"
  {
    id: 'identify-components',
    title: 'Identify Components',
    type: 'sub',
    parentId: 'making-design-system',
    description: 'Identifying the components needed in your design system',
    position: { x: 250, y: 450 },
    connections: []
  },
  {
    id: 'avatar',
    title: 'Avatar',
    type: 'leaf',
    parentId: 'identify-components',
    description: 'User avatar component',
    position: { x: 200, y: 550 },
    connections: []
  },
  {
    id: 'button',
    title: 'Button',
    type: 'leaf',
    parentId: 'identify-components',
    description: 'Button component and variants',
    position: { x: 250, y: 550 },
    connections: []
  },
  {
    id: 'card',
    title: 'Card',
    type: 'leaf',
    parentId: 'identify-components',
    description: 'Card component for displaying content',
    position: { x: 300, y: 550 },
    connections: []
  },
  
  // Add more nodes as needed to match the roadmap structure
];

// Export a function to get a node by ID
export function getNodeById(id: string): RoadmapNode | undefined {
  return roadmapNodes.find(node => node.id === id);
}

// Export a function to get child nodes
export function getChildNodes(parentId: string): RoadmapNode[] {
  return roadmapNodes.filter(node => node.parentId === parentId);
}

// Export a function to get connected nodes
export function getConnectedNodes(nodeId: string): RoadmapNode[] {
  const node = getNodeById(nodeId);
  if (!node) return [];
  
  return node.connections.map(id => getNodeById(id)).filter(Boolean) as RoadmapNode[];
}
