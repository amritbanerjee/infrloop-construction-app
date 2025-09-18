# Deployment Guide

## 🚀 Deployment Overview

Infrloop uses a modern deployment strategy with Expo Application Services (EAS) for mobile apps and Supabase for backend infrastructure.

## 📱 Mobile App Deployment (EAS)

### Prerequisites
- **EAS CLI**: `npm install -g eas-cli`
- **Expo Account**: Sign up at expo.dev
- **Apple Developer Account**: For iOS App Store
- **Google Play Console**: For Android Play Store

### Initial EAS Setup

```bash
# Login to Expo
eas login

# Initialize EAS in project
eas build:configure

# This creates eas.json configuration file
```

### EAS Configuration (`eas.json`)

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_APP_ENV": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_APP_ENV": "staging"
      }
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_APP_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "your-apple-team-id"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### Development Builds

```bash
# iOS development build
eas build --platform ios --profile development

# Android development build  
eas build --platform android --profile development

# Both platforms
eas build --platform all --profile development
```

### Preview/Staging Builds

```bash
# iOS preview build
eas build --platform ios --profile preview

# Android preview build
eas build --platform android --profile preview

# Install on device via QR code or direct download
```

### Production Builds

```bash
# iOS App Store build
eas build --platform ios --profile production

# Android Play Store build
eas build --platform android --profile production

# Build both platforms
eas build --platform all --profile production
```

### App Store Submission

#### iOS App Store
```bash
# Submit to Apple App Store
eas submit --platform ios

# Or manually submit via App Store Connect
# Download .ipa file from EAS and upload
```

#### Android Play Store
```bash
# Submit to Google Play Store
eas submit --platform android

# Or manually upload .aab file to Play Console
```

## 🔄 Over-the-Air (OTA) Updates

### EAS Update Setup

```bash
# Install EAS Update
npm install expo-updates

# Configure updates in app.json
```

### App Configuration for Updates

```json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/[your-project-id]"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
```

### Publishing Updates

```bash
# Publish update to production
eas update --branch production --message "Bug fixes and performance improvements"

# Publish to staging
eas update --branch staging --message "New features for testing"

# Publish with specific runtime version
eas update --branch production --runtime-version 1.0.0
```

## 🗄️ Backend Deployment (Supabase)

### Supabase Project Setup

#### Production Environment
1. **Create Production Project**:
   - Go to supabase.com/dashboard
   - Create new project
   - Choose region (closest to users)
   - Set strong database password

2. **Configure Environment Variables**:
   ```bash
   EXPO_PUBLIC_SUPABASE_URL=https://your-prod-ref.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
   ```

3. **Database Schema Deployment**:
   ```sql
   -- Run all SQL from docs/backend/database-schema.md
   -- Create tables, policies, indexes
   -- Set up Row Level Security
   ```

4. **Storage Configuration**:
   ```sql
   -- Create storage buckets
   INSERT INTO storage.buckets (id, name, public) VALUES
     ('documents', 'documents', false),
     ('photos', 'photos', false),
     ('avatars', 'avatars', true);
   ```

### Supabase CLI Deployment

```bash
# Install Supabase CLI
npm install -g supabase

# Link to remote project
supabase link --project-ref your-project-ref

# Push local changes to remote
supabase db push

# Deploy Edge Functions
supabase functions deploy function-name

# Generate types for production
supabase gen types typescript --project-id your-project-ref > types/database.ts
```

## 🌍 Environment Management

### Development Environment
- **Local Development**: Local Supabase or remote dev instance
- **Hot Reload**: Expo development server
- **Debug Mode**: React Native debugger enabled
- **Mock Data**: Test data for development

### Staging Environment
- **Staging Supabase**: Separate project for testing
- **Preview Builds**: Internal distribution via EAS
- **Integration Testing**: Full feature testing
- **Performance Testing**: Load testing with realistic data

### Production Environment
- **Production Supabase**: Optimized for performance
- **App Store Distribution**: Public release
- **Monitoring**: Error tracking and analytics
- **Backup Strategy**: Automated backups

## 📈 Monitoring & Analytics

### Error Tracking

```bash
# Install Sentry for error tracking
npm install @sentry/react-native

# Configure in app.json
{
  "expo": {
    "plugins": [
      [
        "@sentry/react-native/expo",
        {
          "url": "https://sentry.io/",
          "project": "your-project",
          "organization": "your-org"
        }
      ]
    ]
  }
}
```

### Performance Monitoring

```bash
# Expo Application Services Analytics
# Automatically enabled with EAS builds

# Custom analytics
npm install @expo/analytics
```

## 📋 Release Process

### Version Management

1. **Update Version Numbers**:
   ```json
   // app.json
   {
     "expo": {
       "version": "1.0.0",
       "ios": {
         "buildNumber": "1"
       },
       "android": {
         "versionCode": 1
       }
     }
   }
   ```

2. **Create Release Tags**:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. **Update Changelog**:
   - Document new features
   - List bug fixes
   - Note breaking changes

### Release Checklist

- [ ] **Code Review**: All changes reviewed and approved
- [ ] **Testing**: All tests passing (unit, integration, E2E)
- [ ] **Performance**: App performance benchmarks met
- [ ] **Security**: Security audit completed
- [ ] **Documentation**: Documentation updated
- [ ] **Environment Variables**: Production variables configured
- [ ] **Database**: Migration scripts tested
- [ ] **Monitoring**: Error tracking and analytics configured
- [ ] **Backup**: Database backup completed
- [ ] **Rollback Plan**: Rollback procedure documented

---

*Troubleshooting guide in [Troubleshooting](./troubleshooting.md)*