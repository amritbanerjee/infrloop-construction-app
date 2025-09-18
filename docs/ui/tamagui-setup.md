# Tamagui Setup & Configuration

## 🚀 Getting Started

You can either:
1. **Use Tamagui Template** (Recommended for new projects)
2. **Manual Installation** (For existing Expo projects like ours)

### Option 1: Tamagui Template (New Projects)
```bash
# Create new project with Tamagui template
yarn create tamagui@latest --template expo-router
```

### Option 2: Manual Installation (Our Approach)
Since we have an existing Expo project, we'll use the manual installation:

### Step 1: Install Tamagui

```bash
# Install core Tamagui packages (v4 configuration)
npm install @tamagui/config/v4 tamagui

# Install Tamagui Babel plugin for optimization
npm install @tamagui/babel-plugin

# Install fonts
npx expo install expo-font

# Optional: Install additional packages
npm install @tamagui/lucide-icons @tamagui/linear-gradient
```

### Step 2: Configure Babel

Update your `babel.config.js` to include the Tamagui plugin:

```javascript
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      // NOTE: only necessary if using reanimated for animations
      'react-native-reanimated/plugin',
    ],
  }
}
```

### Step 3: Configure Metro (metro.config.js)

```javascript
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})

// Expo 49 issue: default metro config needs to include "mjs"
// https://github.com/expo/expo/issues/23180
config.resolver.sourceExts.push('mjs')

module.exports = config
```

## ⚙️ Configuration

### Step 1: Create Tamagui Configuration (tamagui.config.ts)

```typescript
import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'

// Construction industry color tokens
const constructionTokens = {
  color: {
    // Primary brand colors
    primaryBlue: '#1E40AF',
    primaryBlueDark: '#1E3A8A',
    primaryBlueLight: '#3B82F6',
    
    // Construction industry colors
    safetyOrange: '#FB923C',
    constructionYellow: '#FCD34D',
    steelGray: '#6B7280',
    concreteGray: '#9CA3AF',
    
    // Semantic colors
    successGreen: '#10B981',
    warningAmber: '#F59E0B',
    errorRed: '#EF4444',
    infoBlue: '#06B6D4',
    
    // Neutral palette
    white: '#FFFFFF',
    lightGray: '#F9FAFB',
    mediumGray: '#E5E7EB',
    darkGray: '#374151',
    black: '#111827',
  },
  space: {
    // 4px base unit system
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  size: {
    // Component sizes
    xs: 32,
    sm: 40,
    md: 48,
    lg: 56,
    xl: 64,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
}

// Create configuration extending the default v4 config
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    ...constructionTokens,
  },
  themes: {
    ...defaultConfig.themes,
    // Add custom construction theme
    construction: {
      background: constructionTokens.color.lightGray,
      backgroundHover: constructionTokens.color.mediumGray,
      backgroundPress: constructionTokens.color.darkGray,
      backgroundFocus: constructionTokens.color.primaryBlueLight,
      color: constructionTokens.color.darkGray,
      colorHover: constructionTokens.color.black,
      colorPress: constructionTokens.color.primaryBlue,
      colorFocus: constructionTokens.color.primaryBlueDark,
      borderColor: constructionTokens.color.mediumGray,
      borderColorHover: constructionTokens.color.steelGray,
      borderColorPress: constructionTokens.color.primaryBlue,
      borderColorFocus: constructionTokens.color.primaryBlueDark,
    }
  }
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
```

### Step 2: Setup Provider (app/_layout.tsx)

```typescript
import '../tamagui-web.css'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import 'react-native-reanimated'

import { tamaguiConfig } from '../tamagui.config'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  )
}
```

### Step 3: Font Loading (Optional)

If using custom fonts, load them in your root component:

```typescript
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <MyApp />
}
```

## 🎨 Design Tokens

### Creating Token Files (constants/design-tokens.ts)

```typescript
// Design tokens based on Infrloop UI Guidelines
export const designTokens = {
  colors: {
    // Primary brand colors
    brand: {
      primary: '#1E40AF',
      primaryDark: '#1E3A8A',
      primaryLight: '#3B82F6',
    },
    
    // Construction industry palette
    industry: {
      safetyOrange: '#FB923C',
      constructionYellow: '#FCD34D',
      steelGray: '#6B7280',
      concreteGray: '#9CA3AF',
    },
    
    // Semantic colors
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#06B6D4',
    },
    
    // Neutral palette
    neutral: {
      white: '#FFFFFF',
      lightGray: '#F9FAFB',
      mediumGray: '#E5E7EB',
      darkGray: '#374151',
      black: '#111827',
    }
  },
  
  typography: {
    fontFamily: {
      primary: 'Inter',
      mono: 'SF Mono',
    },
    
    fontSize: {
      displayLarge: 32,
      displayMedium: 28,
      heading1: 24,
      heading2: 20,
      heading3: 18,
      bodyLarge: 16,
      bodyMedium: 14,
      bodySmall: 12,
    },
    
    lineHeight: {
      displayLarge: 40,
      displayMedium: 36,
      heading1: 32,
      heading2: 28,
      heading3: 24,
      bodyLarge: 24,
      bodyMedium: 20,
      bodySmall: 16,
    },
    
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    level1: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    level2: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    level3: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    }
  }
} as const

export type DesignTokens = typeof designTokens
```

