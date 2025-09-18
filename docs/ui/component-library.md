# Component Library Documentation

## 🏗️ Core Components

### Buttons

#### Primary Button
```typescript
<Button variant="primary" size="md">
  Save Project
</Button>
```

#### Secondary Actions
```typescript
<Button variant="secondary" size="md">
  Cancel
</Button>
```

#### Outline Style
```typescript
<Button variant="outline" size="sm">
  Edit Details
</Button>
```

### Cards

#### Project Card
```typescript
<Card elevated>
  <Text fontSize="$heading2">Project Name</Text>
  <Text color="$steelGray">Status: In Progress</Text>
</Card>
```

#### Status Card
```typescript
<StatusCard 
  title="Active Projects" 
  value="12" 
  status="success"
  icon="construction"
/>
```

### Forms

#### Input Fields
```typescript
<Input 
  placeholder="Enter project name"
  label="Project Name"
  required
/>
```

#### Select Dropdown
```typescript
<Select 
  placeholder="Select status"
  options={statusOptions}
  value={selectedStatus}
  onValueChange={setSelectedStatus}
/>
```

## 🎨 Construction-Specific Components

### Safety Indicators
- Safety status badges
- Warning alerts
- Emergency notifications

### Project Status
- Progress indicators
- Timeline components
- Milestone markers

### Team Management
- User avatars
- Role badges
- Team member lists

## 📱 Screen Components

### Headers
- Navigation headers
- Action headers
- Filter headers

### Lists
- Project lists
- Task lists
- Team member lists

### Modals
- Confirmation dialogs
- Form modals
- Information displays

---

*See [Tamagui Setup](./tamagui-setup.md) for implementation details*