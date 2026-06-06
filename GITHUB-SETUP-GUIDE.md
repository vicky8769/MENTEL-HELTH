# MindGuard AI - GitHub Setup Guide

Git is not installed on your system. Follow these steps to install Git and push to GitHub.

## Step 1: Install Git

### Windows
1. Download Git from [git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer with default settings
3. Restart your terminal/command prompt

### Verify Installation
```bash
git --version
```

## Step 2: Create GitHub Account

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Create your account
4. Verify your email

## Step 3: Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## Step 4: Initialize Repository

```bash
cd C:\Users\Admin\CascadeProjects\mindguard-ai
git init
```

## Step 5: Add Files to Git

```bash
git add .
```

## Step 6: Create Initial Commit

```bash
git commit -m "Initial commit: MindGuard AI - Mental Wellness Platform for Students"
```

## Step 7: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `mindguard-ai`
3. Description: `AI-powered mental wellness platform for students preparing for high-pressure exams`
4. Make it **Public** (recommended for visibility)
5. **Do NOT** initialize with README (we have one)
6. Click "Create repository"

## Step 8: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/mindguard-ai.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Alternative: Use GitHub Desktop (GUI)

If you prefer a graphical interface:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in
3. File > Add Local Repository
4. Select `C:\Users\Admin\CascadeProjects\mindguard-ai`
5. Click "Publish repository"
6. Enter repository name: `mindguard-ai`
7. Click "Publish"

## Quick Commands Summary

```bash
# Navigate to project
cd C:\Users\Admin\CascadeProjects\mindguard-ai

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: MindGuard AI - Mental Wellness Platform"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mindguard-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## After Pushing

Once pushed, your repository will be at:
```
https://github.com/YOUR_USERNAME/mindguard-ai
```

## Enable GitHub Pages (Optional)

To deploy the HTML version via GitHub Pages:

1. Go to your repository on GitHub
2. Click Settings > Pages
3. Source: Deploy from a branch
4. Branch: `main`
5. Folder: `/ (root)`
6. Click Save

Your site will be live at:
```
https://YOUR_USERNAME.github.io/mindguard-ai
```

## Troubleshooting

### "fatal: not a git repository"
- Make sure you're in the mindguard-ai directory
- Run `git init` first

### "Authentication failed"
- Create a Personal Access Token on GitHub
- Settings > Developer settings > Personal access tokens
- Use token instead of password when prompted

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/mindguard-ai.git
```

### "nothing to commit"
- Files may already be committed
- Check with `git status`

## Next Steps After GitHub Push

1. **Add collaborators** (Settings > Collaborators)
2. **Enable Issues** for bug tracking
3. **Enable Discussions** for community
4. **Add Topics** (tags like mental-health, ai, wellness)
5. **Set up GitHub Actions** (CI/CD already configured)
6. **Add a README badge** for build status
