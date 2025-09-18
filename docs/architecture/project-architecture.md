# Project Architecture

## 🏗️ Architecture Overview

Infrloop follows a **modular, feature-based architecture** designed for scalability and maintainability with multi-tenant SaaS capabilities.

## 📱 Technology Stack

### Frontend (React Native + Expo)
- **React Native**: Cross-platform mobile framework
- **Expo SDK 54**: Development toolchain and services
- **Expo Router**: File-based routing system
- **TypeScript**: Type-safe development
- **Tamagui**: UI component system with design tokens

### Backend (Supabase)
- **Supabase**: Backend-as-a-Service platform
- **PostgreSQL**: Scalable relational database
- **Row Level Security (RLS)**: Multi-tenant data isolation
- **Supabase Auth**: Authentication with social providers
- **Supabase Storage**: File and media storage
- **Supabase Realtime**: WebSocket connections for live updates
- **Edge Functions**: Serverless functions for business logic

## 📋 App Navigation Structure

Based on the PRD requirements, here's the file-based routing structure:

```
app/
├── _layout.tsx                 # Root layout with auth check
├── (auth)/                     # Authentication flow
│   ├── _layout.tsx
│   ├── login.tsx
│   ├── forgot-password.tsx
│   └── mfa-verification.tsx
├── (onboarding)/               # Onboarding flow
│   ├── _layout.tsx
│   ├── welcome.tsx
│   ├── account-setup.tsx
│   ├── organization.tsx
│   ├── role-selection.tsx
│   ├── feature-tour.tsx
│   └── complete.tsx
├── (app)/                      # Main authenticated app
│   ├── _layout.tsx
│   ├── (tabs)/                 # Tab navigation
│   │   ├── _layout.tsx
│   │   ├── dashboard.tsx       # Home/Dashboard
│   │   ├── projects.tsx
│   │   ├── messages.tsx
│   │   └── more.tsx
│   ├── profile/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── edit.tsx
│   │   ├── settings.tsx
│   │   └── security.tsx
│   ├── project/
│   │   ├── _layout.tsx
│   │   ├── [id].tsx            # Project dashboard
│   │   ├── [id]/forms.tsx
│   │   ├── [id]/documents.tsx
│   │   ├── [id]/submittals.tsx
│   │   ├── [id]/photos.tsx
│   │   └── [id]/team.tsx
│   ├── admin/                  # Organization admin
│   │   ├── _layout.tsx
│   │   ├── users.tsx
│   │   ├── roles.tsx
│   │   ├── settings.tsx
│   │   ├── templates.tsx
│   │   └── bulk-operations.tsx
│   └── platform-admin/         # Platform admin
│       ├── _layout.tsx
│       ├── dashboard.tsx
│       ├── organizations.tsx
│       ├── templates.tsx
│       ├── analytics.tsx
│       └── system.tsx
├── +html.tsx
└── +not-found.tsx
```

## 📏 Complete Folder Structure

```
infrloop/
├── app/                       # Expo Router pages
│   ├── (auth)/               # Authentication screens
│   ├── (onboarding)/         # User onboarding flow
│   ├── (app)/                # Main application screens
│   │   ├── (tabs)/           # Tab navigation screens
│   │   ├── profile/          # User profile management
│   │   ├── project/          # Project-specific screens
│   │   ├── admin/            # Organization admin screens
│   │   └── platform-admin/   # Platform admin screens
│   ├── _layout.tsx           # Root layout with providers
│   └── +not-found.tsx        # 404 fallback
├── components/               # Reusable components
│   ├── ui/                   # Base UI components (Tamagui-based)
│   ├── forms/                # Form-specific components
│   ├── layout/               # Layout components
│   ├── auth/                 # Authentication components
│   ├── project/              # Project-specific components
│   └── admin/                # Admin-specific components
├── lib/                      # Utilities and services
│   ├── supabase.ts           # Supabase client configuration
│   ├── auth.ts               # Authentication utilities
│   ├── database.ts           # Database query helpers
│   ├── storage.ts            # File storage utilities
│   ├── realtime.ts           # Real-time subscriptions
│   └── utils.ts              # General utilities
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts            # Authentication hook
│   ├── useSupabase.ts        # Supabase integration hook
│   ├── useRealtime.ts        # Real-time subscriptions
│   ├── useOffline.ts         # Offline functionality
│   └── usePermissions.ts     # Role-based permissions
├── types/                    # TypeScript type definitions
│   ├── auth.ts               # Authentication types
│   ├── database.ts           # Database schema types
│   ├── api.ts                # API response types
│   └── app.ts                # Application-specific types
├── constants/                # App constants
│   ├── roles.ts              # User roles and permissions
│   ├── forms.ts              # Form templates and schemas
│   └── config.ts             # App configuration
├── docs/                     # Documentation
└── assets/                   # Static assets
```

