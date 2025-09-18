# Design Tokens

## 🎨 Color System

### Brand Colors
```typescript
const brandColors = {
  primary: '#1E40AF',     // Main brand blue
  primaryDark: '#1E3A8A', // Dark variant
  primaryLight: '#3B82F6' // Light variant
}
```

### Construction Palette
```typescript
const constructionColors = {
  safetyOrange: '#FB923C',    // Safety alerts
  constructionYellow: '#FCD34D', // Warnings
  steelGray: '#6B7280',       // Secondary text
  concreteGray: '#9CA3AF'     // Disabled states
}
```

### Semantic Colors
```typescript
const semanticColors = {
  success: '#10B981',  // Green for completed
  warning: '#F59E0B',  // Amber for warnings
  error: '#EF4444',    // Red for errors
  info: '#06B6D4'      // Cyan for info
}
```

## 📝 Typography

### Font Sizes
```typescript
const fontSizes = {
  xs: 12,   // Small labels
  sm: 14,   // Body text
  md: 16,   // Default text
  lg: 18,   // Subheadings
  xl: 20,   // Headings
  '2xl': 24, // Page titles
  '3xl': 32  // Display text
}
```

### Font Weights
```typescript
const fontWeights = {
  light: '300',
  normal: '400', 
  medium: '500',
  semibold: '600',
  bold: '700'
}
```

## 📏 Spacing

### Base Unit: 4px
```typescript
const spacing = {
  0: 0,
  1: 4,    // xs
  2: 8,    // sm  
  4: 16,   // md
  6: 24,   // lg
  8: 32,   // xl
  12: 48,  // 2xl
  16: 64   // 3xl
}
```

## 🔲 Border Radius
```typescript
const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999
}
```

## 🌊 Shadows
```typescript
const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.1)', 
  lg: '0 10px 15px rgba(0,0,0,0.1)',
  xl: '0 20px 25px rgba(0,0,0,0.1)'
}
```

---

*Implementation details in [Tamagui Setup](./tamagui-setup.md)*