# Building a Design System from Scratch

Starting a design system from nothing can feel overwhelming. This lesson provides a practical, step-by-step approach to get you from zero to a functional design system.

## Before You Start

### Ask These Questions

1. **Why do we need this?**
   - Specific pain points to solve
   - Business goals to achieve

2. **Who's it for?**
   - Internal teams only?
   - External developers?
   - Both?

3. **What's the scope?**
   - Single product or multiple?
   - Web only or cross-platform?

4. **Who will maintain it?**
   - Dedicated team?
   - Part-time contributors?

### ⚠️ Don't Build a Design System If...

- Your product is still finding product-market fit
- You have fewer than 3 designers/developers
- You're building a one-off project
- You just want to follow trends

## Phase 1: Foundation (Weeks 1-2)

### Step 1: Audit Your Existing Designs

Document what you already have:

**Inventory Checklist:**
- [ ] All unique button styles
- [ ] Color palette (grab hex codes from everywhere)
- [ ] Typography usage (fonts, sizes, weights)
- [ ] Spacing patterns (common margins/padding)
- [ ] Common components (cards, forms, modals, etc.)

**Tool:** Take screenshots and organize in Figma/Miro

### Step 2: Define Design Tokens

Start with the basics:

```json
// colors.json
{
  "color": {
    "brand": {
      "primary": "#0066CC",
      "secondary": "#FF6B35"
    },
    "neutral": {
      "50": "#F9FAFB",
      "900": "#111827"
    }
  }
}

// spacing.json
{
  "space": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "6": "24px",
    "8": "32px"
  }
}
```

**Deliverable:** Token JSON files + generated CSS variables

### Step 3: Set Up Your Repository

```
design-system/
├── tokens/           # Design token definitions
├── components/       # Component library
├── docs/            # Documentation site
├── examples/        # Usage examples
└── package.json
```

**Tech Stack Example:**
- Tokens: Style Dictionary
- Components: React + TypeScript
- Docs: Storybook or custom Next.js site
- Testing: Jest + Testing Library

## Phase 2: Core Components (Weeks 3-6)

### Start with the "Big 5"

Build these first (they're in ~80% of UIs):

1. **Button**
   - Variants: primary, secondary, ghost, danger
   - Sizes: small, medium, large
   - States: default, hover, active, disabled

2. **Input**
   - Text, email, password, number types
   - States: default, focus, error, disabled
   - With label and error message

3. **Typography**
   - Heading levels (h1-h6)
   - Body text sizes
   - Code and monospace

4. **Card**
   - Container with padding
   - Optional header, body, footer
   - Variants: flat, elevated, outlined

5. **Modal/Dialog**
   - Overlay + centered content
   - Header, body, footer slots
   - Close functionality

### Component Template

```tsx
// Button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Documentation Per Component

For each component, document:

1. **When to use** - Appropriate use cases
2. **Props/API** - All available options
3. **Examples** - Visual examples with code
4. **Accessibility** - ARIA labels, keyboard nav
5. **Don't use when** - Anti-patterns

## Phase 3: Documentation (Weeks 7-8)

### Essential Documentation Pages

1. **Getting Started**
   - Installation instructions
   - Quick start guide
   - Basic examples

2. **Design Principles**
   - Your design philosophy
   - Core values (e.g., "accessible first", "mobile-friendly")

3. **Components**
   - Interactive examples
   - Props documentation
   - Code snippets

4. **Design Tokens**
   - Color palette
   - Spacing scale
   - Typography system

5. **Contribution Guide**
   - How to propose new components
   - Code standards
   - Review process

### Storybook Example

```tsx
// Button.stories.tsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => (
  <Button variant="primary">Primary Button</Button>
);

export const AllSizes = () => (
  <>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </>
);
```

## Phase 4: Adoption (Weeks 9-12)

### Pilot with One Team

Don't force adoption. Instead:

1. **Choose a pilot team** - Willing early adopters
2. **Pick a pilot project** - New feature, not refactor
3. **Work alongside them** - Pair programming sessions
4. **Gather feedback** - What's missing? What's confusing?
5. **Iterate quickly** - Fix pain points immediately

### Migration Strategy

For existing products:

```
┌─────────────────────────────────┐
│  DON'T: Big-bang rewrite        │
│  DO: Gradual component swap     │
└─────────────────────────────────┘

Week 1:  Replace all buttons
Week 2:  Replace all inputs
Week 3:  Replace all cards
...
```

### Track Adoption Metrics

- % of components using design system
- Time saved building new features
- Accessibility violations (should decrease)
- Team satisfaction scores

## Common Pitfalls to Avoid

### ❌ Building Everything Up Front

**Instead:** Start with 5 components, expand based on demand

### ❌ Designing in a Vacuum

**Instead:** Involve product teams from day 1

### ❌ No Governance Model

**Instead:** Define contribution process early:
- Who reviews component proposals?
- How are breaking changes handled?
- What's the release cadence?

### ❌ Forgetting Accessibility

**Instead:** Bake it in from the start:
- ARIA labels on all interactive elements
- Keyboard navigation
- Color contrast checks
- Screen reader testing

## Governance Models

### Option 1: Federated

- Multiple teams contribute
- Central team reviews and maintains
- Best for: Large orgs with many products

### Option 2: Centralized

- Dedicated design system team
- They own all components
- Best for: Smaller orgs or single product

### Option 3: Hybrid

- Core components: centralized
- Product-specific: federated
- Best for: Most organizations

## Measuring Success

### After 3 Months

- ✅ 5+ core components documented
- ✅ 1 product using the system
- ✅ Regular office hours or support channel

### After 6 Months

- ✅ 15+ components available
- ✅ 3+ products adopted
- ✅ Contribution process in place

### After 1 Year

- ✅ Majority of UI built with system components
- ✅ Measurable time/cost savings
- ✅ Active community of contributors

## Your First Week Checklist

- [ ] Get stakeholder buy-in
- [ ] Set up repository
- [ ] Define core design tokens
- [ ] Choose tech stack
- [ ] Build Button component
- [ ] Write documentation for Button
- [ ] Demo to one team
- [ ] Gather feedback

## Resources

- **Checklist:** [Design System Checklist](https://designsystemchecklist.com/)
- **Book:** [Building Design Systems by Alla Kholmatova](https://www.smashingmagazine.com/design-systems-book/)
- **Community:** [Design Systems Slack](https://design.systems/slack/)

## Key Takeaways

- Start small - don't try to build everything at once
- Audit existing designs before creating new components
- Focus on the "Big 5" components first
- Documentation is as important as the components
- Pilot with willing teams, don't force adoption
- Measure success through adoption and time savings
- Governance and contribution process are critical

---

**Next Steps:** Learn about [building from existing designs](/roadmap/making-a-design-system/from-existing-design) or explore [design tokens](/roadmap/terminology/token) in detail.
