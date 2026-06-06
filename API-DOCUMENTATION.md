# MindGuard AI - API Documentation

## Base URL
```
Production: https://api.mindguard.ai/v1
Development: http://localhost:3000/api/v1
```

## Authentication
All endpoints (except auth endpoints) require authentication via Bearer token in the Authorization header.

```
Authorization: Bearer {token}
```

## Response Format
All responses follow this structure:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "errors": []
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "exam_type": "JEE",
  "exam_date": "2024-05-20"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "name": "John Doe",
      "exam_type": "JEE",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "token": "jwt_token_here"
  },
  "message": "User registered successfully"
}
```

### Login User
**POST** `/auth/login`

Authenticate user with email/password.

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}
```

### Google OAuth
**POST** `/auth/google`

Authenticate or register user via Google OAuth.

**Request Body:**
```json
{
  "id_token": "google_id_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@gmail.com",
      "name": "John Doe",
      "avatar_url": "https://..."
    },
    "token": "jwt_token_here"
  },
  "message": "Google authentication successful"
}
```

### Get Current User
**GET** `/auth/me`

Get current authenticated user details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "student@example.com",
    "name": "John Doe",
    "exam_type": "JEE",
    "exam_date": "2024-05-20",
    "avatar_url": "https://...",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Logout
**POST** `/auth/logout`

Logout current user and invalidate token.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Mood Tracking Endpoints

### Submit Mood Check-in
**POST** `/mood/checkin`

Submit daily mood check-in.

**Request Body:**
```json
{
  "mood": "happy",
  "sleep_quality": 75,
  "energy_level": 80,
  "confidence_level": 70,
  "stress_level": 40,
  "study_productivity": 65,
  "notes": "Had a good study session today"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "mood": "happy",
    "mood_score": 90,
    "wellness_score": 78,
    "created_at": "2024-01-01T00:00:00Z",
    "xp_earned": 10
  },
  "message": "Check-in submitted successfully"
}
```

### Get Mood History
**GET** `/mood/history`

Get user's mood check-in history.

**Query Parameters:**
- `limit` (optional): Number of entries to return (default: 30)
- `offset` (optional): Offset for pagination (default: 0)
- `start_date` (optional): Filter by start date (ISO format)
- `end_date` (optional): Filter by end date (ISO format)

**Response:**
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "id": "uuid",
        "mood": "happy",
        "mood_score": 90,
        "wellness_score": 78,
        "sleep_quality": 75,
        "energy_level": 80,
        "confidence_level": 70,
        "stress_level": 40,
        "study_productivity": 65,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 45,
    "limit": 30,
    "offset": 0
  }
}
```

### Get Mood Trends
**GET** `/mood/trends`

Get mood trends and analytics.

**Query Parameters:**
- `period` (optional): Time period - 7d, 30d, 90d (default: 30d)

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "30d",
    "average_mood_score": 72.5,
    "average_wellness_score": 68.3,
    "average_stress_level": 45.2,
    "average_sleep_quality": 70.1,
    "trend": "improving",
    "daily_data": [
      {
        "date": "2024-01-01",
        "mood_score": 75,
        "wellness_score": 70
      }
    ]
  }
}
```

### Get Latest Mood Entry
**GET** `/mood/latest`

Get the most recent mood check-in.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "mood": "happy",
    "mood_score": 90,
    "wellness_score": 78,
    "sleep_quality": 75,
    "energy_level": 80,
    "confidence_level": 70,
    "stress_level": 40,
    "study_productivity": 65,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## Wellness Score Endpoints

### Get Current Wellness Score
**GET** `/wellness/score`

Get current mental wellness score and category.

**Response:**
```json
{
  "success": true,
  "data": {
    "wellness_score": 78,
    "category": "Healthy",
    "category_color": "#10b981",
    "components": {
      "mood": 90,
      "sleep": 75,
      "energy": 80,
      "confidence": 70,
      "stress": 40
    },
    "last_updated": "2024-01-01T00:00:00Z"
  }
}
```

### Get Wellness History
**GET** `/wellness/history`

Get wellness score history.

**Query Parameters:**
- `limit` (optional): Number of entries (default: 30)
- `start_date` (optional): Filter start date
- `end_date` (optional): Filter end date

