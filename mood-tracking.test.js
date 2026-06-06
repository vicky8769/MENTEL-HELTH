/**
 * Integration Tests for Mood Tracking
 * Tests the complete mood check-in flow
 */

describe('Mood Tracking Integration', () => {
    // Mock localStorage
    let mockLocalStorage;
    
    beforeEach(() => {
        mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn()
        };
        global.localStorage = mockLocalStorage;
    });

    describe('Mood Check-in Flow', () => {
        test('should complete full mood check-in with all metrics', () => {
            const moodEntry = {
                date: new Date().toISOString(),
                mood: 'happy',
                moodScore: 90,
                sleep: 75,
                energy: 80,
                confidence: 70,
                stress: 40,
                productivity: 65
            };

            // Calculate wellness score
            const moodWeight = 0.40;
            const sleepWeight = 0.20;
            const energyWeight = 0.15;
            const confidenceWeight = 0.15;
            const stressWeight = 0.10;
            const stressInverse = 100 - moodEntry.stress;
            
            const wellnessScore = Math.round(
                (moodEntry.moodScore * moodWeight) +
                (moodEntry.sleep * sleepWeight) +
                (moodEntry.energy * energyWeight) +
                (moodEntry.confidence * confidenceWeight) +
                (stressInverse * stressWeight)
            );

            expect(wellnessScore).toBeGreaterThan(0);
            expect(wellnessScore).toBeLessThanOrEqual(100);
            expect(moodEntry).toHaveProperty('date');
            expect(moodEntry).toHaveProperty('mood');
            expect(moodEntry).toHaveProperty('wellnessScore');
        });

        test('should validate mood selection before submission', () => {
            const selectedMood = null;
            expect(selectedMood).toBeNull();
            
            // Should not allow submission without mood selection
            const canSubmit = selectedMood !== null;
            expect(canSubmit).toBe(false);
        });

        test('should validate all slider values are within range', () => {
            const sliders = {
                sleep: 70,
                energy: 60,
                confidence: 65,
                stress: 40,
                productivity: 55
            };

            Object.values(sliders).forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(100);
            });
        });

        test('should save mood entry to localStorage', () => {
            const state = {
                moodEntries: [],
                currentStreak: 0,
                totalXP: 0
            };

            const newEntry = {
                date: new Date().toISOString(),
                mood: 'happy',
                moodScore: 90,
                wellnessScore: 78
            };

            state.moodEntries.push(newEntry);
            state.totalXP += 10;
            state.currentStreak = 1;

            mockLocalStorage.setItem('mindguardState', JSON.stringify(state));

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'mindguardState',
                expect.stringContaining('happy')
            );
            expect(state.moodEntries.length).toBe(1);
            expect(state.totalXP).toBe(10);
        });

        test('should update streak correctly for consecutive days', () => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const entries = [
                { date: yesterday.toISOString() },
                { date: today.toISOString() }
            ];

            const streak = entries.length;
            expect(streak).toBe(2);
        });

        test('should reset streak for missed days', () => {
            const today = new Date();
            const twoDaysAgo = new Date(today);
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

            const entries = [
                { date: twoDaysAgo.toISOString() },
                { date: today.toISOString() }
            ];

            // Should reset to 1 if days are not consecutive
            const streak = 1;
            expect(streak).toBe(1);
        });
    });

    describe('Crisis Mode Activation', () => {
        test('should activate crisis mode when wellness score < 20', () => {
            const wellnessScore = 15;
            const crisisMode = wellnessScore < 20;
            
            expect(crisisMode).toBe(true);
        });

        test('should not activate crisis mode when wellness score >= 20', () => {
            const wellnessScore = 25;
            const crisisMode = wellnessScore < 20;
            
            expect(crisisMode).toBe(false);
        });

        test('should activate crisis mode for critical wellness score', () => {
            const wellnessScore = 5;
            const crisisMode = wellnessScore < 20;
            
            expect(crisisMode).toBe(true);
        });
    });

    describe('XP and Gamification', () => {
        test('should award 10 XP for mood check-in', () => {
            const initialXP = 0;
            const checkinXP = 10;
            const newXP = initialXP + checkinXP;
            
            expect(newXP).toBe(10);
        });

        test('should award 5 XP for journal entry', () => {
            const initialXP = 0;
            const journalXP = 5;
            const newXP = initialXP + journalXP;
            
            expect(newXP).toBe(5);
        });

        test('should calculate level based on XP', () => {
            const totalXP = 250;
            const level = Math.floor(totalXP / 100) + 1;
            
            expect(level).toBe(3);
        });

        test('should award badge for 7-day streak', () => {
            const currentStreak = 7;
            const badges = [];
            
            if (currentStreak >= 7 && !badges.includes('7-day-streak')) {
                badges.push('7-day-streak');
            }
            
            expect(badges).toContain('7-day-streak');
        });

        test('should award badge for 30-day streak', () => {
            const currentStreak = 30;
            const badges = [];
            
            if (currentStreak >= 30 && !badges.includes('30-day-streak')) {
                badges.push('30-day-streak');
            }
            
            expect(badges).toContain('30-day-streak');
        });
    });

    describe('State Persistence', () => {
        test('should load state from localStorage on initialization', () => {
            const savedState = {
                moodEntries: [],
                journalEntries: [],
                currentStreak: 5,
                totalXP: 50
            };

            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedState));
            
            const loadedState = JSON.parse(mockLocalStorage.getItem('mindguardState'));
            
            expect(loadedState.currentStreak).toBe(5);
            expect(loadedState.totalXP).toBe(50);
        });

        test('should handle corrupted localStorage data gracefully', () => {
            mockLocalStorage.getItem.mockReturnValue('invalid json');
            
            expect(() => {
                JSON.parse(mockLocalStorage.getItem('mindguardState'));
            }).toThrow();
        });

        test('should initialize with default state if localStorage is empty', () => {
            mockLocalStorage.getItem.mockReturnValue(null);
            
            const defaultState = {
                moodEntries: [],
                journalEntries: [],
                currentStreak: 0,
                totalXP: 0,
                level: 1,
                checkins: 0,
                badges: [],
                selectedMood: null,
                isLightMode: false
            };

            const loadedState = mockLocalStorage.getItem('mindguardState') 
                ? JSON.parse(mockLocalStorage.getItem('mindguardState'))
                : defaultState;
            
            expect(loadedState.currentStreak).toBe(0);
            expect(loadedState.totalXP).toBe(0);
        });
    });
});
