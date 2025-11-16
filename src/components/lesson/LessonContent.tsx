'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface LessonContentProps {
  contentPath: string;
}

export const LessonContent: React.FC<LessonContentProps> = ({ contentPath }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/content/lessons/${contentPath}.md`);

        if (!response.ok) {
          throw new Error('Content not found');
        }

        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        setError('Unable to load lesson content');
        console.error('Error loading lesson content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentPath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-gray-600">Loading lesson content...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📚 Coming Soon</h3>
        <p className="text-blue-800 mb-4">
          Detailed lesson content is currently being developed.
          This will include comprehensive explanations, examples, and practical exercises.
        </p>
        <p className="text-blue-700 text-sm">
          For now, you can mark this lesson as complete to track your progress
          and continue with the learning path.
        </p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-img:rounded-lg prose-img:shadow-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