## 📱 Component Implementation

### Basic Tamagui Components

#### Button Component (components/ui/button.tsx)

```typescript
import { Button as TamaguiButton, ButtonProps } from '@tamagui/core'
import { forwardRef } from 'react'

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<typeof TamaguiButton, CustomButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    const getVariantProps = () => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: '$primaryBlue',
            color: '$white',
            hoverStyle: { backgroundColor: '$primaryBlueDark' },
            pressStyle: { backgroundColor: '$primaryBlueDark' },
          }
        case 'secondary':
          return {
            backgroundColor: '$steelGray',
            color: '$white',
            hoverStyle: { backgroundColor: '$darkGray' },
            pressStyle: { backgroundColor: '$darkGray' },
          }
        case 'outline':
          return {
            backgroundColor: 'transparent',
            borderColor: '$primaryBlue',
            borderWidth: 1,
            color: '$primaryBlue',
            hoverStyle: { backgroundColor: '$primaryBlueLight', opacity: 0.1 },
            pressStyle: { backgroundColor: '$primaryBlueLight', opacity: 0.1 },
          }
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: '$primaryBlue',
            hoverStyle: { backgroundColor: '$lightGray' },
            pressStyle: { backgroundColor: '$mediumGray' },
          }
        case 'danger':
          return {
            backgroundColor: '$errorRed',
            color: '$white',
            hoverStyle: { backgroundColor: '#DC2626' },
            pressStyle: { backgroundColor: '#DC2626' },
          }
        default:
          return {}
      }
    }

    const getSizeProps = () => {
      switch (size) {
        case 'sm':
          return { height: 32, paddingHorizontal: 12, fontSize: 14 }
        case 'md':
          return { height: 40, paddingHorizontal: 16, fontSize: 16 }
        case 'lg':
          return { height: 48, paddingHorizontal: 20, fontSize: 18 }
        default:
          return {}
      }
    }

    return (
      <TamaguiButton
        ref={ref}
        borderRadius="$md"
        fontWeight="500"
        {...getSizeProps()}
        {...getVariantProps()}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
```

#### Card Component (components/ui/card.tsx)

```typescript
import { Card as TamaguiCard, CardProps, YStack } from '@tamagui/core'
import { forwardRef, ReactNode } from 'react'

interface CustomCardProps extends CardProps {
  children: ReactNode
  elevated?: boolean
}

export const Card = forwardRef<typeof TamaguiCard, CustomCardProps>(
  ({ children, elevated = false, ...props }, ref) => {
    return (
      <TamaguiCard
        ref={ref}
        backgroundColor="$white"
        borderRadius="$md"
        borderColor="$mediumGray"
        borderWidth={1}
        padding="$md"
        {...(elevated && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        })}
        {...props}
      >
        <YStack space="$sm">
          {children}
        </YStack>
      </TamaguiCard>
    )
  }
)

Card.displayName = 'Card'
```

## 🔧 Development Setup

### TypeScript Configuration

Add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    // ... existing options
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./components/*"],
      "@/constants/*": ["./constants/*"],
      "@/hooks/*": ["./hooks/*"]
    }
  }
}
```

### ESLint Configuration

Add to `eslint.config.js`:

```javascript
module.exports = {
  // ... existing config
  rules: {
    // Tamagui specific rules
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
  }
}
```

## 🧪 Testing Setup

### Component Testing

```typescript
// __tests__/components/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native'
import { TamaguiProvider } from '@tamagui/core'
import { Button } from '@/components/ui/button'
import config from '../tamagui.config'

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <TamaguiProvider config={config}>
      {component}
    </TamaguiProvider>
  )
}

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = renderWithProvider(
      <Button>Test Button</Button>
    )
    expect(getByText('Test Button')).toBeTruthy()
  })

  it('handles press events', () => {
    const onPress = jest.fn()
    const { getByText } = renderWithProvider(
      <Button onPress={onPress}>Press Me</Button>
    )
    
    fireEvent.press(getByText('Press Me'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
```

## 🚀 Performance Optimization

### Tree Shaking

Configure babel for optimal bundle size:

```javascript
// babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        components: ['@tamagui/core'],
        config: './tamagui.config.ts',
        logTimings: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
```

### Animation Configuration

```typescript
// animations.config.ts
import { createAnimations } from '@tamagui/animations-react-native'

export const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
})
```

## 📚 Best Practices

### Theme Usage
- Always use design tokens instead of hardcoded values
- Leverage Tamagui's theme system for consistent styling
- Test components in both light and dark themes

### Performance
- Use `@tamagui/babel-plugin` for optimal tree shaking
- Implement proper component memoization for complex components
- Utilize Tamagui's built-in animation optimizations

### Accessibility
- Ensure proper color contrast ratios
- Add accessibility labels and hints
- Test with screen readers

---

**Next Steps:**
1. Follow [Component Library](./component-library.md) for creating custom components
2. Review [Design Tokens](./design-tokens.md) for detailed token usage
3. Check [Screen Specifications](./screen-specifications.md) for implementing screens