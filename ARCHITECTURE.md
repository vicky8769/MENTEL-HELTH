# MindGuard AI - Product Architecture Document

## Executive Summary

MindGuard AI is a comprehensive, AI-powered mental wellness platform designed for students preparing for high-pressure examinations. The architecture is built to scale to 10 million+ users while maintaining high performance, security, and reliability.

---

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │  Mobile App  │  │   Admin UI   │          │
│  │  (Next.js)   │  │  (React Native)│  │  (Next.js)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CDN & Edge Layer                            │
│                    (Vercel Edge Network)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                           │
│                    (Next.js API Routes)                          │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Auth Svc   │    │  AI Service  │    │ Notification │
│  (NextAuth)  │    │  (Gemini)    │    │   Service    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Mood Svc    │  │ Journal Svc  │  │  Coach Svc   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Insights Svc │  │  Gamification │  │  Emergency   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ PostgreSQL   │    │    Redis     │    │   Object     │
│  (Primary)   │    │   (Cache)    │    │   Storage    │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## Component Architecture

### 1. Frontend Layer

#### Web Application (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Context
- **Charts**: Chart.js / Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

#### Key Frontend Components
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── mood/page.tsx
│   │   ├── journal/page.tsx
│   │   ├── coach/page.tsx
│   │   ├── insights/page.tsx
│   │   ├── achievements/page.tsx
│   │   └── emergency/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── mood/
│   │   ├── journal/
│   │   ├── wellness/
│   │   ├── coach/
│   │   ├── insights/
│   │   └── gamification/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── mood/
│   ├── journal/
│   └── shared/
├── lib/
│   ├── api/
│   ├── utils/
│   └── hooks/
└── styles/
```

### 2. Backend Layer

#### API Services
- **Authentication**: NextAuth.js with Google OAuth
- **Mood Tracking**: RESTful API for check-ins
- **Journal**: CRUD operations with AI analysis
- **Wellness Engine**: Score calculation and predictions
- **AI Coach**: Integration with Gemini API
- **Insights**: Pattern detection and analytics
- **Gamification**: XP, badges, and achievements
- **Emergency**: Crisis detection and resources

#### Service Architecture
```typescript
// Service Layer Pattern
interface IService<T> {
  create(data: CreateDTO): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(filters?: FilterDTO): Promise<T[]>;
  update(id: string, data: UpdateDTO): Promise<T>;
  delete(id: string): Promise<void>;
}

// Example: MoodService
class MoodService implements IService<MoodEntry> {
  async create(data: CreateMoodDTO): Promise<MoodEntry> {
    // Calculate wellness score
    const wellnessScore = this.calculateWellnessScore(data);
    
    // Save to database
    const entry = await this.prisma.moodEntry.create({
      data: { ...data, wellnessScore }
    });
    
    // Update user stats
    await this.updateUserStats(entry.userId);
    
    // Check for crisis
    if (wellnessScore < 20) {
      await this.triggerCrisisProtocol(entry.userId);
    }
    
    return entry;
  }
  
  private calculateWellnessScore(data: MoodData): number {
    return Math.round(
      (data.moodScore * 0.40) +
      (data.sleepQuality * 0.20) +
      (data.energyLevel * 0.15) +
      (data.confidenceLevel * 0.15) +
      ((100 - data.stressLevel) * 0.10)
    );
  }
}
```

### 3. Data Layer

#### Database Schema (PostgreSQL)
- **Users**: User accounts and profiles
- **MoodEntries**: Daily mood check-ins
- **JournalEntries**: Emotional journal with AI analysis
- **Achievements**: Gamification badges
- **UserStats**: XP, streaks, levels
- **StressTriggers**: Identified stress patterns
- **AIInsights**: AI-generated insights
- **WellnessReports**: Weekly/monthly reports
- **CoachInteractions**: AI coach history
- **CrisisLogs**: Emergency interventions

#### ORM: Prisma
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  moodEntries MoodEntry[]
  journalEntries JournalEntry[]
  stats      UserStats?
  achievements Achievement[]
  // ... other relations
}
```

#### Caching Layer (Redis)
- Session storage
- API response caching
- Rate limiting
- Real-time analytics

---

## AI Integration Architecture

### Gemini AI Integration

```
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Journal Svc  │  │ Coach Svc   │  │ Insights Svc │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                 AI Service Layer                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Gemini AI Client Wrapper                │  │
│  │  - Prompt Management                              │  │
│  │  - Response Validation                            │  │
│  │  - Error Handling                                 │  │
│  │  - Rate Limiting                                  │  │
│  │  - Caching                                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  External AI Service                     │
│                    Google Gemini API                      │
└─────────────────────────────────────────────────────────┘
```

