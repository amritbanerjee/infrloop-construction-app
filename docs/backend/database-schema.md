# Database Schema (Supabase PostgreSQL)

## 📊 Multi-Tenant Architecture

### Core Tables

#### Organizations (Multi-tenant Root)
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}',
  subscription_tier VARCHAR(50) DEFAULT 'basic',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
```

#### User Profiles (Extends Supabase Auth)
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  phone VARCHAR(20),
  job_title VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

#### Organization Members (Multi-tenant User Assignment)
```sql
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- 'platform_admin', 'org_admin', 'project_user'
  permissions JSONB DEFAULT '{}',
  invited_by UUID REFERENCES auth.users(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- Enable RLS
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
```

### Project Management

#### Projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'planning', -- 'planning', 'active', 'on_hold', 'completed', 'cancelled'
  priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  actual_cost DECIMAL(15,2) DEFAULT 0,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  location JSONB, -- {address, coordinates, etc}
  settings JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
```

#### Project Members
```sql
CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- 'manager', 'supervisor', 'worker', 'viewer'
  permissions JSONB DEFAULT '{}',
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(project_id, user_id)
);

-- Enable RLS
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
```

### Forms & Documentation

#### Form Templates
```sql
CREATE TABLE form_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- 'safety', 'quality', 'progress', 'custom'
  schema JSONB NOT NULL, -- Form field definitions
  is_global BOOLEAN DEFAULT false, -- Platform-wide templates
  version INTEGER DEFAULT 1,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE form_templates ENABLE ROW LEVEL SECURITY;
```

#### Form Submissions
```sql
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  form_template_id UUID REFERENCES form_templates(id),
  title VARCHAR(255),
  data JSONB NOT NULL, -- Form response data
  attachments JSONB DEFAULT '[]', -- File references
  location JSONB, -- GPS coordinates, address
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'submitted', 'approved', 'rejected'
  submitted_by UUID REFERENCES auth.users(id),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
```

### Submittal Management

#### Submittals
```sql
CREATE TABLE submittals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- 'material', 'shop_drawing', 'product_data', 'sample'
  description TEXT,
  specification_section VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'under_review', 'approved', 'rejected', 'resubmit'
  due_date DATE,
  priority VARCHAR(20) DEFAULT 'medium',
  submitted_by UUID REFERENCES auth.users(id),
  reviewed_by UUID REFERENCES auth.users(id),
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE submittals ENABLE ROW LEVEL SECURITY;
```

### Communication

#### Messages (Real-time Chat)
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text', -- 'text', 'file', 'image', 'system'
  attachments JSONB DEFAULT '[]',
  reply_to_id UUID REFERENCES messages(id),
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

### File Management

#### Documents (References to Supabase Storage)
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL, -- Supabase Storage path
  file_size INTEGER,
  mime_type VARCHAR(100),
  category VARCHAR(100), -- 'drawing', 'specification', 'photo', 'report'
  tags JSONB DEFAULT '[]',
  version INTEGER DEFAULT 1,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
```

## 🔒 Row Level Security (RLS) Policies

### Multi-tenant Data Isolation

```sql
-- Organizations: Users can only access their own organizations
CREATE POLICY "Users can access their organizations" ON organizations
  FOR ALL USING (
    id IN (
      SELECT organization_id FROM organization_members 
      WHERE user_id = auth.uid()
    )
  );

-- Projects: Users can only access projects in their organization
CREATE POLICY "Users can access organization projects" ON projects
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM organization_members 
      WHERE user_id = auth.uid()
    )
  );

-- Form Submissions: Users can only access submissions from their projects
CREATE POLICY "Users can access project form submissions" ON form_submissions
  FOR ALL USING (
    project_id IN (
      SELECT p.id FROM projects p
      JOIN organization_members om ON p.organization_id = om.organization_id
      WHERE om.user_id = auth.uid()
    )
  );
```

### Role-based Access Control

```sql
-- Platform Admin: Full access to organizations
CREATE POLICY "Platform admins can manage all organizations" ON organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE user_id = auth.uid() AND role = 'platform_admin'
    )
  );

-- Organization Admin: Can manage organization settings
CREATE POLICY "Org admins can manage their organization" ON organizations
  FOR UPDATE USING (
    id IN (
      SELECT organization_id FROM organization_members 
      WHERE user_id = auth.uid() AND role IN ('platform_admin', 'org_admin')
    )
  );
```

## 🔗 Relationships Summary

### Hierarchical Structure
- **Organizations** (Root) → have many **Projects**
- **Projects** → have many **Form Submissions**, **Submittals**, **Documents**, **Messages**
- **Users** → belong to **Organizations** via **Organization Members**
- **Users** → belong to **Projects** via **Project Members**
- **Form Templates** → can be **Organization-specific** or **Global**

### Access Control Flow
1. User authenticates via Supabase Auth
2. User's organization memberships determine data access scope
3. Project memberships determine project-specific permissions
4. Role-based policies enforce feature access within scope

## 📈 Indexes for Performance

```sql
-- Multi-tenant queries
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_organization_members_user_id ON organization_members(user_id);
CREATE INDEX idx_organization_members_org_id ON organization_members(organization_id);

-- Form submissions
CREATE INDEX idx_form_submissions_project_id ON form_submissions(project_id);
CREATE INDEX idx_form_submissions_submitted_by ON form_submissions(submitted_by);

-- Messages for real-time chat
CREATE INDEX idx_messages_project_id_created_at ON messages(project_id, created_at DESC);

-- Documents
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_documents_category ON documents(category);
```

---

*API endpoints in [API Documentation](./api-documentation.md)*