# FalconCare Frontend - AI-Native RCM Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Modern, responsive frontend for FalconCare's AI-powered Revenue Cycle Management platform**

The FalconCare frontend is a cutting-edge React application built with Next.js, providing healthcare providers in the GCC region with an intuitive, chat-first interface for managing their revenue cycle processes through AI automation.

## 🌟 Key Features

### 🤖 AI-First Interface

- **Conversational Chat**: Natural language interaction with AI agents
- **Real-time Responses**: Instant AI-powered assistance and suggestions
- **Markdown Support**: Rich text formatting for AI responses
- **Confidence Scoring**: Visual indicators for AI decision confidence

### 📊 Comprehensive Dashboards

- **Patient Management**: Create, view, and manage patient records
- **Claims Processing**: Track claims from creation to payment
- **Denial Management**: Automated denial analysis and appeal generation
- **Analytics Overview**: Real-time insights and performance metrics

### 🎨 Modern UI/UX

- **shadcn/ui Components**: Beautiful, accessible UI components
- **Dark/Light Mode**: Automatic theme switching with system preference
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Real-time Updates**: Live data synchronization across components

### 🌍 GCC-Optimized

- **Multi-language Ready**: Arabic and English support infrastructure
- **Regional Payer Integration**: UI for DAMAN, ADNIC, THIQA, BUPA
- **Cultural Adaptation**: Designed for GCC healthcare workflows
- **Compliance-Ready**: Built with healthcare data security in mind

## 🛠️ Technology Stack

### Core Framework

- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.0** - Type-safe development

### Styling & UI

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Beautiful SVG icon library
- **next-themes** - Dark/light mode management

### State Management

- **TanStack Query** - Server state management and caching
- **Zustand** - Lightweight client state management
- **React Hook Form** - Performant form handling with validation

### Data & Validation

- **Axios** - HTTP client for API communication
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern date utility library

## 🚀 Quick Start

### Prerequisites