### AI Service Implementation
```typescript
// lib/ai/gemini-client.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiClient {
  private client: GoogleGenerativeAI;
  private model: any;
  
  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.client.getGenerativeModel({ model: 'gemini-pro' });
  }
  
  async analyzeSentiment(text: string): Promise<SentimentAnalysis> {
    const prompt = SENTIMENT_PROMPT.replace('{text}', text);
    
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    
    // Validate and parse response
    const analysis = this.validateAndParse(response.text());
    
    // Cache result
    await this.cacheResult(`sentiment:${hash(text)}`, analysis);
    
    return analysis;
  }
  
  async getCoachAdvice(userData: UserData): Promise<CoachAdvice> {
    const prompt = COACH_PROMPT
      .replace('{wellness_score}', userData.wellnessScore.toString())
      .replace('{mood}', userData.mood)
      // ... other replacements
    
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    
    return this.validateAndParse(response.text());
  }
  
  private validateAndParse<T>(response: string): T {
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback response
      return this.getFallbackResponse();
    }
  }
}
```

---

## Security Architecture

### Security Layers

#### 1. Authentication & Authorization
- **Authentication**: NextAuth.js with JWT
- **OAuth**: Google OAuth 2.0
- **Session Management**: Secure HTTP-only cookies
- **Authorization**: Role-based access control (RBAC)
- **Multi-Factor Auth**: Optional MFA support

#### 2. Data Protection
- **Encryption at Rest**: PostgreSQL encryption
- **Encryption in Transit**: TLS 1.3
- **PII Protection**: Data masking for sensitive info
- **HIPAA Compliance**: Healthcare data standards
- **GDPR Compliance**: EU data protection

#### 3. API Security
- **Rate Limiting**: 1000 requests/hour per user
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Prisma ORM
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: Token-based validation

#### 4. Infrastructure Security
- **Network Security**: VPC with private subnets
- **Firewall Rules**: Strict inbound/outbound rules
- **Secret Management**: Environment variables + secret managers
- **Audit Logging**: Comprehensive audit trails
- **Monitoring**: Real-time security monitoring

### Security Headers
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: CSP_DIRECTIVE
  }
];
```

---

## Scalability Architecture

### Horizontal Scaling Strategy

#### 1. Application Layer
- **Load Balancer**: Vercel Edge Network
- **Auto-scaling**: Automatic based on traffic
- **Serverless Functions**: Next.js API routes
- **CDN Distribution**: Global edge caching

#### 2. Database Layer
- **Read Replicas**: Multiple read replicas
- **Connection Pooling**: PgBouncer
- **Database Sharding**: By user region
- **Backup Strategy**: Daily backups + point-in-time recovery

#### 3. Caching Strategy
- **Redis Cluster**: Distributed caching
- **Application Cache**: In-memory cache
- **CDN Cache**: Static assets
- **Database Query Cache**: Query result caching

### Performance Optimization

#### Frontend Optimization
- **Code Splitting**: Dynamic imports
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: Next.js Image component
- **Bundle Size**: Tree shaking and minification
- **Service Worker**: Offline support

#### Backend Optimization
- **Query Optimization**: Indexed queries
- **Batch Processing**: Bulk operations
- **Async Processing**: Background jobs
- **Response Compression**: Gzip compression
- **CDN Delivery**: Static asset delivery

---

## Monitoring & Observability

### Monitoring Stack

#### 1. Application Monitoring
- **APM**: Datadog / New Relic
- **Error Tracking**: Sentry
- **Performance**: Web Vitals
- **Uptime Monitoring**: Pingdom / UptimeRobot

#### 2. Log Management
- **Log Aggregation**: ELK Stack / CloudWatch
- **Structured Logging**: JSON format
- **Log Retention**: 90 days
- **Log Analysis**: Custom dashboards

#### 3. Metrics & Analytics
- **Custom Metrics**: Prometheus / CloudWatch
- **Business Metrics**: User engagement, wellness scores
- **System Metrics**: CPU, memory, disk I/O
- **Alerting**: PagerDuty / Slack notifications

### Key Metrics to Track
```typescript
// Business Metrics
interface BusinessMetrics {
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  averageWellnessScore: number;
  checkinCompletionRate: number;
  crisisInterventionRate: number;
  userRetentionRate: number;
}

