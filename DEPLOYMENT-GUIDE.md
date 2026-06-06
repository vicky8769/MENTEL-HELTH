# MindGuard AI - Deployment Guide

## Quick Start: Deploy Standalone HTML Version

### Option 1: Local Deployment (Immediate)
The standalone HTML version is already deployed locally. Open `index.html` in your browser to use it immediately.

### Option 2: Deploy to Netlify (Free, 2 minutes)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `mindguard-ai` folder
3. Your site will be live in seconds!

### Option 3: Deploy to Vercel (Free, 2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login
3. Click "New Project"
4. Drag and drop the `mindguard-ai` folder
5. Click "Deploy"

### Option 4: Deploy to GitHub Pages (Free, 5 minutes)

1. Create a GitHub repository
2. Push the `mindguard-ai` folder
3. Go to repository Settings > Pages
4. Select `main` branch as source
5. Your site will be at `https://yourusername.github.io/mindguard-ai`

---

## Full Next.js Deployment (Requires Node.js)

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Supabase, Railway, or local)
- Google Gemini API key
- Google OAuth credentials (optional)

### Step 1: Install Node.js
Download and install from [nodejs.org](https://nodejs.org/)

### Step 2: Install Dependencies
```bash
cd mindguard-ai
npm install
```

### Step 3: Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
DATABASE_URL=your_postgresql_url
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000
```

### Step 4: Set Up Database
```bash
# Using Supabase (recommended)
# 1. Create account at supabase.com
# 2. Create new project
# 3. Get database URL from Settings > Database
# 4. Run schema in SQL Editor

# Using Railway
# 1. Create account at railway.app
# 2. Create PostgreSQL database
# 3. Get connection string
# 4. Run schema file
```

### Step 5: Run Database Migrations
```bash
npx prisma migrate dev
```

### Step 6: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Production Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to project Settings > Environment Variables
   - Add all variables from `.env`

5. **Deploy to Production**
```bash
vercel --prod
```

### Deploy to Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Login**
```bash
railway login
```

3. **Initialize**
```bash
railway init
```

4. **Add PostgreSQL**
```bash
railway add postgresql
```

5. **Deploy**
```bash
railway up
```

### Deploy to Render

1. Create account at [render.com](https://render.com)
2. Create new "Web Service"
3. Connect your GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. Add environment variables
6. Deploy

---

## Docker Deployment

### Build and Run Locally
```bash
docker-compose up -d
```

Access at [http://localhost:3000](http://localhost:3000)

### Deploy to Docker Hub
```bash
docker build -t mindguard-ai .
docker tag mindguard-ai yourusername/mindguard-ai
docker push yourusername/mindguard-ai
```

---

## Database Setup

### Supabase (Recommended - Free Tier)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Copy contents of `database-schema.sql`
5. Paste and run
6. Get connection string from Settings > Database

### Railway (Free Tier Available)

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Get connection string
5. Run schema in SQL editor

### Local PostgreSQL

```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb mindguard

# Run schema
psql mindguard < database-schema.sql
```

---

## Getting API Keys

### Google Gemini API

1. Go to [makersuite.google.com](https://makersuite.google.com)
2. Create API key
3. Add to `.env` as `GEMINI_API_KEY`

### Google OAuth

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins and redirect URIs
6. Add to `.env` as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

---

## Environment Variables Reference

See `.env.example` for all required variables.

Critical variables:
- `DATABASE_URL` - PostgreSQL connection string
- `GEMINI_API_KEY` - Google Gemini API key
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL

---

## Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database is running
- Ensure firewall allows connection

### API Errors
- Verify API keys are correct
- Check API quota limits
- Review API documentation

---

## Monitoring

### Vercel Analytics
- Automatically enabled on Vercel
- View in project dashboard

### Custom Monitoring
Add Sentry for error tracking:
```bash
npm install @sentry/nextjs
```

---

## Security Checklist

- [ ] Change all default secrets
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Enable database backups
- [ ] Review security headers
- [ ] Set up monitoring alerts
- [ ] Enable audit logging

---

## Cost Estimates

### Standalone HTML Version
- **Free** on Netlify/Vercel/GitHub Pages

### Full Next.js Version
- **Vercel**: Free tier available
- **Database**: Free tier on Supabase (500MB)
- **AI API**: Free tier on Gemini (varies by usage)
- **Total**: $0-20/month for small scale

### Production Scale (10M users)
- **Vercel Pro**: ~$2,000/month
- **Database**: ~$5,000/month
- **AI API**: ~$10,000/month
- **Total**: ~$19,000/month

---

## Support

For deployment issues:
- Check logs in platform dashboard
- Review error messages
- Consult platform documentation
- Contact support if needed
