/**
 * Unit Tests for Wellness Score Calculation
 * Tests the core wellness scoring algorithm
 */

// Mock the DOM environment
global.document = {
    getElementById: jest.fn()
};

// Import the function (will need to be extracted from index.html)
// For now, we'll test the logic directly

describe('Wellness Score Calculator', () => {
    const calculateWellnessScore = (entry) => {
        const moodWeight = 0.40;
        const sleepWeight = 0.20;
        const energyWeight = 0.15;
        const confidenceWeight = 0.15;
        const stressWeight = 0.10;

        const stressInverse = 100 - entry.stress;
        
        const score = 
            (entry.moodScore * moodWeight) +
            (entry.sleep * sleepWeight) +
            (entry.energy * energyWeight) +
            (entry.confidence * confidenceWeight) +
            (stressInverse * stressWeight);

        return Math.round(score);
    };

    describe('calculateWellnessScore', () => {
        test('should calculate perfect score for perfect metrics', () => {
            const entry = {
                moodScore: 100,
                sleep: 100,
                energy: 100,
                confidence: 100,
                stress: 0
            };
            expect(calculateWellnessScore(entry)).toBe(100);
        });

        test('should calculate zero score for worst metrics', () => {
            const entry = {
                moodScore: 0,
                sleep: 0,
                energy: 0,
                confidence: 0,
                stress: 100
            };
            expect(calculateWellnessScore(entry)).toBe(0);
        });

        test('should weight mood as 40% of total score', () => {
            const entry1 = { moodScore: 100, sleep: 0, energy: 0, confidence: 0, stress: 100 };
            const entry2 = { moodScore: 0, sleep: 0, energy: 0, confidence: 0, stress: 100 };
            const diff = calculateWellnessScore(entry1) - calculateWellnessScore(entry2);
            expect(diff).toBe(40);
        });

        test('should weight sleep as 20% of total score', () => {
            const entry1 = { moodScore: 0, sleep: 100, energy: 0, confidence: 0, stress: 100 };
            const entry2 = { moodScore: 0, sleep: 0, energy: 0, confidence: 0, stress: 100 };
            const diff = calculateWellnessScore(entry1) - calculateWellnessScore(entry2);
            expect(diff).toBe(20);
        });

        test('should weight energy as 15% of total score', () => {
            const entry1 = { moodScore: 0, sleep: 0, energy: 100, confidence: 0, stress: 100 };
            const entry2 = { moodScore: 0, sleep: 0, energy: 0, confidence: 0, stress: 100 };
            const diff = calculateWellnessScore(entry1) - calculateWellnessScore(entry2);
            expect(diff).toBe(15);
        });

        test('should weight confidence as 15% of total score', () => {
            const entry1 = { moodScore: 0, sleep: 0, energy: 0, confidence: 100, stress: 100 };
            const entry2 = { moodScore: 0, sleep: 0, energy: 0, confidence: 0, stress: 100 };
            const diff = calculateWellnessScore(entry1) - calculateWellnessScore(entry2);
            expect(diff).toBe(15);
        });

        test('should weight stress inverse as 10% of total score', () => {
            const entry1 = { moodScore: 0, sleep: 0, energy: 0, confidence: 0, stress: 0 };
            const entry2 = { moodScore: 0, sleep: 0, energy: 0, confidence: 0, stress: 100 };
            const diff = calculateWellnessScore(entry1) - calculateWellnessScore(entry2);
            expect(diff).toBe(10);
        });

        test('should calculate realistic score for average metrics', () => {
            const entry = {
                moodScore: 75,
                sleep: 70,
                energy: 65,
                confidence: 70,
                stress: 40
            };
            const score = calculateWellnessScore(entry);
            expect(score).toBeGreaterThan(60);
            expect(score).toBeLessThan(80);
        });

        test('should round score to nearest integer', () => {
            const entry = {
                moodScore: 50,
                sleep: 50,
                energy: 50,
                confidence: 50,
                stress: 50
            };
            const score = calculateWellnessScore(entry);
            expect(Number.isInteger(score)).toBe(true);
        });

        test('should handle edge case with all 50s', () => {
            const entry = {
                moodScore: 50,
                sleep: 50,
                energy: 50,
                confidence: 50,
                stress: 50
            };
            expect(calculateWellnessScore(entry)).toBe(50);
        });
    });
});

describe('Score Category Classification', () => {
    const getScoreCategory = (score) => {
        if (score >= 80) return { label: 'Thriving', class: 'thriving' };
        if (score >= 60) return { label: 'Healthy', class: 'healthy' };
        if (score >= 40) return { label: 'Needs Attention', class: 'attention' };
        if (score >= 20) return { label: 'High Risk', class: 'high-risk' };
        return { label: 'Critical', class: 'critical' };
    };

    test('should classify 80+ as Thriving', () => {
        expect(getScoreCategory(80).label).toBe('Thriving');
        expect(getScoreCategory(90).label).toBe('Thriving');
        expect(getScoreCategory(100).label).toBe('Thriving');
    });

    test('should classify 60-79 as Healthy', () => {
        expect(getScoreCategory(60).label).toBe('Healthy');
        expect(getScoreCategory(70).label).toBe('Healthy');
        expect(getScoreCategory(79).label).toBe('Healthy');
    });

    test('should classify 40-59 as Needs Attention', () => {
        expect(getScoreCategory(40).label).toBe('Needs Attention');
        expect(getScoreCategory(50).label).toBe('Needs Attention');
        expect(getScoreCategory(59).label).toBe('Needs Attention');
    });

    test('should classify 20-39 as High Risk', () => {
        expect(getScoreCategory(20).label).toBe('High Risk');
        expect(getScoreCategory(30).label).toBe('High Risk');
        expect(getScoreCategory(39).label).toBe('High Risk');
    });

    test('should classify 0-19 as Critical', () => {
        expect(getScoreCategory(0).label).toBe('Critical');
        expect(getScoreCategory(10).label).toBe('Critical');
        expect(getScoreCategory(19).label).toBe('Critical');
    });

    test('should return correct CSS class for each category', () => {
        expect(getScoreCategory(85).class).toBe('thriving');
        expect(getScoreCategory(65).class).toBe('healthy');
        expect(getScoreCategory(45).class).toBe('attention');
        expect(getScoreCategory(25).class).toBe('high-risk');
        expect(getScoreCategory(10).class).toBe('critical');
    });
});