**Response:**
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "date": "2024-01-01",
        "wellness_score": 78,
        "category": "Healthy"
      }
    ]
  }
}
```

### Get AI Predictions
**GET** `/wellness/predictions`

Get AI-powered predictions for mental health.

**Response:**
```json
{
  "success": true,
  "data": {
    "burnout_risk": 25,
    "anxiety_risk": 30,
    "emotional_stability": 72,
    "motivation_score": 68,
    "predictions": [
      {
        "type": "burnout",
        "risk_level": "medium",
        "probability": 0.25,
        "timeframe": "2 weeks",
        "factors": ["high stress", "low sleep"]
      }
    ],
    "recommendations": [
      "Improve sleep schedule",
      "Reduce study load",
      "Practice stress management"
    ]
  }
}
```

---

## Journal Endpoints

### Create Journal Entry
**POST** `/journal/entry`

Create a new journal entry.

**Request Body:**
```json
{
  "text": "Today was challenging but I managed to complete my study goals. Feeling proud of my progress.",
  "is_private": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "text": "Today was challenging but I managed to complete my study goals...",
    "sentiment": "positive",
    "sentiment_score": 0.75,
    "key_emotions": ["pride", "determination", "satisfaction"],
    "ai_analysis": "The entry shows resilience and positive self-reflection...",
    "created_at": "2024-01-01T00:00:00Z",
    "xp_earned": 5
  },
  "message": "Journal entry created successfully"
}
```

### Get Journal Entries
**GET** `/journal/entries`

Get user's journal entries.

**Query Parameters:**
- `limit` (optional): Number of entries (default: 20)
- `offset` (optional): Pagination offset
- `sentiment` (optional): Filter by sentiment (positive, neutral, negative)

**Response:**
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "id": "uuid",
        "text": "Today was challenging...",
        "sentiment": "positive",
        "sentiment_score": 0.75,
        "key_emotions": ["pride", "determination"],
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 25,
    "limit": 20,
    "offset": 0
  }
}
```

### Get AI Analysis
**GET** `/journal/analysis`

Get AI analysis of journal entries.

**Query Parameters:**
- `period` (optional): Time period - 7d, 30d, 90d (default: 30d)

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "30d",
    "total_entries": 25,
    "sentiment_distribution": {
      "positive": 15,
      "neutral": 8,
      "negative": 2
    },
    "common_themes": ["study_progress", "anxiety", "motivation"],
    "emotional_trends": "improving",
    "recurring_patterns": [
      "Stress increases before mock tests",
      "Mood improves after exercise"
    ],
    "recommendations": [
      "Continue journaling regularly",
      "Focus on positive achievements"
    ]
  }
}
```

### Get Weekly Summary
**GET** `/journal/summary`

Get weekly journal summary.

**Response:**
```json
{
  "success": true,
  "data": {
    "week_start": "2024-01-01",
    "week_end": "2024-01-07",
    "entries_count": 7,
    "average_sentiment": "positive",
    "key_insights": [
      "Overall positive emotional state",
      "Managing stress well",
      "Good study-life balance"
    ],
    "growth_areas": [
      "Could benefit from more relaxation",
      "Consider meditation practice"
    ]
  }
}
```

---

## Coach Endpoints

### Get Personalized Advice
**GET** `/coach/advice`

Get AI-powered personalized advice.

**Query Parameters:**
- `focus` (optional): Focus area - stress, sleep, motivation, general (default: general)

**Response:**
```json
{
  "success": true,
  "data": {
    "advice": "Based on your recent check-ins, I notice your stress levels have been slightly elevated...",
    "recommendations": [
      "Try the 5-4-3-2-1 grounding technique",
      "Schedule short breaks every hour",
      "Practice deep breathing exercises"
    ],
    "exercises": [
      {
        "name": "Box Breathing",
        "duration": "5 minutes",
        "instructions": "Inhale for 4 counts, hold for 4, exhale for 4, hold for 4"
      }
    ],
    "resources": [
      {
        "type": "meditation",
        "title": "Stress Relief Meditation",
        "url": "https://..."
      }
    ]
  }
}
```

### Get Recommended Exercises
**GET** `/coach/exercises`

Get recommended wellness exercises.

**Query Parameters:**
- `type` (optional): Exercise type - breathing, meditation, stretching, grounding (default: all)

**Response:**
```json
{
  "success": true,
  "data": {
    "exercises": [
      {
        "id": "uuid",
        "name": "Box Breathing",
        "type": "breathing",
        "duration": "5 minutes",
        "difficulty": "beginner",
        "instructions": "Inhale for 4 counts, hold for 4, exhale for 4, hold for 4",
        "benefits": ["Reduces anxiety", "Improves focus", "Lowers stress"]
      },
      {
        "id": "uuid",
        "name": "5-4-3-2-1 Grounding",
        "type": "grounding",
        "duration": "3 minutes",
        "difficulty": "beginner",
        "instructions": "Name 5 things you see, 4 you hear, 3 you smell, 2 you touch, 1 you taste",
        "benefits": ["Reduces panic", "Increases awareness", "Calms mind"]
      }
    ]
  }
}
```

### Submit Coach Feedback
**POST** `/coach/feedback`

Submit feedback on coach recommendations.

**Request Body:**
```json
{
  "interaction_id": "uuid",
  "rating": 5,
  "is_helpful": true,
  "comments": "Very helpful advice"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback submitted successfully"
}
```

---

## Insights Endpoints

### Get Pattern Analysis
**GET** `/insights/patterns`

Get AI-generated pattern analysis.

**Query Parameters:**
- `period` (optional): Time period (default: 30d)

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "30d",
    "patterns": [
      {
        "type": "stress_pattern",
        "description": "Stress increases by 35% before mock tests",
        "confidence": 0.85,
        "frequency": "weekly",
        "impact": "high"
      },
      {
        "type": "sleep_pattern",
        "description": "Sleep quality drops during exam weeks",
        "confidence": 0.78,
        "frequency": "monthly",
        "impact": "medium"
      }
    ],
    "recommendations": [
      "Schedule lighter study load before mock tests",
      "Maintain consistent sleep schedule during exam periods"
    ]
  }
}
```

