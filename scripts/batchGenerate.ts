/**
 * Batch Content Generation Script
 *
 * Generate content for all lessons that don't have content yet
 */

import 'dotenv/config';
import { generateLessonContent, saveLessonContent } from './generateContent';
import { designSystemRoadmap } from '../src/data/roadmapData';
import fs from 'fs/promises';
import path from 'path';

interface LessonConfig {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  searchQuery: string;
  moduleId: string;
}

// Check if lesson already has content
async function hasContent(lessonId: string): Promise<boolean> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'content',
    'lessons',
    `${lessonId}.md`
  );

  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Generate search queries for each lesson
function generateSearchQuery(title: string, description: string): string {
  // Optimize query for Exa's neural search
  return `${title} ${description} comprehensive guide tutorial best practices`;
}

// Get all lessons that need content
async function getLessonsNeedingContent(): Promise<LessonConfig[]> {
  const lessons: LessonConfig[] = [];

  for (const module of designSystemRoadmap) {
    for (const lesson of module.lessons) {
      const hasExistingContent = await hasContent(lesson.id);

      if (!hasExistingContent && lesson.description) {
        lessons.push({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          estimatedTime: lesson.estimatedTime || 15,
          difficulty: lesson.difficulty || 'beginner',
          searchQuery: generateSearchQuery(lesson.title, lesson.description),
          moduleId: module.id,
        });
      }
    }
  }

  return lessons;
}

// Main batch generation function
async function batchGenerateContent(options: {
  limit?: number;
  skipExisting?: boolean;
}) {
  console.log('🚀 Starting batch content generation...\n');

  const lessonsToGenerate = await getLessonsNeedingContent();

  console.log(`📊 Found ${lessonsToGenerate.length} lessons without content\n`);

  if (lessonsToGenerate.length === 0) {
    console.log('✅ All lessons already have content!');
    return;
  }

  const limit = options.limit || lessonsToGenerate.length;
  const toLessons = lessonsToGenerate.slice(0, limit);

  console.log(`📝 Generating content for ${toLessons.length} lessons...\n`);

  const results: { success: string[]; failed: string[] } = {
    success: [],
    failed: [],
  };

  for (let i = 0; i < toLessons.length; i++) {
    const lesson = toLessons[i];

    console.log(
      `\n[${ + 1}/${toLessons.length}] Processing: ${lesson.title}`
    );
    console.log(`Module: ${lesson.moduleId}`);
    console.log(`Difficulty: ${lesson.difficulty}`);
    console.log(`Search query: "${lesson.searchQuery}"\n`);

    try {
      const { markdown, sources } = await generateLessonContent(lesson);

      await saveLessonContent(lesson.id, markdown);

      // Log generated sources for manual review
      console.log('\n📚 Sources used:');
      sources.forEach((s, idx) => {
        console.log(`  ${idx + 1}. ${s.title}`);
        console.log(`     ${s.url}`);
      });

      results.success.push(lesson.id);

      // Rate limiting: wait 2 seconds between API calls
      if (i < toLessons.length - 1) {
        console.log('\n⏳ Waiting 2s before next generation...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`\n❌ Failed to generate ${lesson.id}:`, error);
      results.failed.push(lesson.id);
    }
  }

  // Summary
  console.log('\n\n═══════════════════════════════════════');
  console.log('📊 BATCH GENERATION SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Successfully generated: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  if (results.success.length > 0) {
    console.log('\n✅ Successfully generated lessons:');
    results.success.forEach((id) => console.log(`  - ${id}`));
  }

  if (results.failed.length > 0) {
    console.log('\n❌ Failed lessons:');
    results.failed.forEach((id) => console.log(`  - ${id}`));
  }

  console.log('\n✨ Batch generation complete!');
}

// CLI interface
const args = process.argv.slice(2);
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;

if (require.main === module) {
  batchGenerateContent({ limit })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

export { batchGenerateContent, getLessonsNeedingContent };
