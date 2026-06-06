# 🧠 MindGuard AI - Mental Wellness Platform for Students

## 📋 Overview

MindGuard AI is a production-ready, AI-powered mental wellness platform designed specifically for students preparing for high-pressure examinations (NEET, JEE, CUET, CAT, GATE, UPSC, SSC, and Board Exams). The platform uses advanced AI to detect emotional decline early, predict burnout risk, and provide personalized interventions before students reach crisis stages.

## 🎯 Problem Statement

Millions of students suffer from:
- Exam Stress
- Anxiety
- Burnout
- Fear of Failure
- Low Confidence
- Sleep Disorders
- Result Anxiety
- Depression Symptoms
- Social Isolation

Most students do not realize their mental health is deteriorating until it becomes severe. MindGuard AI addresses this by providing real-time monitoring, AI-powered insights, and personalized support.

## ✨ Key Features

### 1. Smart Mood Tracking
- 12-level mood selection with emoji-based interface
- Daily check-ins with wellness metrics
- Sleep Quality, Energy Level, Confidence Level, Stress Level, Study Productivity tracking

### 2. AI Wellness Score Engine
- Real-time Mental Wellness Score calculation
- Weighted formula: Mood (40%) + Sleep (20%) + Energy (15%) + Confidence (15%) + Stress (10%)
- Categorization: Thriving (80-100), Healthy (60-79), Needs Attention (40-59), High Risk (20-39), Critical (0-19)

### 3. Burnout Prediction Engine
- Historical trend analysis
- Burnout probability prediction
- Emotional decline detection
- Anxiety spike identification
- Motivation scoring

### 4. AI Stress Trigger Detection
- Automatic identification of stress causes
- Trigger frequency and severity tracking
- Pattern recognition for common stressors

### 5. AI Emotional Journal
- Free-form journaling with AI sentiment analysis
- Recurring negative thought detection
- Weekly summaries
- Positive growth pattern highlighting

### 6. AI Wellness Coach
- Personalized daily motivation
- Custom affirmations
- Breathing exercises
- Study-break schedules
- Meditation recommendations
- Confidence-building activities

### 7. Emergency Support System
- Crisis Mode activation (wellness < 20%)
- Grounding exercises
- Calm breathing sessions
- Emergency relaxation mode
- Parent/mentor contact suggestions
- Counselor support resources

### 8. Gamification System
- Daily Check-in Streaks
- Wellness XP rewards
- Achievement Badges
- Focus Champion Awards
- Stress Recovery Milestones

### 9. AI Dashboard
- Mental Wellness Score visualization
- Burnout Risk percentage
- Mood Trend Graphs
- Anxiety Trend Graphs
- Sleep Analytics
- Productivity Analytics
- Weekly Wellness Reports
- Monthly Emotional Growth Reports

### 10. AI Insights Engine
- Pattern detection and analysis
- Personalized insights generation
- Trend identification
- Predictive recommendations

## 🎨 UI/UX Features

- Modern Glassmorphism Design
- Mobile-First Interface
- Dark Mode / Light Mode
- Smooth Animations
- Emoji-Based Mood Selection
- Interactive Charts (Chart.js)
- Accessibility Support
- Fast Loading Performance

## 🛠️ Tech Stack

### Frontend
- **Framework**: React / Next.js 14
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Icons**: Lucide Icons
- **State Management**: React Context / Zustand

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: RESTful API

### Database
- **Primary**: PostgreSQL
- **ORM**: Prisma
- **Caching**: Redis

### AI/ML
- **Primary AI**: Google Gemini API
- **Sentiment Analysis**: Custom + Gemini
- **Predictive Analytics**: Historical data analysis

### Authentication
- **Google OAuth**: NextAuth.js
- **Email/Password**: bcrypt + JWT

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway / Render
- **Database**: Supabase / Railway PostgreSQL

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    google_id VARCHAR(255),
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Mood Entries Table
```sql
CREATE TABLE mood_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    mood VARCHAR(50) NOT NULL,
    mood_score INTEGER NOT NULL,
    sleep_quality INTEGER NOT NULL,
    energy_level INTEGER NOT NULL,
    confidence_level INTEGER NOT NULL,
    stress_level INTEGER NOT NULL,
    study_productivity INTEGER NOT NULL,
    wellness_score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Journal Entries Table
```sql
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    text TEXT NOT NULL,
    sentiment VARCHAR(20) NOT NULL,
    sentiment_score DECIMAL(5,2),
    ai_analysis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Achievements Table
```sql
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    badge_name VARCHAR(100) NOT NULL,
    badge_icon VARCHAR(50),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Stats Table
```sql
CREATE TABLE user_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    current_streak INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    total_checkins INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Structure

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user

### Mood Tracking Endpoints
- `POST /api/mood/checkin` - Submit mood check-in
- `GET /api/mood/history` - Get mood history
- `GET /api/mood/trends` - Get mood trends
- `GET /api/mood/latest` - Get latest entry

### Wellness Score Endpoints
- `GET /api/wellness/score` - Get current wellness score
- `GET /api/wellness/history` - Get wellness history
- `GET /api/wellness/predictions` - Get AI predictions

### Journal Endpoints
- `POST /api/journal/entry` - Create journal entry
- `GET /api/journal/entries` - Get journal entries
- `GET /api/journal/analysis` - Get AI analysis
- `GET /api/journal/summary` - Get weekly summary

