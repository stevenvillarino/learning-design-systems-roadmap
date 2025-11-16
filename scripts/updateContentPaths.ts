/**
 * Update roadmapData.ts with contentPath for all generated lessons
 *
 * This script automatically adds contentPath to lessons that have
 * generated markdown files but are missing the contentPath field.
 */

import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { designSystemRoadmap } from '../src/data/roadmapData';

async function updateContentPaths() {
  console.log('🔍 Scanning for generated lesson files...\n');

  const contentDir = path.join(process.cwd(), 'public', 'content', 'lessons');
  const dataFilePath = path.join(process.cwd(), 'src', 'data', 'roadmapData.ts');

  // Get all markdown files in content directory
  let files: string[] = [];
  try {
    files = await fs.readdir(contentDir);
    files = files.filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
  } catch (error) {
    console.error('❌ Could not read content directory:', error);
    return;
  }

  console.log(`Found ${files.length} generated lesson files:\n`);
  files.forEach(f => console.log(`  - ${f}.md`));
  console.log('');

  // Read current roadmapData.ts
  let dataFileContent = await fs.readFile(dataFilePath, 'utf-8');

  let updatedCount = 0;
  const updates: string[] = [];

  // For each markdown file, check if lesson needs contentPath
  for (const lessonId of files) {
    // Find the lesson in the data structure
    let lessonFound = false;
    let alreadyHasPath = false;

    for (const module of designSystemRoadmap) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        lessonFound = true;
        if (lesson.contentPath) {
          alreadyHasPath = true;
        }
        break;
      }
    }

    if (!lessonFound) {
      console.log(`⚠️  Lesson "${lessonId}" not found in roadmapData.ts`);
      continue;
    }

    if (alreadyHasPath) {
      console.log(`✓ Lesson "${lessonId}" already has contentPath`);
      continue;
    }

    // Add contentPath to this lesson
    // Find the lesson in the file and add contentPath field
    const lessonPattern = new RegExp(
      `(\\{[^}]*id:\\s*'${lessonId}'[^}]*)(\\})`,
      'g'
    );

    const match = lessonPattern.exec(dataFileContent);
    if (match) {
      // Check if contentPath already exists in the text
      if (!match[0].includes('contentPath')) {
        const insertion = `,\n        contentPath: '${lessonId}'`;
        const replacement = match[1] + insertion + match[2];
        dataFileContent = dataFileContent.replace(match[0], replacement);

        updatedCount++;
        updates.push(lessonId);
        console.log(`✅ Added contentPath to "${lessonId}"`);
      } else {
        console.log(`✓ Lesson "${lessonId}" already has contentPath in file`);
      }
    } else {
      console.log(`⚠️  Could not find lesson "${lessonId}" in file structure`);
    }
  }

  if (updatedCount > 0) {
    // Write updated content back to file
    await fs.writeFile(dataFilePath, dataFileContent, 'utf-8');

    console.log('\n═══════════════════════════════════════');
    console.log(`✨ Updated ${updatedCount} lessons in roadmapData.ts`);
    console.log('═══════════════════════════════════════\n');

    console.log('Updated lessons:');
    updates.forEach(id => console.log(`  - ${id}`));

    console.log('\n✅ roadmapData.ts has been updated!');
    console.log('💾 File saved to:', dataFilePath);
  } else {
    console.log('\n✓ All lessons already have contentPath. No updates needed.');
  }
}

// Run the update
updateContentPaths()
  .then(() => {
    console.log('\n✨ Content path update complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error updating content paths:', error);
    process.exit(1);
  });
