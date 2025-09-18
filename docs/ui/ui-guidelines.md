# Infrloop UI Guidelines

## 🎨 Design Philosophy

Infrloop follows a **construction-focused design language** that emphasizes:

- **Clarity & Precision** - Clear information hierarchy like construction blueprints
- **Efficiency & Speed** - Quick access to critical project information
- **Reliability & Trust** - Consistent, dependable interface elements
- **Professional & Clean** - Industry-appropriate aesthetic

## 🏗️ Visual Identity

### Brand Colors

#### Primary Palette
```
Primary Blue:    #1E40AF  // Main brand color
Primary Dark:    #1E3A8A  // Dark variant
Primary Light:   #3B82F6  // Light variant
```

#### Construction Industry Colors
```
Safety Orange:   #FB923C  // Alerts, warnings, safety
Construction Yellow: #FCD34D  // Caution, pending items
Steel Gray:      #6B7280  // Secondary text, borders
Concrete Gray:   #9CA3AF  // Disabled states
```

#### Semantic Colors
```
Success Green:   #10B981  // Completed tasks, success states
Warning Amber:   #F59E0B  // Warnings, important notices
Error Red:       #EF4444  // Errors, critical alerts
Info Blue:       #06B6D4  // Information, help text
```

#### Neutral Palette
```
White:           #FFFFFF  // Background, cards
Light Gray:      #F9FAFB  // Section backgrounds
Medium Gray:     #E5E7EB  // Borders, dividers
Dark Gray:       #374151  // Primary text
Black:           #111827  // Headers, emphasis
```

### Typography

#### Font Stack
```
Primary: 'Inter' (System fallback: -apple-system, BlinkMacSystemFont)
Monospace: 'SF Mono' (System fallback: 'Courier New')
```

#### Type Scale
```
Display Large:   32px / 40px (2rem/2.5rem)    // Page titles
Display Medium:  28px / 36px (1.75rem/2.25rem) // Section headers
Heading 1:       24px / 32px (1.5rem/2rem)    // Card titles
Heading 2:       20px / 28px (1.25rem/1.75rem) // Subsections
Heading 3:       18px / 24px (1.125rem/1.5rem) // Component titles
Body Large:      16px / 24px (1rem/1.5rem)    // Primary text
Body Medium:     14px / 20px (0.875rem/1.25rem) // Secondary text
Body Small:      12px / 16px (0.75rem/1rem)   // Captions, labels
```

#### Font Weights
```
Light:    300  // Subtle text
Regular:  400  // Body text
Medium:   500  // Emphasized text
Semibold: 600  // Headings
Bold:     700  // Strong emphasis
```

### Spacing System

#### Base Unit: 4px

```
xs:   4px   (1 unit)   // Icon padding
sm:   8px   (2 units)  // Element spacing
md:   16px  (4 units)  // Component spacing
lg:   24px  (6 units)  // Section spacing
xl:   32px  (8 units)  // Page margins
2xl:  48px  (12 units) // Large gaps
3xl:  64px  (16 units) // Section breaks
```

### Border Radius

```
None:     0px     // Sharp edges
Small:    4px     // Buttons, inputs
Medium:   8px     // Cards, modals
Large:    12px    // Large cards
X-Large:  16px    // Panels
Full:     9999px  // Pills, avatars
```

### Shadows & Elevation

```
Level 1:  0 1px 2px rgba(0,0,0,0.05)     // Subtle elevation
Level 2:  0 1px 3px rgba(0,0,0,0.1)      // Cards
Level 3:  0 4px 6px rgba(0,0,0,0.1)      // Dropdowns
Level 4:  0 10px 15px rgba(0,0,0,0.1)    // Modals
Level 5:  0 20px 25px rgba(0,0,0,0.1)    // Full-screen overlays
```

## 📱 Component Principles

### Hierarchy & Structure

#### Information Hierarchy
1. **Primary Information** - Critical project data, current status
2. **Secondary Information** - Supporting details, metadata
3. **Tertiary Information** - Additional context, help text

#### Visual Hierarchy
- **Size** - Larger elements draw attention
- **Color** - Brand colors for primary actions
- **Contrast** - High contrast for important elements
- **Position** - Top-left for primary content (LTR)

