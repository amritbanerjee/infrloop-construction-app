# Development Setup

## 🚀 Environment Setup

### Prerequisites
- **Node.js 18+**: JavaScript runtime
- **npm or yarn**: Package manager
- **Expo CLI**: `npm install -g @expo/cli`
- **iOS Simulator** (macOS): For iOS development
- **Android Studio**: For Android development and emulator
- **Git**: Version control system
- **VS Code**: Recommended IDE with extensions

### Required VS Code Extensions
- **Expo Tools**: Official Expo extension
- **React Native Tools**: Microsoft React Native extension
- **TypeScript**: Enhanced TypeScript support
- **Tamagui**: Syntax highlighting for Tamagui
- **Prettier**: Code formatting
- **ESLint**: Code linting

## 📱 Project Installation

### 1. Clone Repository
```bash
# Clone the repository
git clone <repository-url>
cd infrloop

# Switch to development branch
git checkout develop
```

### 2. Install Dependencies
```bash
# Install all project dependencies
npm install --legacy-peer-deps

# Note: --legacy-peer-deps is required for Tamagui with Expo SDK 54
# due to React Native version mismatches
```

### 3. Environment Configuration

Create environment files for different stages:

#### `.env.local` (Development)
```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_BASE_URL=https://your-project-ref.supabase.co/rest/v1

# Optional: Analytics
EXPO_PUBLIC_ANALYTICS_ID=your-analytics-id
```

#### `.env.staging` (Staging)
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-staging-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
EXPO_PUBLIC_APP_ENV=staging
```

#### `.env.production` (Production)
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-prod-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
EXPO_PUBLIC_APP_ENV=production
```

### 4. Supabase Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy project URL and anon key
4. Update environment variables

#### Database Schema Setup
```sql
-- Run the schema from docs/backend/database-schema.md
-- This will create all necessary tables and RLS policies
```

#### Storage Buckets
```sql
-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('documents', 'documents', false),
  ('photos', 'photos', false),
  ('avatars', 'avatars', true);

-- Set up storage policies (see database-schema.md)
```

## 📱 Development Workflow

### Starting Development Server
```bash
# Start Expo development server
npm start

# Or with cache cleared
npm run start:clear

# Start with specific platform
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

### Available Scripts
```bash
# Development
npm start                 # Start Expo dev server
npm run start:clear      # Start with cache cleared
npm run ios              # Open iOS simulator
npm run android          # Open Android emulator
npm run web              # Open web browser

# Building
npm run build            # Build for production
npm run build:ios        # Build iOS app
npm run build:android    # Build Android app

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # ESLint checking
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript checking
npm run format           # Prettier formatting
```

## 🔧 Configuration Files

### Core Configuration

#### `package.json`
- Dependencies and scripts
- Expo configuration reference
- Build and development scripts

#### `app.json` / `app.config.js`
- Expo app configuration
- Platform-specific settings
- Build configurations

#### `tsconfig.json`
- TypeScript configuration
- Path aliases
- Compiler options

#### `babel.config.js`
- Babel configuration
- Tamagui plugin setup
- React Native Reanimated plugin

#### `metro.config.js`
- Metro bundler configuration
- CSS support for web
- File extension handling

### Tamagui Configuration

#### `tamagui.config.ts`
- Design system configuration
- Custom theme definitions
- Component variants

#### `tamagui-web.css`
- Web-specific styles
- CSS variables for themes
- Cross-platform compatibility

### Development Tools

#### `.eslintrc.js`
- ESLint rules and configuration
- TypeScript and React Native specific rules
- Code quality enforcement

#### `.prettierrc`
- Code formatting rules
- Consistent code style
- Integration with VS Code

## 📱 Platform-Specific Setup

### iOS Development (macOS only)

#### Prerequisites
1. **Xcode**: Install from Mac App Store
2. **Xcode Command Line Tools**: `xcode-select --install`
3. **iOS Simulator**: Included with Xcode

#### iOS Simulator Setup
```bash
# List available simulators
xcrun simctl list devices

# Boot specific simulator
xcrun simctl boot "iPhone 15 Pro"

# Open simulator app
open -a Simulator
```

### Android Development

#### Prerequisites
1. **Android Studio**: Download from developer.android.com
2. **Android SDK**: Installed via Android Studio
3. **Java Development Kit (JDK)**: Version 11 or newer

#### Android Studio Setup
1. Install Android Studio
2. Open Android Studio and install SDK
3. Create Android Virtual Device (AVD)
4. Set environment variables:

```bash
# Add to ~/.zshrc or ~/.bashrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### Android Emulator
```bash
# List available AVDs
emulator -list-avds

# Start specific emulator
emulator @Pixel_7_API_34
```

### Web Development

#### Browser Support
- **Chrome**: Recommended for development
- **Safari**: iOS-specific testing
- **Firefox**: Cross-browser compatibility
- **Edge**: Windows-specific testing

#### Development Tools
- **React Developer Tools**: Browser extension
- **Redux DevTools**: State inspection (if using Redux)
- **Network tab**: API request monitoring

## 🔍 Debugging & Development Tools

### React Native Debugging

#### Flipper Integration
```bash
# Install Flipper (optional)
brew install --cask flipper

# Enable Flipper in development builds
npm install react-native-flipper
```

#### Chrome DevTools
1. Start development server: `npm start`
2. Press `j` to open Chrome DevTools
3. Enable "Pause on Caught Exceptions"
4. Use Console tab for logging

### Supabase Development

#### Local Supabase (Optional)
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize local development
supabase init
supabase start

# Generate TypeScript types
supabase gen types typescript --local > types/database.ts
```

#### Database Debugging
- **Supabase Studio**: Web interface for database
- **pgAdmin**: PostgreSQL administration tool
- **SQL Editor**: Direct database queries

## 📈 Performance Monitoring

### Expo Tools
- **Expo Dev Tools**: Built-in performance monitoring
- **Metro Performance**: Bundle size analysis
- **Memory Usage**: React Native memory profiler

### Analytics Integration
```bash
# Install analytics (optional)
npm install @expo/analytics

# Usage in app
import { Analytics } from '@expo/analytics';
Analytics.track('screen_view', { screen: 'Dashboard' });
```

## 🚫 Troubleshooting

### Common Issues

#### Metro Runtime Error
```bash
# Install missing metro runtime
npm install @expo/metro-runtime --legacy-peer-deps

# Clear cache and restart
npx expo start -c
```

#### Tamagui Peer Dependencies
```bash
# Always use --legacy-peer-deps flag
npm install --legacy-peer-deps

# Clear npm cache if needed
npm cache clean --force
```

#### iOS Simulator Issues
```bash
# Reset iOS Simulator
xcrun simctl erase all

# Restart Expo with cache clear
npx expo start -c
```

#### Android Emulator Issues
```bash
# Cold boot emulator
emulator @AVD_NAME -wipe-data

# Clear Metro cache
npx expo start --clear
```

### Getting Help
- **Expo Documentation**: docs.expo.dev
- **Supabase Documentation**: supabase.com/docs
- **Tamagui Documentation**: tamagui.dev
- **React Native Documentation**: reactnative.dev

---

*See [Project Architecture](./project-architecture.md) for detailed technical overview*