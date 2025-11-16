import { NextRequest, NextResponse } from 'next/server';
import { generateLessonContent, saveLessonContent } from '../../../../scripts/generateContent';
import { designSystemRoadmap } from '@/data/roadmapData';

// Helper: Generate search query
function generateSearchQuery(title: string, description: string): string {
  return `${title} ${description} comprehensive guide tutorial best practices`;
}

export async function POST(request: NextRequest) {
  try {
    const { lessonId } = await request.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Lesson ID is required' },
        { status: 400 }
      );
    }

    // Find the lesson in roadmap data
    let lessonConfig: any = null;
    let moduleId = '';

    for (const module of designSystemRoadmap) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        lessonConfig = {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description || '',
          estimatedTime: lesson.estimatedTime || 15,
          difficulty: lesson.difficulty || 'beginner',
          searchQuery: generateSearchQuery(
            lesson.title,
            lesson.description || ''
          ),
        };
        moduleId = module.id;
        break;
      }
    }

    if (!lessonConfig) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Check for API keys
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    if (!process.env.EXA_API_KEY) {
      return NextResponse.json(
        { error: 'EXA_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Generate content
    const { markdown, sources } = await generateLessonContent(lessonConfig);

    // Save to file
    await saveLessonContent(lessonId, markdown);

    return NextResponse.json({
      success: true,
      markdown,
      sources,
      lessonId,
      moduleId,
    });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}
