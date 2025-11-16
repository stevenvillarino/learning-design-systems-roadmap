/**
 * Content Generation Pipeline
 *
 * This script automates lesson content generation using:
 * 1. Exa - Find authoritative sources on topics
 * 2. Firecrawl - Extract clean markdown from sources
 * 3. Claude - Synthesize sources into educational content
 */

import Anthropic from '@anthropic-ai/sdk';
import Exa from 'exa-js';
import FirecrawlApp from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';

// Initialize APIs
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const exa: any = new Exa(process.env.EXA_API_KEY);

const firecrawl: any = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

interface LessonConfig {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  searchQuery: string; // Optimized query for finding sources
}

interface Source {
  title: string;
  url: string;
  content: string;
  author?: string;
  publishedDate?: string;
}

/**
 * Step 1: Find authoritative sources using Exa
 */
async function findSources(query: string, numResults: number = 5): Promise<any[]> {
  console.log(`🔍 Searching for sources: "${query}"`);

  const result: any = await exa.searchAndContents(query, {
    type: 'neural',
    useAutoprompt: true,
    numResults,
    text: { maxCharacters: 3000 },
    category: 'documentation',
  });

  console.log(`✅ Found ${result.results.length} sources`);
  return result.results;
}

/**
 * Step 2: Extract clean content using Firecrawl
 */
async function extractContent(url: string): Promise<string> {
  console.log(`📄 Extracting content from: ${url}`);

  try {
    const result: any = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
    });

    return result.markdown || '';
  } catch (error) {
    console.error(`❌ Failed to extract from ${url}:`, error);
    return '';
  }
}

/**
 * Step 3: Synthesize content using Claude
 */
async function synthesizeLesson(
  lessonConfig: LessonConfig,
  sources: Source[]
): Promise<string> {
  console.log(`🤖 Synthesizing lesson: "${lessonConfig.title}"`);

  const sourcesText = sources
    .map((s, i) => `
SOURCE ${i + 1}: ${s.title}
URL: ${s.url}
${s.author ? `Author: ${s.author}` : ''}
${s.publishedDate ? `Published: ${s.publishedDate}` : ''}

CONTENT:
${s.content.slice(0, 2000)}...
---
`)
    .join('\n');

  const prompt = `You are an expert technical educator creating a lesson for a design systems learning platform.

LESSON DETAILS:
- Title: ${lessonConfig.title}
- Description: ${lessonConfig.description}
- Difficulty: ${lessonConfig.difficulty}
- Estimated Time: ${lessonConfig.estimatedTime} minutes

I have gathered ${sources.length} authoritative sources on this topic. Your task is to synthesize them into a comprehensive, engaging lesson in markdown format.

SOURCES:
${sourcesText}

REQUIREMENTS:
1. Write a complete lesson (1500-2500 words) that teaches "${lessonConfig.title}"
2. Use clear section headers (##) to organize content
3. Include practical examples and code snippets where relevant
4. Add blockquotes for key insights from industry leaders
5. Create actionable takeaways and next steps
6. Write in an engaging, educational tone (not dry documentation)
7. Use the sources above but synthesize them - don't just copy
8. Include internal links to related lessons where appropriate (e.g., [design tokens](/roadmap/terminology/token))

STRUCTURE:
# ${lessonConfig.title}

[Opening paragraph that hooks the reader]

## [Main sections - 3-5 major topics]

## Key Takeaways

## Further Reading/Next Steps

OUTPUT:
Only return the markdown content. Do not include meta-commentary.`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return content.text;
  }

  throw new Error('Unexpected response format from Claude');
}

/**
 * Step 4: Update lesson metadata with sources
 */
function generateMetadata(sources: any[]) {
  return sources.map((source) => ({
    title: source.title,
    url: source.url,
    type: 'article' as const,
    author: source.author,
    publishedDate: source.publishedDate,
    accessedDate: new Date().toISOString().split('T')[0],
  }));
}

/**
 * Main pipeline: Generate lesson content
 */
export async function generateLessonContent(
  lessonConfig: LessonConfig
): Promise<{ markdown: string; sources: any[] }> {
  console.log(`\n🚀 Starting content generation for: ${lessonConfig.title}\n`);

  try {
    // Step 1: Find sources
    const exaResults = await findSources(lessonConfig.searchQuery);

    // Step 2: Extract content from top sources
    const sources: Source[] = [];
    for (const result of exaResults.slice(0, 5)) {
      const content = result.text || '';
      sources.push({
        title: result.title,
        url: result.url,
        content,
        author: result.author,
        publishedDate: result.publishedDate,
      });
    }

    // Step 3: Synthesize into lesson
    const markdown = await synthesizeLesson(lessonConfig, sources);

    // Step 4: Generate metadata
    const metadata = generateMetadata(exaResults.slice(0, 5));

    console.log(`✅ Successfully generated lesson content\n`);

    return { markdown, sources: metadata };
  } catch (error) {
    console.error(`❌ Error generating lesson:`, error);
    throw error;
  }
}

/**
 * Save lesson to file
 */
export async function saveLessonContent(
  lessonId: string,
  markdown: string
): Promise<void> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'content',
    'lessons',
    `${lessonId}.md`
  );

  await fs.writeFile(filePath, markdown, 'utf-8');
  console.log(`💾 Saved to: ${filePath}`);
}

// Example usage
if (require.main === module) {
  const exampleLesson: LessonConfig = {
    id: 'design-system-vs-component-library',
    title: 'Design System vs Component Library',
    description: 'Differentiate between a design system and a component library.',
    estimatedTime: 15,
    difficulty: 'beginner',
    searchQuery:
      'design system vs component library differences comprehensive guide',
  };

  generateLessonContent(exampleLesson)
    .then(async ({ markdown, sources }) => {
      await saveLessonContent(exampleLesson.id, markdown);
      console.log('\n📚 Generated sources:', JSON.stringify(sources, null, 2));
    })
    .catch(console.error);
}