### Coach Endpoints
- `GET /api/coach/advice` - Get personalized advice
- `GET /api/coach/exercises` - Get recommended exercises
- `POST /api/coach/feedback` - Submit feedback

### Insights Endpoints
- `GET /api/insights/patterns` - Get pattern analysis
- `GET /api/insights/triggers` - Get stress triggers
- `GET /api/insights/reports` - Get wellness reports

### Gamification Endpoints
- `GET /api/gamification/stats` - Get user stats
- `GET /api/gamification/badges` - Get achievements
- `POST /api/gamification/xp` - Award XP

## 🤖 Gemini AI Integration

### Sentiment Analysis Prompt
```
Analyze the following journal entry for emotional sentiment. 
Provide:
1. Overall sentiment (positive, neutral, negative)
2. Confidence score (0-100)
3. Key emotions detected
4. Any concerning patterns
5. Suggested support resources if needed

Journal entry: {journal_text}
```

### Wellness Coach Prompt
```
You are a supportive mental wellness coach for students preparing for exams. 
Based on the following data, provide personalized advice:

Current wellness score: {wellness_score}
Recent mood: {mood}
Stress level: {stress_level}
Sleep quality: {sleep_quality}
Recent journal entries: {journal_entries}

Provide:
1. Empathetic acknowledgment of their current state
2. 2-3 specific, actionable recommendations
3. Encouragement and motivation
4. Suggested exercises or activities
```

### Burnout Prediction Prompt
```
Analyze the following student wellness data to predict burnout risk:

Historical data: {historical_data}
Current metrics: {current_metrics}
Trends: {trends}

Provide:
1. Burnout risk percentage (0-100)
2. Key risk factors identified
3. Early warning signs
4. Preventive recommendations
5. When to seek professional help
```

### Insights Generation Prompt
```
Generate personalized insights from the following wellness data:

Data: {wellness_data}
Time period: {time_period}

Provide:
1. Pattern analysis
2. Trend identification
3. Correlations discovered
4. Actionable insights
5. Predictive observations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Google Gemini API Key
- Google OAuth credentials (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mindguard-ai.git
cd mindguard-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Configure environment variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mindguard
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

5. Run database migrations
```bash
npx prisma migrate dev
```

6. Start the development server
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### For Students

1. **Daily Check-in**: Start each day with a mood check-in
2. **Journal Writing**: Use the emotional journal regularly
3. **Review Insights**: Check your AI-generated insights weekly
4. **Follow Coach Advice**: Implement personalized recommendations
5. **Track Progress**: Monitor your wellness trends over time

### For Educators/Parents

1. **Monitor Trends**: View aggregate wellness data (with consent)
2. **Identify At-Risk Students**: AI-powered risk detection
3. **Provide Resources**: Access recommended support materials
4. **Track Engagement**: Monitor platform usage patterns

## 🔒 Security

- End-to-end encryption for sensitive data
- HIPAA-compliant data storage
- Anonymous analytics options
- GDPR compliance
- Regular security audits
- Secure API authentication

## 📈 Scalability

MindGuard AI is designed to support **10 million+ students**:

- Horizontal scaling with load balancers
- Database sharding for large datasets
- CDN for static assets
- Caching layer with Redis
- Microservices architecture
- Auto-scaling infrastructure

## 🏆 MVP Roadmap

### Phase 1: Core Features (Current)
- ✅ Mood tracking system
- ✅ Wellness score calculation
- ✅ Basic journal with sentiment analysis
- ✅ AI coach with basic recommendations
- ✅ Dashboard with charts
- ✅ Gamification basics

### Phase 2: Advanced AI
- ⏳ Advanced burnout prediction
- ⏳ Stress trigger detection
- ⏳ Pattern recognition
- ⏳ Personalized intervention suggestions
- ⏳ Crisis prediction model

### Phase 3: Enhanced Features
- ⏳ Peer support communities
- ⏳ Professional counselor integration
- ⏳ Parent/educator dashboards
- ⏳ Advanced analytics
- ⏳ Custom intervention programs

### Phase 4: Enterprise
- ⏳ School/institution integration
- ⏳ Bulk licensing
- ⏳ Admin dashboards
- ⏳ Custom branding
- ⏳ API access for partners

## 🔮 Future Features

- AI-powered study schedule optimization
- Integration with learning platforms
- Wearable device integration
- Voice journaling
- Multilingual support
- Video counseling integration
- Mindfulness app integration
- Academic performance correlation
- Parent notification system
- School counselor referral system

## 📊 Metrics & KPIs

- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Average wellness score improvement
- Check-in completion rate
- Crisis intervention success rate
- User retention rate
- Satisfaction scores (NPS)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Crisis Helpline**: 988 (US)
- **Crisis Text Line**: Text HOME to 741741
- **International**: [findahelpline.com](https://findahelpline.com)

## 🙏 Acknowledgments

- Google Gemini AI for powering our AI features
- Chart.js for beautiful visualizations
- The open-source community
- Mental health professionals who provided guidance

## 📞 Contact

- **Website**: [mindguard.ai](https://mindguard.ai)
- **Email**: support@mindguard.ai
- **Twitter**: [@MindGuardAI](https://twitter.com/MindGuardAI)

---

**Built with ❤️ for students' mental wellness**

**Remember: Your mental health matters. You are not alone.**
