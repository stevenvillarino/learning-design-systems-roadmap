# Design Tokens

Design tokens are the **source of truth** for design decisions in your system. They're named variables that store design values like colors, spacing, typography, and more.

## What Are Design Tokens?

Think of tokens as the **atomic values** that power your entire design system.

### Traditional approach:
```css
.button {
  background-color: #0066CC;
  padding: 12px 24px;
  font-size: 16px;
}
```

### With design tokens:
```css
.button {
  background-color: var(--color-primary-600);
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-md);
}
```

## Why Design Tokens?

### 1. Single Source of Truth

Change `--color-primary-600` once, update it everywhere:

```
Design Tool (Figma)
        ↓
   Token JSON
    ↙    ↓    ↘
  iOS   Web  Android
```

###2. Platform Agnostic

The same tokens can generate:

```json
// tokens.json
{
  "color": {
    "primary": {
      "600": { "value": "#0066CC" }
    }
  }
}
```

**Outputs to:**

```css
/* CSS */
--color-primary-600: #0066CC;
```

```swift
// Swift (iOS)
let colorPrimary600 = UIColor(hex: "0066CC")
```

```xml
<!-- Android -->
<color name="color_primary_600">#0066CC</color>
```

## Types of Design Tokens

### Color Tokens

```json
{
  "color": {
    "brand": {
      "primary": { "value": "#0066CC" },
      "secondary": { "value": "#FF6B35" }
    },
    "semantic": {
      "success": { "value": "#10B981" },
      "error": { "value": "#EF4444" },
      "warning": { "value": "#F59E0B" }
    },
    "neutral": {
      "50": { "value": "#F9FAFB" },
      "900": { "value": "#111827" }
    }
  }
}
```

### Spacing Tokens

```json
{
  "space": {
    "1": { "value": "4px" },
    "2": { "value": "8px" },
    "3": { "value": "12px" },
    "4": { "value": "16px" },
    "6": { "value": "24px" },
    "8": { "value": "32px" }
  }
}
```

### Typography Tokens

```json
{
  "font": {
    "family": {
      "sans": { "value": "Inter, system-ui, sans-serif" },
      "mono": { "value": "Fira Code, monospace" }
    },
    "size": {
      "xs": { "value": "12px" },
      "sm": { "value": "14px" },
      "md": { "value": "16px" },
      "lg": { "value": "18px" },
      "xl": { "value": "20px" }
    },
    "weight": {
      "normal": { "value": "400" },
      "medium": { "value": "500" },
      "bold": { "value": "700" }
    }
  }
}
```

### Other Common Tokens

- **Border radius** - `border-radius-sm`, `border-radius-full`
- **Shadows** - `shadow-sm`, `shadow-lg`
- **Transitions** - `transition-fast`, `transition-slow`
- **Z-index** - `z-dropdown`, `z-modal`, `z-tooltip`

## Token Naming Conventions

### Semantic vs. Literal

**❌ Avoid literal names:**
```
--blue-500
--padding-12px
```

**✅ Use semantic names:**
```
--color-primary
--space-3
```

Why? Because `--blue-500` doesn't tell you WHEN to use it.

### Tiered Naming

Most teams use a tiered approach:

```
--{category}-{variant}-{state}

--color-primary-base
--color-primary-hover
--color-primary-disabled

--button-background-default
--button-background-hover
```

## Tools for Design Tokens

### Style Dictionary

The most popular token transformation tool:

```javascript
// build-tokens.js
const StyleDictionary = require('style-dictionary');

StyleDictionary.buildPlatform({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    }
  }
});
```

### Figma Tokens Plugin

Sync tokens between Figma and code:

1. Define tokens in Figma
2. Export to JSON
3. Transform with Style Dictionary
4. Import into your codebase

## Implementing Tokens

### Step 1: Audit Your Design

Identify repeated values:
- What colors are used?
- What spacing values repeat?
- What font sizes exist?

### Step 2: Create Token Structure

```
tokens/
  color/
    brand.json
    semantic.json
    neutral.json
  spacing.json
  typography.json
  border.json
```

### Step 3: Transform and Distribute

Use Style Dictionary to generate platform-specific files:

```
tokens/ (source)
  ↓
build/ (generated)
  ├── css/variables.css
  ├── scss/_variables.scss
  ├── js/tokens.js
  └── ios/Colors.swift
```

### Step 4: Use in Components

```jsx
// Before
<button style={{
  backgroundColor: '#0066CC',
  padding: '12px 24px'
}}>

// After
<button style={{
  backgroundColor: 'var(--color-primary-600)',
  padding: 'var(--space-3) var(--space-6)'
}}>
```

## Best Practices

### 1. Start Small

Don't tokenize everything at once:
1. Colors first
2. Then spacing
3. Then typography
4. Expand as needed

### 2. Document Token Usage

```json
{
  "color": {
    "primary": {
      "value": "#0066CC",
      "description": "Use for primary actions and links",
      "type": "color"
    }
  }
}
```

### 3. Version Your Tokens

Treat tokens like an API:
- Semantic versioning (1.0.0, 1.1.0, 2.0.0)
- Changelog for breaking changes
- Deprecation warnings

### 4. Test Token Changes

Before releasing token updates:
- Visual regression tests
- Accessibility contrast checks
- Cross-platform verification

## Common Challenges

### Challenge: "Too many tokens to maintain"

**Solution:** Start with tier 1 tokens (color, spacing, typography). Add more only when needed.

### Challenge: "Designers and developers out of sync"

**Solution:** Use Figma Tokens plugin or similar tools to sync automatically.

### Challenge: "How granular should tokens be?"

**Solution:** Balance reusability with specificity. Avoid `--button-primary-background-hover-active-disabled`.

## Real-World Example: Shopify Polaris

Polaris uses tokens for:
- 100+ color tokens
- 12 spacing tokens
- 40+ typography tokens

Result: Consistent experience across web, iOS, Android, and React Native.

## Key Takeaways

- Design tokens are named variables that store design decisions
- They enable consistency across platforms and products
- Use semantic naming for clarity (not literal values)
- Tools like Style Dictionary help transform tokens for different platforms
- Start small and expand based on actual needs
- Tokens are the foundation of a scalable design system

## Tools to Explore

- **[Style Dictionary](https://amzn.github.io/style-dictionary/)** - Token transformation
- **[Theo](https://github.com/salesforce-ux/theo)** - Salesforce's token tool
- **[Figma Tokens](https://www.figmatokens.com/)** - Figma integration

---

**Next Steps:** Learn about [components](/roadmap/terminology/component) or explore [how to build a design system from scratch](/roadmap/making-a-design-system/from-scratch).
