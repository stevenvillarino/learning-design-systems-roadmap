import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Design System Roadmap</h1>
        <p className="text-xl text-gray-600">
          Learn how to create a design system with this interactive roadmap
        </p>
      </header>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Design System Journey</h2>
        <p className="mb-4">
          This interactive roadmap will guide you through the process of creating a design system from scratch.
          Each node in the roadmap represents a key concept or step in the design system creation process.
        </p>
        <p className="mb-6">
          Click on nodes to explore lessons, mark your progress, and build your knowledge step by step.
          Your progress will be saved automatically in your browser.
        </p>
        <div className="flex justify-center">
          <Link 
            href="/roadmap" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium"
          >
            Start Learning
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-3">Visual Learning</h3>
          <p>
            Understand the relationships between different aspects of design systems through an 
            interactive visual roadmap.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-3">Track Progress</h3>
          <p>
            Mark lessons as complete and track your progress through the roadmap. Your progress
            is saved automatically in your browser.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-3">Comprehensive Content</h3>
          <p>
            Learn about all aspects of design systems, from basic concepts to advanced implementation
            details and project management.
          </p>
        </div>
      </div>
    </div>
  );
}