- Node.js 18.18.0+ or 19.8.0+ or 20.0.0+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/falconcare-frontend.git
   cd falconcare-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```bash
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

   # Authentication (if using NextAuth)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Optional: Analytics
   NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
falconcare-frontend/
├── app/                           # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/             # Main application routes
│   │   ├── dashboard/           # Overview dashboard
│   │   ├── ai-chat/            # AI chat interface
│   │   ├── patients/           # Patient management
│   │   ├── encounters/         # Medical encounters
│   │   ├── claims/             # Claims processing
│   │   └── settings/           # User settings
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                   # Reusable UI components
│   ├── ui/                     # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── markdown.tsx        # Markdown renderer
│   │   └── ...
│   ├── auth-provider.tsx       # Authentication context
│   ├── theme-provider.tsx      # Theme management
│   └── ...
├── hooks/                       # Custom React hooks
│   ├── api-hooks.ts            # API query hooks
│   ├── use-auth.ts             # Authentication hooks
│   └── ...
├── lib/                        # Utility libraries
│   ├── api-client.ts           # HTTP client configuration
│   ├── utils.ts                # Common utilities
│   ├── validations.ts          # Zod schemas
│   └── ...
├── stores/                     # Zustand state stores
│   ├── auth-store.ts           # Authentication state
│   ├── ui-store.ts             # UI state (modals, etc.)
│   └── ...
├── types/                      # TypeScript type definitions
│   ├── api.ts                  # API response types
│   ├── auth.ts                 # Authentication types
│   └── ...
├── providers/                  # React providers
│   ├── react-query-provider.tsx
│   └── ...
├── .env.local.example          # Environment variables template
├── components.json             # shadcn/ui configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 UI Components

### Chat Interface (`/ai-chat`)

- Real-time AI conversation interface
- Markdown support for rich responses
- Confidence scoring indicators
- Suggested actions and quick replies
- Session management

### Patient Dashboard (`/patients`)

- Patient search and filtering
- Insurance status indicators
- Encounter history
- Quick actions (create encounter, check eligibility)

### Claims Management (`/claims`)

- Claims status tracking
- Submission workflow
- Denial management
- Appeal generation interface

### Encounters (`/encounters`)

- Clinical notes entry
- AI-powered data structuring
- Medical coding suggestions
- Confidence-based review queues

## 🔧 Configuration

### Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Optional Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=true
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- Custom color palette for healthcare UI
- Dark mode support
- Component-specific utility classes
- Animation utilities

### TypeScript Configuration

Strict TypeScript configuration with:

- Path mapping for clean imports
- Strict type checking
- Next.js optimization

## 🔗 API Integration

### Backend Integration

The frontend connects to the FalconCare FastAPI backend:

```typescript
// lib/api-client.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const apiClient = {
  // Authentication
  login: (email: string, password: string) =>
    axios.post(`${API_BASE_URL}/auth/login`, { email, password }),

  // AI Chat
  chatWithAgent: (message: string, sessionId?: string) =>
    axios.post(`${API_BASE_URL}/ai/chat`, { message, session_id: sessionId }),

  // Patient Management
  getPatients: (params: PaginationParams) =>
    axios.get(`${API_BASE_URL}/patients`, { params }),

  // And more...
};
```

### Real-time Features

- TanStack Query for server state management
- Automatic background refetching
- Optimistic updates for better UX
- Error handling and retry logic

## 🎭 State Management

### Server State (TanStack Query)

```typescript
// hooks/api-hooks.ts
export const usePatients = (params: PatientQueryParams) => {
  return useQuery({
    queryKey: ["patients", params],
    queryFn: () => apiClient.getPatients(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Client State (Zustand)

```typescript
// stores/ui-store.ts
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  currentChatSession: null,
  createPatientModalOpen: false,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentChatSession: (sessionId) => set({ currentChatSession: sessionId }),
}));
```

## 🚧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with turbo
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Code Quality

```bash
# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Formatting (if using Prettier)
npm run format
```

### Development Workflow

1. **Feature Development**

   - Create feature branch from `main`
   - Develop using the component library
   - Add proper TypeScript types
   - Test with backend integration

2. **Testing**

   - Manual testing in development
   - Cross-browser compatibility
   - Mobile responsiveness
   - API integration testing

3. **Code Review**
   - ESLint compliance
   - TypeScript strict mode
   - Component reusability
   - Performance considerations

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile-First Approach

- Touch-friendly interfaces
- Optimized chat experience
- Collapsible sidebars
- Swipe gestures support

## 🌐 Internationalization (Future)

The frontend is prepared for internationalization:

- React i18next integration ready
- Component structure supports RTL languages
- Date/time formatting for different locales
- Number formatting for regional standards

## 🔒 Security Features

### Client-Side Security

- JWT token management
- Automatic token refresh
- Secure API communication
- XSS protection via React
- CSRF protection

### Data Protection

- Sensitive data encryption in transit
- No sensitive data in localStorage
- Secure authentication flows
- Role-based UI rendering

## 📊 Performance Optimization

### Next.js Optimizations

- Automatic code splitting
- Image optimization
- Static generation where applicable
- Bundle analyzer integration

### Runtime Performance

- React 19 concurrent features
- Memoization for expensive calculations
- Lazy loading for heavy components
- Efficient re-rendering strategies

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npx vercel

# Or connect GitHub repository for automatic deployments
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Environment Variables for Production

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.falconcare.com
NEXTAUTH_URL=https://app.falconcare.com
NEXTAUTH_SECRET=production-secret-key
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Follow the code style**
   - Use TypeScript for all new code
   - Follow existing component patterns
   - Add proper JSDoc comments
4. **Test your changes**
   - Manual testing across devices
   - Check TypeScript compilation
   - Verify API integration
5. **Submit a pull request**

### Development Guidelines

- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utilities, avoid custom CSS
- **State**: Use TanStack Query for server state, Zustand for client state
- **Types**: Define proper TypeScript interfaces for all data
- **Performance**: Consider lazy loading and memoization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Vercel** for Next.js and deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the icon library
- **TanStack** for excellent data fetching tools

---

**FalconCare Frontend** - Beautiful, intuitive healthcare RCM interface powered by AI
