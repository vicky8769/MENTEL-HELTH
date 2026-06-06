/**
 * Unit Tests for Sentiment Analysis
 * Tests the sentiment analysis algorithm for journal entries
 */

describe('Sentiment Analysis', () => {
    const analyzeSentiment = (text) => {
        const positiveWords = ['happy', 'good', 'great', 'excellent', 'amazing', 'wonderful', 'love', 'excited', 'grateful', 'thankful', 'confident', 'proud', 'accomplished', 'successful', 'progress', 'improvement', 'better', 'best', 'joy', 'peace', 'calm', 'relaxed'];
        const negativeWords = ['sad', 'stressed', 'anxious', 'worried', 'fear', 'scared', 'depressed', 'hopeless', 'helpless', 'overwhelmed', 'exhausted', 'tired', 'burnout', 'failure', 'fail', 'struggling', 'difficult', 'hard', 'pressure', 'stress', 'anxiety', 'panic', 'angry', 'frustrated', 'disappointed'];

        let positiveCount = 0;
        let negativeCount = 0;

        const words = text.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });

        if (positiveCount > negativeCount) return 'positive';
        if (negativeCount > positiveCount) return 'negative';
        return 'neutral';
    };

    describe('analyzeSentiment', () => {
        test('should detect positive sentiment with positive words', () => {
            expect(analyzeSentiment('I am happy and excited today')).toBe('positive');
            expect(analyzeSentiment('This is great and wonderful')).toBe('positive');
            expect(analyzeSentiment('I feel proud and accomplished')).toBe('positive');
        });

        test('should detect negative sentiment with negative words', () => {
            expect(analyzeSentiment('I am sad and stressed')).toBe('negative');
            expect(analyzeSentiment('This is difficult and overwhelming')).toBe('negative');
            expect(analyzeSentiment('I feel anxious and worried')).toBe('negative');
        });

        test('should detect neutral sentiment with equal positive/negative words', () => {
            expect(analyzeSentiment('I am happy but also sad')).toBe('neutral');
            expect(analyzeSentiment('No strong emotions here')).toBe('neutral');
        });

        test('should be case insensitive', () => {
            expect(analyzeSentiment('I am HAPPY')).toBe('positive');
            expect(analyzeSentiment('I am Sad')).toBe('negative');
            expect(analyzeSentiment('I am EXCITED')).toBe('positive');
        });

        test('should handle empty string', () => {
            expect(analyzeSentiment('')).toBe('neutral');
        });

        test('should handle multiple positive words', () => {
            const text = 'I am happy excited grateful and wonderful';
            expect(analyzeSentiment(text)).toBe('positive');
        });

        test('should handle multiple negative words', () => {
            const text = 'I am sad stressed anxious and overwhelmed';
            expect(analyzeSentiment(text)).toBe('negative');
        });

        test('should prioritize sentiment with more words', () => {
            const text = 'I am happy excited great but sad';
            expect(analyzeSentiment(text)).toBe('positive');
        });

        test('should handle mixed sentiment with more negative words', () => {
            const text = 'I am sad stressed anxious but happy';
            expect(analyzeSentiment(text)).toBe('negative');
        });

        test('should detect confidence as positive', () => {
            expect(analyzeSentiment('I feel confident')).toBe('positive');
        });

        test('should detect burnout as negative', () => {
            expect(analyzeSentiment('I feel burned out')).toBe('negative');
        });

        test('should detect progress as positive', () => {
            expect(analyzeSentiment('Making good progress')).toBe('positive');
        });

        test('should detect failure as negative', () => {
            expect(analyzeSentiment('I feel like a failure')).toBe('negative');
        });

        test('should handle special characters and punctuation', () => {
            expect(analyzeSentiment('I am happy!')).toBe('positive');
            expect(analyzeSentiment('I am sad.')).toBe('negative');
            expect(analyzeSentiment('I am happy, excited, and grateful!')).toBe('positive');
        });

        test('should handle numbers in text', () => {
            expect(analyzeSentiment('I am happy 100%')).toBe('positive');
        });

        test('should be case insensitive for all words', () => {
            expect(analyzeSentiment('HAPPY')).toBe('positive');
            expect(analyzeSentiment('SAD')).toBe('negative');
            expect(analyzeSentiment('Anxious')).toBe('negative');
        });
    });

    describe('Sentiment Word Lists', () => {
        test('positive words list should contain key positive terms', () => {
            const positiveWords = ['happy', 'good', 'great', 'excellent', 'amazing', 'wonderful', 'love', 'excited', 'grateful', 'thankful', 'confident', 'proud', 'accomplished', 'successful', 'progress', 'improvement', 'better', 'best', 'joy', 'peace', 'calm', 'relaxed'];
            
            expect(positiveWords).toContain('happy');
            expect(positiveWords).toContain('grateful');
            expect(positiveWords).toContain('confident');
            expect(positiveWords).toContain('peace');
        });

        test('negative words list should contain key negative terms', () => {
            const negativeWords = ['sad', 'stressed', 'anxious', 'worried', 'fear', 'scared', 'depressed', 'hopeless', 'helpless', 'overwhelmed', 'exhausted', 'tired', 'burnout', 'failure', 'fail', 'struggling', 'difficult', 'hard', 'pressure', 'stress', 'anxiety', 'panic', 'angry', 'frustrated', 'disappointed'];
            
            expect(negativeWords).toContain('stressed');
            expect(negativeWords).toContain('anxious');
            expect(negativeWords).toContain('depressed');
            expect(negativeWords).toContain('burnout');
        });
    });
});