// System Metrics
interface SystemMetrics {
  responseTime: number;
  errorRate: number;
  throughput: number;
  cpuUsage: number;
  memoryUsage: number;
  databaseConnections: number;
}
```

---

## Deployment Architecture

### Environments

#### 1. Development
- **Local**: Docker Compose
- **Database**: Local PostgreSQL
- **AI Service**: Gemini API (dev key)
- **URL**: localhost:3000

#### 2. Staging
- **Platform**: Vercel Preview Deployments
- **Database**: Railway PostgreSQL (staging)
- **AI Service**: Gemini API (staging key)
- **URL**: staging.mindguard.ai

#### 3. Production
- **Platform**: Vercel (Production)
- **Database**: Supabase / Railway (Production)
- **AI Service**: Gemini API (production key)
- **URL**: mindguard.ai

### CI/CD Pipeline

```
┌──────────────┐
│   Push Code  │
└──────┬───────┘
       ▼
┌──────────────┐
│  Run Tests   │
└──────┬───────┘
       ▼
┌──────────────┐
│   Build App  │
└──────┬───────┘
       ▼
┌──────────────┐
│ Deploy to    │
│  Staging     │
└──────┬───────┘
       ▼
┌──────────────┐
│  E2E Tests   │
└──────┬───────┘
       ▼
┌──────────────┐
│ Deploy to    │
│ Production   │
└──────┬───────┘
       ▼
┌──────────────┐
│  Run Migrations
└──────────────┘
```

---

## Disaster Recovery & Business Continuity

### Backup Strategy
- **Database Backups**: Daily automated backups
- **Point-in-Time Recovery**: 7-day retention
- **Cross-Region Replication**: Multi-region backups
- **Backup Verification**: Weekly restore tests

### High Availability
- **Multi-AZ Deployment**: Multiple availability zones
- **Load Balancing**: Automatic failover
- **Database Failover**: Automatic replica promotion
- **CDN Redundancy**: Global edge network

### Incident Response
- **Severity Levels**: P1 (Critical) to P4 (Low)
- **Response Times**: <15 min for P1, <1 hour for P2
- **Escalation Matrix**: Defined escalation paths
- **Communication Plan**: Stakeholder notifications

---

## Cost Architecture

### Cost Optimization Strategy

#### 1. Infrastructure Costs
- **Serverless**: Pay-per-use pricing
- **Database**: Reserved instances for predictable load
- **CDN**: Tiered caching to reduce bandwidth
- **AI API**: Request batching and caching

#### 2. Cost Monitoring
- **Budget Alerts**: Monthly budget thresholds
- **Cost Allocation**: Per-service cost tracking
- **Optimization Reviews**: Monthly cost reviews
- **Right-Sizing**: Regular resource optimization

### Estimated Costs (10M Users)
```
Frontend (Vercel): $2,000/month
Database (Supabase): $5,000/month
Redis (Railway): $500/month
AI API (Gemini): $10,000/month
CDN (Vercel): $1,000/month
Monitoring (Datadog): $500/month
Total: ~$19,000/month
```

---

## Technology Stack Summary

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand + React Context
- **Forms**: React Hook Form + Zod
- **Charts**: Chart.js
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: NextAuth.js

### Database
- **Primary**: PostgreSQL 15+
- **Cache**: Redis 7+
- **ORM**: Prisma

### AI/ML
- **Primary**: Google Gemini API
- **Fallback**: Custom sentiment analysis

### Infrastructure
- **Hosting**: Vercel (Frontend)
- **Database**: Supabase / Railway
- **Cache**: Railway Redis
- **CDN**: Vercel Edge Network
- **Monitoring**: Datadog + Sentry

### DevOps
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Infrastructure as Code**: Docker Compose
- **Version Control**: Git

---

## Future Architecture Enhancements

### Phase 2 Enhancements
1. **Microservices Architecture**: Split into dedicated services
2. **Event-Driven Architecture**: Implement message queues (RabbitMQ/Kafka)
3. **Advanced AI**: Custom ML models for predictions
4. **Real-time Features**: WebSocket support for live updates
5. **Mobile Apps**: Native iOS and Android applications

### Phase 3 Enhancements
1. **Edge Computing**: AI inference at the edge
2. **Blockchain**: Secure health data storage
3. **Voice AI**: Voice journaling and analysis
4. **Wearable Integration**: Apple Health, Google Fit
5. **Telehealth Integration**: Video counseling platform

---

## Conclusion

MindGuard AI's architecture is designed to be:
- **Scalable**: Support 10M+ users
- **Secure**: HIPAA and GDPR compliant
- **Reliable**: 99.9% uptime SLA
- **Performant**: Sub-second response times
- **Maintainable**: Clean code and documentation
- **Cost-Effective**: Optimized infrastructure costs

The architecture follows industry best practices and is built to evolve with the growing needs of the platform and its users.