## 🔧 Architecture Patterns

### Multi-Tenant Architecture
- **Organization Isolation**: Complete data separation using Supabase RLS
- **Role-Based Access Control**: Platform Admin, Organization Admin, Project User
- **Scalable Infrastructure**: Support for thousands of organizations
- **Resource Isolation**: Separate storage buckets per organization

### Component Architecture
- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Feature-based Organization**: Group related components by functionality
- **Composition over Inheritance**: Favor component composition
- **Tamagui Integration**: Consistent styling with design tokens

### State Management
- **Local State**: React hooks for component state
- **Global State**: React Context for app-wide state
- **Server State**: Supabase real-time subscriptions
- **Form State**: React Hook Form for complex forms
- **Cache Management**: SWR or React Query for API data

### Data Flow
- **Unidirectional Data Flow**: Top-down props, bottom-up events
- **Real-time Updates**: Supabase subscriptions for live data
- **Optimistic Updates**: Immediate UI feedback with rollback
- **Offline Support**: Local storage with sync on reconnection

## 🔒 Security Architecture

### Authentication (Supabase Auth)
- **JWT Tokens**: Secure session management
- **Social Providers**: Google, Microsoft, Apple login
- **Multi-Factor Auth**: SMS and authenticator app support
- **Session Management**: Automatic token refresh

### Authorization (Row Level Security)
- **Multi-tenant Isolation**: RLS policies for data separation
- **Role-based Permissions**: Granular access control
- **API Security**: Automatic policy enforcement
- **Audit Trails**: Complete action logging

### Data Protection
- **Encryption at Rest**: Supabase handles database encryption
- **Encryption in Transit**: HTTPS/WSS for all communications
- **File Security**: Signed URLs for secure file access
- **Compliance**: SOC 2, GDPR compliance through Supabase

## 📡 Real-time Features

### Supabase Realtime Integration
- **Live Data Updates**: Real-time UI updates for project changes
- **Chat Messaging**: Instant messaging with WebSocket connections
- **Collaborative Editing**: Multiple users editing forms simultaneously
- **Status Notifications**: Real-time submittal and approval updates

### Offline Capabilities
- **Local Storage**: Critical data cached locally
- **Sync on Reconnect**: Automatic data synchronization
- **Conflict Resolution**: Handle concurrent edits gracefully
- **Progressive Enhancement**: Graceful degradation without connectivity

## 📈 Performance Considerations

### Mobile Optimization
- **Bundle Size**: Tree shaking with Tamagui Babel plugin
- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: Automatic image compression and resizing
- **Caching Strategy**: Intelligent caching for offline support

### Database Performance
- **Indexing**: Strategic indexes for multi-tenant queries
- **Connection Pooling**: Supabase handles connection management
- **Query Optimization**: Efficient RLS policies
- **CDN Integration**: Global content delivery for files

## 📦 Deployment Architecture

### Frontend Deployment
- **Expo Application Services (EAS)**: Native app builds
- **Over-the-Air Updates**: Instant updates without app store
- **Web Deployment**: Progressive Web App support
- **Environment Management**: Dev, staging, production environments

### Backend Infrastructure (Supabase)
- **Global Infrastructure**: Multi-region deployment
- **Auto Scaling**: Automatic resource scaling
- **Backup Strategy**: Automated daily backups
- **Monitoring**: Built-in performance monitoring

## 📊 Integration Points

### Third-party Integrations
- **Email Services**: Transactional emails via Supabase
- **Push Notifications**: Expo Push Notifications
- **File Processing**: Image compression and document conversion
- **Analytics**: User behavior and app performance tracking

### API Design
- **RESTful APIs**: Standard HTTP methods with Supabase
- **GraphQL Support**: Optional GraphQL layer
- **Webhook Support**: Event-driven integrations
- **Rate Limiting**: Built-in API rate limiting

---

*Detailed setup in [Development Setup](./development-setup.md)*