### Get Stress Triggers
**GET** `/insights/triggers`

Get identified stress triggers.

**Response:**
```json
{
  "success": true,
  "data": {
    "triggers": [
      {
        "name": "Mock Test Anxiety",
        "category": "academic",
        "severity": "high",
        "frequency": 8,
        "last_detected": "2024-01-01T00:00:00Z",
        "mitigation_strategies": [
          "Practice relaxation techniques before tests",
          "Focus on effort rather than results"
        ]
      },
      {
        "name": "Parental Pressure",
        "category": "personal",
        "severity": "medium",
        "frequency": 3,
        "last_detected": "2024-01-01T00:00:00Z",
        "mitigation_strategies": [
          "Communicate boundaries with parents",
          "Focus on personal goals"
        ]
      }
    ]
  }
}
```

### Get Wellness Reports
**GET** `/insights/reports`

Get wellness reports.

**Query Parameters:**
- `type` (optional): Report type - weekly, monthly (default: weekly)
- `limit` (optional): Number of reports (default: 5)

**Response:**
```json
{
  "success": true,
  "data": {
    "reports": [
      {
        "id": "uuid",
        "type": "weekly",
        "period_start": "2024-01-01",
        "period_end": "2024-01-07",
        "average_wellness_score": 72.5,
        "average_mood_score": 75.2,
        "average_stress_level": 42.3,
        "burnout_risk": 20,
        "key_insights": [
          "Consistent check-in habits",
          "Managing stress effectively"
        ],
        "recommendations": [
          "Continue current routine",
          "Consider adding meditation"
        ],
        "created_at": "2024-01-08T00:00:00Z"
      }
    ]
  }
}
```

---

## Gamification Endpoints

### Get User Stats
**GET** `/gamification/stats`

