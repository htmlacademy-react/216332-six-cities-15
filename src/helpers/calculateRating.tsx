const MAX_RATING = 5;

export const calculateRating = (value: number): string => (value / MAX_RATING) * 100 + '%';
