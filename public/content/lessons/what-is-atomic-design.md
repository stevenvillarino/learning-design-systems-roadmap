# What is Atomic Design?

Atomic Design is a methodology for creating design systems by breaking interfaces down into their fundamental building blocks, then assembling them into increasingly complex structures.

Created by **Brad Frost** in 2013, this approach borrows from chemistry to describe how user interfaces can be built systematically.

## The Five Stages

### 🔬 Stage 1: Atoms

**The smallest building blocks** that can't be broken down further without losing meaning.

**Examples:**
- Labels
- Inputs
- Buttons
- Icons
- Colors
- Typography

```html
<!-- An atom: A basic button -->
<button class="btn">Click me</button>
```

Think of atoms as the **design tokens** and basic HTML elements that form the foundation.

### ⚛️ Stage 2: Molecules

**Simple groups of atoms** that function together as a unit.

**Examples:**
- Search form (input + button)
- Avatar with label (image + text)
- Form field (label + input + error message)

```html
<!-- A molecule: Search form -->
<form class="search-form">
  <label for="search">Search</label>
  <input type="search" id="search" />
  <button type="submit">Go</button>
</form>
```

Molecules are relatively simple but have a single purpose.

### 🧬 Stage 3: Organisms

**Complex, reusable components** made up of molecules and atoms.

**Examples:**
- Navigation header (logo + menu + search + user avatar)
- Product card (image + title + price + button)
- Comment thread (multiple molecules arranged)

```html
<!-- An organism: Header -->
<header class="site-header">
  <img src="logo.svg" alt="Logo" />
  <nav><!-- Navigation molecules --></nav>
  <form><!-- Search molecule --></form>
  <div><!-- User avatar molecule --></div>
</header>
```

Organisms form distinct sections of an interface.

### 📄 Stage 4: Templates

**Page-level objects** that place organisms into a layout, showing content structure (not real content).

Templates define:
- Layout and grid structure
- Content hierarchy
- Spacing relationships

```
┌─────────────────────────────┐
│ [Header Organism]           │
├─────────────────────────────┤
│ [Hero Organism]             │
├─────────────────────────────┤
│ [Content Grid]              │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │Card│ │Card│ │Card│      │
│  └────┘ └────┘ └────┘      │
└─────────────────────────────┘
```

Templates use placeholder content to show structure.

### 🎨 Stage 5: Pages

**Specific instances of templates** with real content.

Pages show:
- How the design works with actual data
- Edge cases (long titles, no images, etc.)
- Variations in content

**Example:** Your template becomes:
- Homepage with this week's featured products
- Category page with 47 items
- Empty state when no results found

## Why This Matters for Design Systems

### 1. Shared Language

Teams can say "we need a new organism" instead of "that section thing with the cards and stuff."

### 2. Systematic Thinking

Breaking down interfaces this way helps you:
- Identify reusable patterns
- Avoid recreating similar components
- Build consistently from the bottom up

### 3. Better Organization

Your component library naturally organizes into:

```
/atoms
  Button.tsx
  Input.tsx
  Label.tsx

/molecules
  SearchForm.tsx
  FormField.tsx

/organisms
  Header.tsx
  ProductCard.tsx

/templates
  HomePage.tsx
  ProductPage.tsx
```

## Practical Application

### Start Small

1. **Audit existing designs** - What patterns repeat?
2. **Identify atoms** - Buttons, inputs, colors, typography
3. **Group into molecules** - Common combinations
4. **Build organisms** - Major UI sections
5. **Create templates** - Page layouts
6. **Test with real content** - Build pages

### Don't Be Dogmatic

Atomic Design is a **mental model**, not strict rules:

- ✅ Use it to think systematically
- ✅ Adapt the terminology to your team
- ❌ Don't obsess over "is this a molecule or organism?"
- ❌ Don't force everything into these categories

## Common Questions

### Q: Should components always follow this hierarchy?

**A:** No. Atoms can sometimes be used directly in templates. The hierarchy is a guide, not a law.

### Q: How does this relate to React/Vue/etc components?

**A:** Most modern component libraries naturally follow this pattern:

```jsx
// Atom
<Button>Click</Button>

// Molecule
<SearchForm>
  <Input />
  <Button>Search</Button>
</SearchForm>

// Organism
<Header>
  <Logo />
  <Navigation />
  <SearchForm />
  <UserMenu />
</Header>
```

### Q: What about design tokens?

**A:** Design tokens (colors, spacing, typography) are the **subatomic particles** that define your atoms.

## Key Takeaways

- Atomic Design provides a methodology for thinking about design systems
- Five stages: Atoms → Molecules → Organisms → Templates → Pages
- Helps teams build systematically and speak the same language
- Use it as a mental model, not strict rules
- Works naturally with modern component-based frameworks

## Further Reading

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/) - Free online book
- [Pattern Lab](https://patternlab.io/) - Tool built around Atomic Design principles

---

**Next Steps:** Learn about [design tokens](/roadmap/terminology/token) or explore how to [start building a design system](/roadmap/making-a-design-system/from-scratch).