### Interaction Patterns

#### Touch Targets
- **Minimum Size**: 44px x 44px (iOS HIG)
- **Comfortable Size**: 48px x 48px
- **Spacing**: Minimum 8px between targets

#### States
```
Default:   Normal appearance
Hover:     Subtle highlight (web)
Pressed:   Darker/pressed appearance
Focused:   Outline or border highlight
Disabled:  Reduced opacity (0.5)
Loading:   Spinner or skeleton
Error:     Error color with messaging
```

### Accessibility

#### Color Contrast
- **Text on background**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio
- **Interactive elements**: Minimum 3:1 ratio

#### Focus Management
- Clear focus indicators
- Logical tab order
- Screen reader support

## 🏗️ Construction-Specific Patterns

### Status Indicators

#### Project Status
```
Planning:     Blue circle with clock icon
In Progress:  Orange circle with gear icon
On Hold:      Yellow circle with pause icon
Completed:    Green circle with checkmark icon
Cancelled:    Red circle with X icon
```

#### Priority Levels
```
Critical:     Red flag icon
High:         Orange exclamation
Medium:       Yellow dash
Low:          Gray circle
```

#### Safety Indicators
```
Safe:         Green hard hat icon
Caution:      Yellow warning triangle
Danger:       Red alert diamond
```

### Industry Icons

#### Core Construction Icons
```
Project:      Blueprint/document icon
Task:         Checklist icon
Team:         Hard hat group icon
Timeline:     Calendar/gantt icon
Budget:       Calculator/dollar icon
Safety:       Shield/warning icon
Equipment:    Crane/tool icon
Materials:    Box/inventory icon
Reports:      Chart/graph icon
```

## 📐 Layout Principles

### Grid System

#### Mobile-First Approach
- **Mobile**: Single column, stacked layout
- **Tablet**: 2-3 columns, adaptive layout
- **Desktop**: Multi-column, dashboard layout

#### Container Sizing
```
Mobile:     100% width, 16px padding
Tablet:     Max 768px, 24px padding
Desktop:    Max 1200px, 32px padding
```

### Page Structure

#### Standard Layout
```
1. Header (64px height)
   - Logo/title
   - Navigation
   - User menu

2. Content Area
   - Page title
   - Action buttons
   - Main content
   - Pagination (if needed)

3. Footer (Optional)
   - Secondary links
   - App info
```

#### Card-Based Layout
- **Information Cards** - Project summaries, task lists
- **Action Cards** - Quick actions, shortcuts
- **Status Cards** - Progress indicators, metrics

## 🎯 Component Guidelines

### Buttons

#### Primary Buttons
- Use brand primary color
- For main actions (Save, Submit, Create)
- Maximum one per screen section

#### Secondary Buttons
- Use outline or ghost style
- For secondary actions (Cancel, Back)
- Multiple allowed per section

#### Button Sizing
```
Small:    32px height, 12px padding
Medium:   40px height, 16px padding
Large:    48px height, 20px padding
```

### Forms

#### Input Fields
- Clear labels above inputs
- Placeholder text for examples
- Error states with red color
- Success states with green color

#### Field Grouping
- Related fields in sections
- Clear section headers
- Appropriate spacing between groups

### Data Display

#### Tables
- Alternating row colors for readability
- Sortable columns where appropriate
- Pagination for large datasets
- Mobile-responsive stacking

#### Lists
- Clear item separation
- Consistent item height
- Action buttons aligned right
- Search/filter capabilities

## 🚀 Implementation Notes

### Tamagui Integration
- Use Tamagui tokens for consistent theming
- Leverage Tamagui's animation system
- Implement responsive design with Tamagui breakpoints

### Performance Considerations
- Optimize for 60fps animations
- Lazy load heavy components
- Use skeleton screens for loading states

### Platform Considerations
- iOS-specific navigation patterns
- Android Material Design elements
- Web-specific interactions (hover, focus)

---

**Next Steps:**
1. Review [Design Tokens](./design-tokens.md) for implementation details
2. Check [Component Library](./component-library.md) for specific components
3. Follow [Tamagui Setup](./tamagui-setup.md) for technical implementation