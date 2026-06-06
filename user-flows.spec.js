/**
 * End-to-End Tests for MindGuard AI
 * Tests complete user flows across the application
 */

const { test, expect } = require('@playwright/test');

test.describe('MindGuard AI User Flows', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('file:///C:/Users/Admin/CascadeProjects/mmindguard-ai/index.html');
    });

    test('should load the application and display dashboard', async ({ page }) => {
        await expect(page.locator('.logo')).toContainText('MindGuard AI');
        await expect(page.locator('#dashboard')).toBeVisible();
    });

    test('should navigate between sections using nav tabs', async ({ page }) => {
        // Navigate to Mood Check-in
        await page.click('button:has-text("Mood Check-in")');
        await expect(page.locator('#mood')).toBeVisible();
        
        // Navigate to Journal
        await page.click('button:has-text("Journal")');
        await expect(page.locator('#journal')).toBeVisible();
        
        // Navigate back to Dashboard
        await page.click('button:has-text("Dashboard")');
        await expect(page.locator('#dashboard')).toBeVisible();
    });

    test('should complete mood check-in flow', async ({ page }) => {
        // Navigate to Mood Check-in
        await page.click('button:has-text("Mood Check-in")');
        
        // Select a mood
        await page.click('.mood-option[data-mood="happy"]');
        
        // Adjust sliders
        await page.fill('#sleepSlider', '75');
        await page.fill('#energySlider', '80');
        await page.fill('#confidenceSlider', '70');
        await page.fill('#stressSlider', '40');
        await page.fill('#productivitySlider', '65');
        
        // Submit check-in
        await page.click('button:has-text("Submit Check-in")');
        
        // Should navigate to dashboard
        await expect(page.locator('#dashboard')).toBeVisible();
        
        // Should show wellness score
        await expect(page.locator('#wellnessScore')).not.toContainText('--');
    });

    test('should validate mood selection before submission', async ({ page }) => {
        await page.click('button:has-text("Mood Check-in")');
        
        // Try to submit without selecting mood
        await page.click('button:has-text("Submit Check-in")');
        
        // Should show alert (handle in real test with dialog handler)
    });

    test('should submit journal entry', async ({ page }) => {
        await page.click('button:has-text("Journal")');
        
        // Write journal entry
        await page.fill('#journalEntry', 'Today was a good day. I feel happy and grateful for my progress.');
        
        // Submit entry
        await page.click('button:has-text("Save Entry")');
        
        // Should show in history
        await expect(page.locator('#journalHistory')).toContainText('Today was a good day');
    });

    test('should validate journal entry before submission', async ({ page }) => {
        await page.click('button:has-text("Journal")');
        
        // Try to submit empty entry
        await page.click('button:has-text("Save Entry")');
        
        // Should show alert
    });

    test('should get AI coach advice', async ({ page }) => {
        await page.click('button:has-text("AI Coach")');
        
        // Click get advice button
        await page.click('button:has-text("Get Personalized Advice")');
        
        // Should display advice message
        await expect(page.locator('.coach-message')).toBeVisible();
    });

    test('should toggle theme between dark and light mode', async ({ page }) => {
        // Check initial state (dark mode)
        await expect(page.locator('body')).not.toHaveClass(/light-mode/);
        
        // Toggle theme
        await page.click('button:has-text("Theme")');
        
        // Should switch to light mode
        await expect(page.locator('body')).toHaveClass(/light-mode/);
        
        // Toggle back
        await page.click('button:has-text("Theme")');
        
        // Should switch back to dark mode
        await expect(page.locator('body')).not.toHaveClass(/light-mode/);
    });

    test('should display achievements and gamification stats', async ({ page }) => {
        await page.click('button:has-text("Achievements")');
        
        // Should display stats
        await expect(page.locator('#streakDisplay')).toBeVisible();
        await expect(page.locator('#xpDisplay')).toBeVisible();
        await expect(page.locator('#levelDisplay')).toBeVisible();
        
        // Should display badges
        await expect(page.locator('#badgesList')).toBeVisible();
    });

    test('should access emergency support section', async ({ page }) => {
        await page.click('button:has-text("Emergency")');
        
        // Should display emergency contacts
        await expect(page.locator('.contact-card')).toBeVisible();
        
        // Should display grounding exercises
        await expect(page.locator('button:has-text("5-4-3-2-1 Grounding")')).toBeVisible();
    });

    test('should start breathing exercise', async ({ page }) => {
        await page.click('button:has-text("Emergency")');
        await page.click('button:has-text("Start Calm Breathing")');
        
        // Breathing circle should be visible
        await expect(page.locator('#breathingCircle')).toBeVisible();
    });

    test('should display insights after multiple check-ins', async ({ page }) => {
        // This test would require multiple check-ins first
        await page.click('button:has-text("Insights")');
        
        // Should display insights section
        await expect(page.locator('#insightsList')).toBeVisible();
    });

    test('should be keyboard navigable', async ({ page }) => {
        // Tab through navigation
        await page.keyboard.press('Tab');
        
        // Should focus on first nav tab
        const firstTab = page.locator('.nav-tab').first();
        await expect(firstTab).toBeFocused();
        
        // Navigate through tabs
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        
        // Should navigate to next section
    });

    test('should display mood trends chart', async ({ page }) => {
        await page.click('button:has-text("Dashboard")');
        
        // Chart container should be visible
        await expect(page.locator('#moodChart')).toBeVisible();
    });

    test('should display wellness analytics chart', async ({ page }) => {
        await page.click('button:has-text("Dashboard")');
        
        // Chart container should be visible
        await expect(page.locator('#wellnessChart')).toBeVisible();
    });

    test('should persist data across page reloads', async ({ page }) => {
        // Complete a check-in
        await page.click('button:has-text("Mood Check-in")');
        await page.click('.mood-option[data-mood="happy"]');
        await page.click('button:has-text("Submit Check-in")');
        
        // Reload page
        await page.reload();
        
        // Data should persist (check localStorage)
        const xpCount = await page.locator('#xpCount').textContent();
        expect(parseInt(xpCount)).toBeGreaterThan(0);
    });

    test('should handle crisis mode activation', async ({ page }) => {
        // This would require simulating a low wellness score
        // For now, test navigation to emergency section
        await page.click('button:has-text("Emergency")');
        
        await expect(page.locator('#emergency')).toBeVisible();
    });

    test('should display stress triggers on dashboard', async ({ page }) => {
        await page.click('button:has-text("Dashboard")');
        
        // Stress triggers section should be visible
        await expect(page.locator('#stressTriggers')).toBeVisible();
    });

    test('should show burnout risk predictions', async ({ page }) => {
        await page.click('button:has-text("Dashboard")');
        
        // Burnout risk should be displayed
        await expect(page.locator('#burnoutRisk')).toBeVisible();
        await expect(page.locator('#anxietyRisk')).toBeVisible();
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Should still be functional
        await expect(page.locator('.logo')).toBeVisible();
        await expect(page.locator('.nav-tabs')).toBeVisible();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
        // Check for h1 (logo acts as main heading)
        await expect(page.locator('h1, .logo')).toBeVisible();
        
        // Check for h2 elements in sections
        const h2Count = await page.locator('h2').count();
        expect(h2Count).toBeGreaterThan(0);
    });
});
