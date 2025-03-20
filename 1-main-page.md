Set up the frontend according to the following prompt:
  <frontend-prompt>
  Create detailed components with these requirements:
  1. Use 'use client' directive for client-side components
  2. Make sure to concatenate strings correctly using backslash
  3. Style with Tailwind CSS utility classes for responsive design
  4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
  5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
  6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
  7. Create root layout.tsx page that wraps necessary navigation items to all pages
  8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
  9. Accurately implement necessary grid layouts
  10. Follow proper import practices:
     - Use @/ path aliases
     - Keep component imports organized
     - Update current src/app/page.tsx with new comprehensive code
     - Don't forget root route (page.tsx) handling
     - You MUST complete the entire prompt before stopping
  </frontend-prompt>

  <summary_title>
Arabic Employee Management Dashboard UI
</summary_title>

<image_analysis>
1. Navigation Elements:
- Primary navigation: الأقسام, إضافة موظف, الحضور والانصراف, الرواتب, تسجيل الحضور, إضافة قسم, الموظفين, الاعدادات
- Top bar: 60px height, dark theme
- Logo/System name "نظام إدارة الموظفين" aligned right
- Notification bell and theme toggle on left
- User menu "AU" indicator at far left

2. Layout Components:
- Main container: 100% width, dark background
- Dashboard cards: 300px width, rounded corners (12px)
- Sidebar: 250px fixed width, light gray background
- Content area: Flexible width with 24px padding
- Card grid: 2x2 layout for statistics

3. Content Sections:
- Statistics cards (4 total):
  - إجمالي الموظفين (0)
  - إجمالي الأقسام (0)
  - الموظفين النشطين (0)
  - في إجازة (0)
- Quick Actions panel
- Expiring IDs panel
- Recent Activity feed

4. Interactive Controls:
- Quick action buttons:
  - إضافة موظف (blue)
  - إضافة قسم (green)
  - تسجيل الحضور (purple)
  - تحميل الرواتب (orange)
- Hover states with slight opacity change
- Icon-based navigation indicators

5. Colors:
- Primary: #1677FF (blue)
- Secondary: #28A745 (green)
- Accent: #9747FF (purple)
- Warning: #FF7F50 (orange)
- Background: #0A0E17
- Text: #FFFFFF

6. Grid/Layout Structure:
- 12-column grid system
- 24px grid gap
- Responsive breakpoints at 768px, 1024px, 1440px
- Cards maintain minimum 300px width
</image_analysis>

<development_planning>
1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── DashboardLayout.tsx
│   ├── features/
│   │   ├── Statistics/
│   │   ├── QuickActions/
│   │   └── ActivityFeed/
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```

2. Key Features:
- Real-time statistics dashboard
- Employee management CRUD operations
- Attendance tracking system
- Department management
- Payroll processing
- Activity logging

3. State Management:
```typescript
interface AppState {
  employees: {
    total: number;
    active: number;
    onLeave: number;
    list: Employee[];
  };
  departments: {
    total: number;
    list: Department[];
  };
  attendance: {
    daily: AttendanceRecord[];
    status: 'loading' | 'success' | 'error';
  };
}
```

4. Component Architecture:
- DashboardLayout (parent)
  - TopBar
  - Sidebar
  - StatisticsGrid
  - QuickActions
  - ExpiringIDs
  - ActivityFeed

5. Responsive Breakpoints:
```scss
$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1440px
);
```
</development_planning>