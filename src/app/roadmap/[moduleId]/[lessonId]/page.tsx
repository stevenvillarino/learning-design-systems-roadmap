import Link from 'next/link';
import { designSystemRoadmap } from '@/data/roadmapData';

interface LessonPageProps {
  params: Promise<{
    moduleId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { moduleId, lessonId } = await params;
  
  // Find the module and lesson
  const module = designSystemRoadmap.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!module || !lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Link href="/roadmap" className="text-blue-600 hover:text-blue-800">
            ← Back to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link href="/roadmap" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Roadmap
        </Link>
        <nav className="text-sm text-gray-600">
          <span>{module.title}</span> / <span className="font-medium">{lesson.title}</span>
        </nav>
      </div>

      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
          {lesson.description && (
            <p className="text-xl text-gray-600">{lesson.description}</p>
          )}
        </header>

        {/* Placeholder Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Lesson Content Coming Soon!</h2>
            <p className="text-gray-600 mb-6">
              This lesson is part of the <strong>{module.title}</strong> module. 
              Content will be added here soon.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold mb-2">What you'll learn:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Core concepts and principles</li>
                <li>• Practical examples and use cases</li>
                <li>• Best practices and guidelines</li>
                <li>• Interactive exercises</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation to other lessons */}
        <div className="mt-8 flex justify-between">
          <div>
            {/* Previous lesson logic could go here */}
          </div>
          <div>
            {/* Next lesson logic could go here */}
          </div>
        </div>
      </div>
    </div>
  );
} 