Get user gamification statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "current_streak": 15,
    "longest_streak": 30,
    "total_xp": 1250,
    "level": 13,
    "total_checkins": 45,
    "total_journal_entries": 32,
    "xp_to_next_level": 50,
    "progress_percentage": 50
  }
}
```

### Get Achievements
**GET** `/gamification/badges`

Get user's earned badges.

**Response:**
```json
{
  "success": true,
  "data": {
    "badges": [
      {
        "id": "uuid",
        "name": "First Check-in",
        "icon": "🌟",
        "description": "Completed your first mood check-in",
        "category": "wellness",
        "xp_reward": 10,
        "earned_at": "2024-01-01T00:00:00Z"
      },
      {
        "id": "uuid",
        "name": "7-Day Streak",
        "icon": "🔥",
        "description": "Maintained a 7-day check-in streak",
        "category": "streak",
        "xp_reward": 50,
        "earned_at": "2024-01-07T00:00:00Z"
      }
    ],
    "total_badges": 8,
    "total_categories": 4
  }
}
```

### Award XP
**POST** `/gamification/xp`

Award XP to user (admin only).

**Request Body:**
```json
{
  "user_id": "uuid",
  "xp_amount": 50,
  "reason": "Completed meditation challenge"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "xp_awarded": 50,
    "total_xp": 1300,
    "level_up": false
  },
  "message": "XP awarded successfully"
}
```

---

## Emergency Endpoints

### Report Crisis
**POST** `/emergency/report`

Report a crisis situation.

**Request Body:**
```json
{
  "wellness_score": 15,
  "trigger_reason": "Overwhelming anxiety before exam",
  "needs_immediate_support": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "crisis_id": "uuid",
    "status": "active",
    "resources": [
      {
        "type": "hotline",
        "name": "Crisis Helpline",
        "number": "988",
        "available": "24/7"
      },
      {
        "type": "exercise",
        "name": "Emergency Breathing",
        "instructions": "Follow the breathing exercise guide"
      }
    ],
    "follow_up_scheduled": true,
    "follow_up_date": "2024-01-02T10:00:00Z"
  },
  "message": "Crisis support activated"
}
```

### Get Emergency Resources
**GET** `/emergency/resources`

Get emergency support resources.

**Response:**
```json
{
  "success": true,
  "data": {
    "hotlines": [
      {
        "name": "National Crisis Helpline",
        "number": "988",
        "available": "24/7",
        "country": "US"
      },
      {
        "name": "Crisis Text Line",
        "number": "Text HOME to 741741",
        "available": "24/7",
        "country": "US"
      }
    ],
    "exercises": [
      {
        "name": "5-4-3-2-1 Grounding",
        "duration": "3 minutes",
        "instructions": "..."
      },
      {
        "name": "Box Breathing",
        "duration": "5 minutes",
        "instructions": "..."
      }
    ],
    "local_resources": [
      {
        "name": "School Counselor",
        "contact": "counselor@school.edu",
        "availability": "Mon-Fri 9am-5pm"
      }
    ]
  }
}
```

---

## Notifications Endpoints

### Get Notifications
**GET** `/notifications`

Get user notifications.

**Query Parameters:**
- `limit` (optional): Number of notifications (default: 20)
- `unread_only` (optional): Filter unread only (default: false)

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "achievement",
        "title": "New Badge Earned!",
        "message": "You earned the 7-Day Streak badge",
        "action_url": "/achievements",
        "is_read": false,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "unread_count": 3
  }
}
```

### Mark Notification as Read
**PUT** `/notifications/{id}/read`

Mark a notification as read.

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### Mark All as Read
**PUT** `/notifications/read-all`

Mark all notifications as read.

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## User Profile Endpoints

### Update Profile
**PUT** `/user/profile`

Update user profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "exam_type": "JEE",
  "exam_date": "2024-05-20",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "student@example.com",
    "name": "John Doe",
    "exam_type": "JEE",
    "exam_date": "2024-05-20",
    "phone": "+1234567890"
  },
  "message": "Profile updated successfully"
}
```

### Change Password
**PUT** `/user/password`

Change user password.

**Request Body:**
```json
{
  "current_password": "oldPassword123",
  "new_password": "newPassword456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Delete Account
**DELETE** `/user/account`

Delete user account and all associated data.

**Request Body:**
```json
{
  "password": "confirmPassword123",
  "confirmation": "I understand this action cannot be undone"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

### Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

---

## Rate Limiting

- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200
```

---

## Webhooks

### Webhook Events
- `user.created` - New user registered
- `checkin.completed` - Mood check-in submitted
- `crisis.detected` - Crisis situation detected
- `achievement.earned` - Achievement unlocked
- `wellness.alert` - Wellness score below threshold

### Webhook Configuration
Contact support to configure webhooks for your integration.

---

## SDKs

Official SDKs available for:
- JavaScript/TypeScript
- Python
- Java
- Go

See SDK documentation for implementation details.
