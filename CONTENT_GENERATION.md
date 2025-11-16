# Automated Content Generation

This platform includes an AI-powered content generation system that automatically creates high-quality lesson content using authoritative sources.

## How It Works

The content generation pipeline consists of three steps:

1. **Source Discovery (Exa)** - Finds authoritative, recent sources on the topic using neural search
2. **Content Extraction (Firecrawl)** - Extracts clean markdown from web sources
3. **Content Synthesis (Claude)** - Synthesizes multiple sources into comprehensive educational content

## Setup

### 1. Get API Keys

You'll need three API keys:

- **Anthropic API Key** - For Claude AI content synthesis
  - Sign up at: https://console.anthropic.com/
  - Pricing: ~$0.03 per lesson

- **Exa API Key** - For finding authoritative sources
  - Sign up at: https://exa.ai/
  - Free tier includes 1,000 searches/month

- **Firecrawl API Key** - For content extraction
  - Sign up at: https://firecrawl.dev/
  - Free tier includes 500 scrapes/month

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API keys
ANTHROPIC_API_KEY=sk-ant-...
EXA_API_KEY=...
FIRECRAWL_API_KEY=...
```

### 3. Install Dependencies

```bash
npm install
```

## Usage

### Option 1: Web Interface (Recommended)

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: http://localhost:3000/admin/content-generator

3. Click "Generate" next to any lesson or use batch generation

### Option 2: Command Line

Generate content for a single lesson:

```bash
npm run generate:content
```

Generate content for multiple lessons (batch):

```bash
# Generate next 5 lessons
npm run generate:batch -- --limit=5

# Generate next 10 lessons
npm run generate:batch -- --limit=10

# Generate all remaining lessons
npm run generate:batch
```

### Option 3: Programmatic

```typescript
import { generateLessonContent, saveLessonContent } from './scripts/generateContent';

const lesson = {
  id: 'design-tokens',
  title: 'Design Tokens',
  description: 'Understanding design tokens...',
  estimatedTime: 15,
  difficulty: 'intermediate',
  searchQuery: 'design tokens comprehensive guide best practices'
};

const { markdown, sources } = await generateLessonContent(lesson);
await saveLessonContent(lesson.id, markdown);
```

## Generated Content Structure

Each generated lesson includes:

- **Introduction** - Engaging hook that explains the topic
- **Main Content** - 3-5 major sections covering key concepts
- **Code Examples** - Practical examples with syntax highlighting
- **Key Takeaways** - Summary of important points
- **Next Steps** - Links to related lessons

Content is automatically:
- ✅ 1,500-2,500 words
- ✅ Properly formatted with markdown
- ✅ Includes code examples where relevant
- ✅ Cites authoritative sources
- ✅ Written in engaging, educational tone
- ✅ Includes internal cross-links

## Quality Assurance

### Automatic Source Attribution

Every generated lesson tracks its sources:

```typescript
{
  sources: [
    {
      title: "Design Tokens 101",
      url: "https://css-tricks.com/what-are-design-tokens/",
      type: "article",
      author: "Robin Rendle",
      publishedDate: "2019-03-15",
      accessedDate: "2024-11-16"
    },
    // ... more sources
  ]
}
```

### Content Review Workflow

1. **Generate** - AI creates initial content
2. **Review** - Check the generated content for accuracy
3. **Edit** - Make manual edits if needed
4. **Publish** - Content is automatically available once saved

### Manual Editing

Generated markdown files are stored in:
```
public/content/lessons/{lesson-id}.md
```

You can edit these files directly for:
- Fixing inaccuracies
- Adding more examples
- Updating outdated information
- Improving clarity

## Cost Estimation

Approximate costs per lesson:

- Exa API: $0.001 per search × 5 searches = $0.005
- Firecrawl API: $0.01 per scrape × 5 scrapes = $0.05
- Anthropic Claude: ~$0.03 per lesson
- **Total per lesson: ~$0.085**

Generating all 17 remaining lessons: **~$1.45 total**

## Rate Limits

To avoid rate limits:

- **Batch generation** waits 2 seconds between lessons
- **Exa**: 60 requests/minute (free tier)
- **Firecrawl**: 60 requests/minute (free tier)
- **Anthropic**: 50 requests/minute (tier 1)

## Troubleshooting

### "API key not configured"

Make sure your `.env` file exists and contains all three API keys.

### "Failed to find sources"

The topic might be too niche. Try:
1. Broadening the search query
2. Manually providing source URLs
3. Adjusting the `searchQuery` in the lesson config

### "Content extraction failed"

Some websites block scraping. The system will:
1. Try Firecrawl first
2. Fall back to Exa's extracted content
3. Use manual content if both fail

### "Generated content is off-topic"

This can happen if:
- Search query is too broad
- Sources are low quality

Solutions:
1. Refine the search query
2. Manually select better sources
3. Edit the generated content

## Best Practices

### 1. Review Generated Content

Always review AI-generated content for:
- Accuracy
- Completeness
- Tone
- Code examples work correctly

### 2. Curate Sources

The quality of generated content depends on source quality. For best results:
- Prefer official documentation
- Use industry-recognized authors
- Avoid outdated sources (>3 years old)

### 3. Iterative Improvement

Content generation is iterative:
1. Generate initial content
2. Review and identify gaps
3. Manually enhance
4. Update metadata

### 4. Version Control

All generated content is tracked in git:
```bash
git diff public/content/lessons/
```

This lets you:
- Review changes before committing
- Rollback if needed
- Track content evolution

## Advanced Configuration

### Custom Content Templates

Edit `scripts/generateContent.ts` to customize:
- Content structure
- Word count targets
- Tone and style
- Section headers

### Source Filtering

Configure Exa search parameters:

```typescript
const result = await exa.searchAndContents(query, {
  type: 'neural',          // or 'keyword'
  numResults: 5,           // number of sources
  category: 'documentation', // filter by category
  startPublishedDate: '2020-01-01', // only recent sources
});
```

### Content Validation

Add custom validation in `generateContent.ts`:

```typescript
function validateContent(markdown: string): boolean {
  // Check word count
  const wordCount = markdown.split(/\s+/).length;
  if (wordCount < 1500) return false;

  // Check has code examples
  if (!markdown.includes('```')) return false;

  // Check has headers
  if (!markdown.includes('##')) return false;

  return true;
}
```

## Security Notes

### API Key Protection

- ✅ API keys are in `.env` (git-ignored)
- ✅ Never commit API keys to git
- ✅ Use different keys for dev/production

### Content Validation

Generated content is:
- Not automatically published
- Saved as files for manual review
- Tracked in version control
- Requires manual metadata updates

### Rate Limiting

The system implements:
- 2-second delays between requests
- Retry logic with exponential backoff
- Graceful error handling

## Future Enhancements

Potential improvements:

1. **Content Versioning** - Track content revisions
2. **A/B Testing** - Test different content variations
3. **User Feedback** - Collect feedback on generated content
4. **Auto-Updates** - Regenerate outdated content automatically
5. **Multi-Language** - Generate content in multiple languages
6. **Custom Voices** - Different writing styles per topic

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review API documentation:
   - Exa: https://docs.exa.ai/
   - Firecrawl: https://docs.firecrawl.dev/
   - Anthropic: https://docs.anthropic.com/
3. Open an issue on GitHub
