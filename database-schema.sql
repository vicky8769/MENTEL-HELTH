-- MindGuard AI Database Schema
-- PostgreSQL Schema for Mental Wellness Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    google_id VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    exam_type VARCHAR(50), -- NEET, JEE, CUET, CAT, GATE, UPSC, SSC, BOARD
    exam_date DATE,
    phone VARCHAR(20),
    date_of_birth DATE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);

-- ============================================
-- USER STATS TABLE
-- ============================================
CREATE TABLE user_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    total_checkins INTEGER DEFAULT 0,
    total_journal_entries INTEGER DEFAULT 0,
    last_checkin_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- MOOD ENTRIES TABLE
-- ============================================
CREATE TABLE mood_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mood VARCHAR(50) NOT NULL, -- excellent, happy, good, calm, neutral, slightly-stressed, stressed, sad, anxious, burned-out, depressed, severe-distress
    mood_score INTEGER NOT NULL CHECK (mood_score BETWEEN 0 AND 100),
    sleep_quality INTEGER NOT NULL CHECK (sleep_quality BETWEEN 0 AND 100),
    energy_level INTEGER NOT NULL CHECK (energy_level BETWEEN 0 AND 100),
    confidence_level INTEGER NOT NULL CHECK (confidence_level BETWEEN 0 AND 100),
    stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 0 AND 100),
    study_productivity INTEGER NOT NULL CHECK (study_productivity BETWEEN 0 AND 100),
    wellness_score INTEGER NOT NULL CHECK (wellness_score BETWEEN 0 AND 100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for mood analytics
CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_created_at ON mood_entries(created_at DESC);
CREATE INDEX idx_mood_entries_user_date ON mood_entries(user_id, created_at DESC);

-- ============================================
-- JOURNAL ENTRIES TABLE
-- ============================================
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    sentiment VARCHAR(20) NOT NULL, -- positive, neutral, negative
    sentiment_score DECIMAL(5,2) CHECK (sentiment_score BETWEEN 0 AND 1),
    ai_analysis TEXT,
    key_emotions JSONB, -- Array of detected emotions
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for journal analytics
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_created_at ON journal_entries(created_at DESC);
CREATE INDEX idx_journal_entries_sentiment ON journal_entries(sentiment);

-- ============================================
-- ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_name VARCHAR(100) NOT NULL,
    badge_icon VARCHAR(50),
    badge_description TEXT,
    badge_category VARCHAR(50), -- streak, wellness, journal, social
    xp_reward INTEGER DEFAULT 0,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for user achievements
CREATE INDEX idx_achievements_user_id ON achievements(user_id);
CREATE INDEX idx_achievements_category ON achievements(badge_category);

-- ============================================
-- STRESS TRIGGERS TABLE
-- ============================================
CREATE TABLE stress_triggers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    trigger_name VARCHAR(100) NOT NULL, -- mock-test, parental-pressure, time-management, etc.
    trigger_category VARCHAR(50), -- academic, personal, social, health
    severity VARCHAR(20), -- low, medium, high
    frequency INTEGER DEFAULT 1,
    last_detected TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for trigger analysis
CREATE INDEX idx_stress_triggers_user_id ON stress_triggers(user_id);
CREATE INDEX idx_stress_triggers_severity ON stress_triggers(severity);

-- ============================================
-- AI INSIGHTS TABLE
-- ============================================
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    insight_type VARCHAR(50) NOT NULL, -- pattern, prediction, recommendation, warning
    insight_text TEXT NOT NULL,
    confidence_score DECIMAL(5,2),
    related_data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for insights
CREATE INDEX idx_ai_insights_user_id ON ai_insights(user_id);
CREATE INDEX idx_ai_insights_type ON ai_insights(insight_type);
CREATE INDEX idx_ai_insights_created_at ON ai_insights(created_at DESC);

-- ============================================
-- WELLNESS REPORTS TABLE
-- ============================================
CREATE TABLE wellness_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    report_type VARCHAR(20) NOT NULL, -- weekly, monthly
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    average_wellness_score DECIMAL(5,2),
    average_mood_score DECIMAL(5,2),
    average_stress_level DECIMAL(5,2),
    average_sleep_quality DECIMAL(5,2),
    burnout_risk DECIMAL(5,2),
    anxiety_risk DECIMAL(5,2),
    emotional_stability DECIMAL(5,2),
    motivation_score DECIMAL(5,2),
    key_insights JSONB,
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for reports
CREATE INDEX idx_wellness_reports_user_id ON wellness_reports(user_id);
CREATE INDEX idx_wellness_reports_type ON wellness_reports(report_type);
CREATE INDEX idx_wellness_reports_period ON wellness_reports(period_start, period_end);

-- ============================================
-- COACH INTERACTIONS TABLE
-- ============================================
CREATE TABLE coach_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    interaction_type VARCHAR(50) NOT NULL, -- advice, exercise, meditation, breathing
    request_data JSONB,
    response_data JSONB,
    user_feedback INTEGER CHECK (user_feedback BETWEEN 1 AND 5),
    is_helpful BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for coach analytics
CREATE INDEX idx_coach_interactions_user_id ON coach_interactions(user_id);
CREATE INDEX idx_coach_interactions_type ON coach_interactions(interaction_type);

-- ============================================
-- CRISIS LOGS TABLE
-- ============================================
CREATE TABLE crisis_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wellness_score INTEGER NOT NULL,
    trigger_reason TEXT,
    intervention_provided TEXT,
    resolution_status VARCHAR(50), -- resolved, ongoing, escalated
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for crisis monitoring
CREATE INDEX idx_crisis_logs_user_id ON crisis_logs(user_id);
CREATE INDEX idx_crisis_logs_status ON crisis_logs(resolution_status);
CREATE INDEX idx_crisis_logs_created_at ON crisis_logs(created_at DESC);

-- ============================================
-- SESSIONS TABLE (for authentication)
-- ============================================
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for session management
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL, -- reminder, achievement, insight, crisis, tip
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- ANALYTICS EVENTS TABLE
-- ============================================
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL, -- checkin, journal_view, dashboard_view, etc.
    event_data JSONB,
    page_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for analytics
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate wellness score
CREATE OR REPLACE FUNCTION calculate_wellness_score(
    p_mood_score INTEGER,
    p_sleep_quality INTEGER,
    p_energy_level INTEGER,
    p_confidence_level INTEGER,
    p_stress_level INTEGER
)
RETURNS INTEGER AS $$
BEGIN
    RETURN ROUND(
        (p_mood_score * 0.40) +
        (p_sleep_quality * 0.20) +
        (p_energy_level * 0.15) +
        (p_confidence_level * 0.15) +
        ((100 - p_stress_level) * 0.10)
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- View for user wellness summary
CREATE VIEW user_wellness_summary AS
SELECT 
    u.id as user_id,
    u.name,
    u.email,
    us.current_streak,
    us.total_xp,
    us.level,
    us.total_checkins,
    (SELECT wellness_score FROM mood_entries WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as current_wellness_score,
    (SELECT created_at FROM mood_entries WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as last_checkin
FROM users u
LEFT JOIN user_stats us ON u.id = us.user_id;

-- View for recent mood trends
CREATE VIEW recent_mood_trends AS
SELECT 
    user_id,
    DATE(created_at) as date,
    AVG(mood_score) as avg_mood_score,
    AVG(wellness_score) as avg_wellness_score,
    AVG(stress_level) as avg_stress_level,
    AVG(sleep_quality) as avg_sleep_quality
FROM mood_entries
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY user_id, DATE(created_at)
ORDER BY user_id, date DESC;

-- View for achievement progress
CREATE VIEW achievement_progress AS
SELECT 
    u.id as user_id,
    u.name,
    us.total_checkins,
    us.current_streak,
    COUNT(DISTINCT a.badge_name) as badges_earned,
    us.total_xp,
    us.level
FROM users u
LEFT JOIN user_stats us ON u.id = us.user_id
LEFT JOIN achievements a ON u.id = a.user_id
GROUP BY u.id, u.name, us.total_checkins, us.current_streak, us.total_xp, us.level;

-- ============================================
-- SAMPLE DATA (for development)
-- ============================================

-- Insert sample user (password: demo123)
-- Note: In production, use proper password hashing
INSERT INTO users (email, password_hash, name, exam_type, is_verified) VALUES
('demo@mindguard.ai', '$2b$10$sample_hash_for_demo', 'Demo Student', 'JEE', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Insert sample user stats
INSERT INTO user_stats (user_id, current_streak, total_xp, level, total_checkins)
SELECT id, 5, 150, 2, 10 FROM users WHERE email = 'demo@mindguard.ai'
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================

-- Composite indexes for common query patterns
CREATE INDEX idx_mood_user_date_score ON mood_entries(user_id, created_at DESC, wellness_score);
CREATE INDEX idx_journal_user_sentiment_date ON journal_entries(user_id, sentiment, created_at DESC);
CREATE INDEX idx_insights_user_unread ON ai_insights(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- ============================================
-- SECURITY POLICIES (Row Level Security)
-- ============================================

-- Enable RLS on sensitive tables
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE stress_triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellness_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own data
CREATE POLICY user_own_mood_entries ON mood_entries
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY user_own_journal_entries ON journal_entries
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY user_own_user_stats ON user_stats
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY user_own_achievements ON achievements
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY user_own_stress_triggers ON stress_triggers
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY user_own_ai_insights ON ai_insights
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY user_own_wellness_reports ON wellness_reports
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY user_own_coach_interactions ON coach_interactions
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY user_own_crisis_logs ON crisis_logs
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

-- ============================================
-- BACKUP AND MAINTENANCE
-- ============================================

-- Function to clean up old analytics events (older than 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS void AS $$
BEGIN
    DELETE FROM analytics_events 
    WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Function to archive old journal entries (older than 1 year)
CREATE OR REPLACE FUNCTION archive_old_journal_entries()
RETURNS void AS $$
BEGIN
    -- This would move entries to an archive table
    -- Implementation depends on archival strategy
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- END OF SCHEMA
-- ============================================
