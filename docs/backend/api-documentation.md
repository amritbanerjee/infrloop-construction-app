# API Documentation

## 🔗 Supabase API Overview

Base URL: `https://[project-ref].supabase.co/rest/v1`  
Realtime URL: `wss://[project-ref].supabase.co/realtime/v1`

## Authentication (Supabase Auth)
- JWT-based authentication with automatic token refresh
- Row Level Security (RLS) for multi-tenant isolation
- Social authentication (Google, Microsoft, Apple)
- Multi-factor authentication support
- Session management with automatic cleanup

## Core API Endpoints

### Authentication
- `POST /auth/v1/signup` - User registration
- `POST /auth/v1/token` - User login
- `POST /auth/v1/logout` - User logout
- `POST /auth/v1/recover` - Password recovery
- `POST /auth/v1/user` - Update user profile
- `GET /auth/v1/user` - Get current user

### Organizations (Multi-tenant)
- `GET /rest/v1/organizations` - List user's organizations
- `POST /rest/v1/organizations` - Create organization (Admin only)
- `GET /rest/v1/organizations?id=eq.[id]` - Get organization details
- `PATCH /rest/v1/organizations?id=eq.[id]` - Update organization
- `DELETE /rest/v1/organizations?id=eq.[id]` - Delete organization

### Projects
- `GET /rest/v1/projects` - List projects (filtered by organization)
- `POST /rest/v1/projects` - Create project
- `GET /rest/v1/projects?id=eq.[id]` - Get project details
- `PATCH /rest/v1/projects?id=eq.[id]` - Update project
- `DELETE /rest/v1/projects?id=eq.[id]` - Delete project

### Forms & Submittals
- `GET /rest/v1/forms` - List forms
- `POST /rest/v1/forms` - Create form
- `GET /rest/v1/form_submissions` - List form submissions
- `POST /rest/v1/form_submissions` - Submit form
- `GET /rest/v1/submittals` - List submittals
- `POST /rest/v1/submittals` - Create submittal
- `PATCH /rest/v1/submittals?id=eq.[id]` - Update submittal status

### Documents & Media
- `POST /storage/v1/object/documents/[path]` - Upload document
- `GET /storage/v1/object/public/documents/[path]` - Download document
- `DELETE /storage/v1/object/documents/[path]` - Delete document
- `POST /storage/v1/object/photos/[path]` - Upload photo
- `GET /storage/v1/object/public/photos/[path]` - Get photo

### Team & Users
- `GET /rest/v1/organization_members` - List team members
- `POST /rest/v1/organization_members` - Add team member
- `PATCH /rest/v1/organization_members?id=eq.[id]` - Update member role
- `DELETE /rest/v1/organization_members?id=eq.[id]` - Remove member

### Real-time Subscriptions
- `projects:*` - Project changes
- `form_submissions:*` - New form submissions
- `messages:*` - Chat messages
- `submittals:*` - Submittal status changes

## Row Level Security Policies

### Multi-tenant Data Isolation
```sql
-- Users can only access data from their organization
CREATE POLICY "Users can only access their organization's data" ON projects
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM organization_members 
    WHERE user_id = auth.uid()
  ));
```

### Role-based Access Control
```sql
-- Only admins can create organizations
CREATE POLICY "Only platform admins can create organizations" ON organizations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'platform_admin'
    )
  );
```

## Error Handling

### Standard HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (RLS violation)
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

### Error Response Format
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": "Additional details"
  }
}
```

## Rate Limiting
- **Authentication**: 30 requests per hour per IP
- **API Calls**: 1000 requests per minute per user
- **File Uploads**: 100 MB per hour per user
- **Real-time**: 100 connections per user

---

*Database schema in [Database Schema](./database-schema.md)*