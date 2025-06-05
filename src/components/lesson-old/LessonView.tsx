"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getNodeById, RoadmapNode } from '@/data/roadmap-old';

interface LessonViewProps {
  nodeId: string;
  onComplete: (nodeId: string) => void;
  isCompleted: boolean;
}

export default function LessonView({ nodeId, onComplete, isCompleted }: LessonViewProps) {
  const router = useRouter();
  const [node, setNode] = useState<RoadmapNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get node data
    const nodeData = getNodeById(nodeId);
    if (nodeData) {
      setNode(nodeData);
    }
    setLoading(false);
  }, [nodeId]);

  if (loading) {
    return <div className="p-8 text-center">Loading lesson content...</div>;
  }

  if (!node) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Lesson Not Found</h2>
        <p>The requested lesson could not be found.</p>
        <button
          onClick={() => router.push('/roadmap')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Back to Roadmap
        </button>
      </div>
    );
  }

  // Handle completion toggle
  const handleToggleComplete = () => {
    onComplete(nodeId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{node.title}</h1>
        <button
          onClick={() => router.push('/roadmap')}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Roadmap
        </button>
      </div>

      {node.description && (
        <div className="mb-6 text-gray-700">{node.description}</div>
      )}

      {/* Placeholder for actual lesson content */}
      <div className="prose max-w-none mb-8">
        <h2>About {node.title}</h2>
        <p>
          This is a placeholder for the actual lesson content about {node.title}.
          In a complete implementation, this would contain detailed information,
          examples, and possibly interactive elements related to this topic.
        </p>
        
        <h3>Key Concepts</h3>
        <ul>
          <li>Understanding the purpose and role of {node.title} in design systems</li>
          <li>Best practices for implementing {node.title}</li>
          <li>Common challenges and solutions</li>
        </ul>
        
        <h3>Examples</h3>
        <p>
          Here you would find practical examples of {node.title} in action,
          with code snippets, visual references, or interactive demonstrations.
        </p>
        
        <h3>Further Reading</h3>
        <ul>
          <li>Resource 1 about {node.title}</li>
          <li>Resource 2 about {node.title}</li>
          <li>Resource 3 about {node.title}</li>
        </ul>
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">
            {node.type === 'main' ? 'Main Topic' : node.type === 'sub' ? 'Sub Topic' : 'Lesson'}
          </span>
        </div>
        <button
          onClick={handleToggleComplete}
          className={`px-4 py-2 rounded-md ${
            isCompleted
              ? 'bg-green-100 text-green-800 border border-green-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
}
