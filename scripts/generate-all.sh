#!/bin/bash

# Autonomous Content Generation Script
# This will generate content for ALL lessons without existing content
# and automatically update the roadmapData.ts file with contentPath

echo "🚀 Starting autonomous content generation..."
echo ""

# Step 1: Generate all lesson content
echo "📝 Step 1/3: Generating lesson content..."
npm run generate:batch

# Check if generation was successful
if [ $? -ne 0 ]; then
  echo "❌ Content generation failed. Please check the errors above."
  exit 1
fi

echo ""
echo "✅ Content generation complete!"
echo ""

# Step 2: List generated files
echo "📊 Step 2/3: Checking generated files..."
GENERATED_FILES=$(ls -1 public/content/lessons/*.md 2>/dev/null | wc -l)
echo "Found $GENERATED_FILES lesson files in public/content/lessons/"
echo ""

# Step 3: Run update script to add contentPath to roadmapData.ts
echo "🔧 Step 3/3: Updating roadmapData.ts with contentPath..."
npm run update:content-paths

echo ""
echo "═══════════════════════════════════════"
echo "✨ AUTONOMOUS GENERATION COMPLETE!"
echo "═══════════════════════════════════════"
echo ""
echo "📊 Summary:"
echo "  - Generated: $GENERATED_FILES lessons"
echo "  - Updated: roadmapData.ts with contentPath entries"
echo ""
echo "🔍 Next steps:"
echo "  1. Review generated content in public/content/lessons/"
echo "  2. Make any edits as needed"
echo "  3. Run: npm run dev"
echo "  4. Test lessons at: http://localhost:3000/roadmap"
echo "  5. Commit and push when satisfied"
echo ""
