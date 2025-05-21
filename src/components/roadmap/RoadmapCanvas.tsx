"use client";

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { roadmapNodes, RoadmapNode } from '@/data/roadmap';

// Custom node component
const CustomNode = ({ data }: { data: any }) => {
  const nodeClasses = `roadmap-node roadmap-node-${data.type} ${
    data.completed ? 'roadmap-node-completed' : ''
  }`;

  return (
    <button
      className={nodeClasses + ' cursor-pointer w-full h-full flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400'}
      onClick={data.onClick}
      title={data.label}
      tabIndex={0}
      style={{ minWidth: 120, minHeight: 48 }}
    >
      <span className="font-semibold text-base mb-1 text-center whitespace-pre-line">{data.label}</span>
      {data.completed && (
        <span className="text-green-600 text-xs mt-1">✓ Completed</span>
      )}
    </button>
  );
};

// Node types
const nodeTypes = {
  custom: CustomNode,
};

// Convert our roadmap data to ReactFlow nodes and edges
const createFlowElements = (
  nodes: RoadmapNode[],
  onNodeClick: (nodeId: string) => void,
  completedNodes: Set<string>
) => {
  const flowNodes: Node[] = nodes.map((node) => ({
    id: node.id,
    position: node.position,
    data: {
      label: node.title,
      type: node.type,
      completed: completedNodes.has(node.id),
      onClick: () => onNodeClick(node.id),
    },
    type: 'custom',
    style: {
      width: node.type === 'main' ? 180 : 150,
      height: 'auto',
    },
  }));

  const flowEdges: Edge[] = [];
  
  // Create edges based on connections
  nodes.forEach((node) => {
    node.connections.forEach((targetId) => {
      flowEdges.push({
        id: `${node.id}-${targetId}`,
        source: node.id,
        target: targetId,
        type: 'smoothstep',
        animated: false,
        style: {
          stroke: node.type === 'main' ? '#3b82f6' : '#9ca3af',
          strokeWidth: node.type === 'main' ? 3 : 2,
        },
      });
    });
  });

  return { nodes: flowNodes, edges: flowEdges };
};

export default function RoadmapCanvas() {
  // Track completed nodes
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  
  // Handle node click
  const handleNodeClick = useCallback((nodeId: string) => {
    setCompletedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      
      // Save to localStorage
      localStorage.setItem('completedNodes', JSON.stringify([...newSet]));
      
      return newSet;
    });
  }, []);

  // Load completed nodes from localStorage on component mount
  React.useEffect(() => {
    const savedNodes = localStorage.getItem('completedNodes');
    if (savedNodes) {
      try {
        const parsed = JSON.parse(savedNodes);
        setCompletedNodes(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse saved nodes:', e);
      }
    }
  }, []);

  // Create flow elements
  const { nodes: initialNodes, edges: initialEdges } = createFlowElements(
    roadmapNodes,
    handleNodeClick,
    completedNodes
  );

  // Use ReactFlow hooks to manage nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when completedNodes changes
  React.useEffect(() => {
    const { nodes: updatedNodes } = createFlowElements(
      roadmapNodes,
      handleNodeClick,
      completedNodes
    );
    setNodes(updatedNodes);
  }, [completedNodes, handleNodeClick, setNodes]);

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (completedNodes.size / roadmapNodes.length) * 100
  );

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="ml-4 text-sm font-medium">
            {completionPercentage}% Complete
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {completedNodes.size} of {roadmapNodes.length} topics completed
        </div>
      </div>

      <div className="flex-grow border border-gray-200 rounded-lg" style={{ height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <Controls />
          <Background color="#f1f5f9" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
