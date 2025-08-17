// Data validation utilities for TinyBase
import { 
  CATEGORY_SCHEMA, 
  DECK_SCHEMA, 
  CARD_SCHEMA, 
  LEARNING_SESSION_SCHEMA,
  CARD_PROGRESS_SCHEMA
} from './schema';

// Generic validation function
const validateData = (data, schema) => {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    // Check if required field is present
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} is required`);
      continue;
    }

    // Skip validation for optional fields that are not present
    if (!rules.required && (value === undefined || value === null || value === '')) {
      continue;
    }

    // Type validation
    if (rules.type === 'string') {
      if (typeof value !== 'string') {
        errors.push(`${field} must be a string`);
        continue;
      }

      // Length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters long`);
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${field} must be no more than ${rules.maxLength} characters long`);
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push(`${field} format is invalid`);
      }

      // Enum validation
      if (rules.enum && !rules.enum.includes(value)) {
        errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
      }
    }

    if (rules.type === 'number') {
      if (typeof value !== 'number' || isNaN(value)) {
        errors.push(`${field} must be a number`);
        continue;
      }

      // Min/Max validation
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`${field} must be at least ${rules.min}`);
      }

      if (rules.max !== undefined && value > rules.max) {
        errors.push(`${field} must be no more than ${rules.max}`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Specific validation functions
export const validateCategory = (categoryData) => {
  return validateData(categoryData, CATEGORY_SCHEMA);
};

export const validateDeck = (deckData) => {
  return validateData(deckData, DECK_SCHEMA);
};

export const validateCard = (cardData) => {
  return validateData(cardData, CARD_SCHEMA);
};

export const validateLearningSession = (sessionData) => {
  return validateData(sessionData, LEARNING_SESSION_SCHEMA);
};

export const validateCardProgress = (progressData) => {
  return validateData(progressData, CARD_PROGRESS_SCHEMA);
};

// Sanitize data before saving
export const sanitizeCategory = (categoryData) => {
  return {
    name: categoryData.name?.trim() || '',
    color: categoryData.color || '#2196F3',
  };
};

export const sanitizeDeck = (deckData) => {
  return {
    name: deckData.name?.trim() || '',
    description: deckData.description?.trim() || '',
    categoryId: deckData.categoryId || '',
    color: deckData.color || '#2196F3',
    totalLearned: deckData.totalLearned || 0,
    lastStudied: deckData.lastStudied || null,
  };
};

export const sanitizeCard = (cardData) => {
  return {
    front: cardData.front?.trim() || '',
    back: cardData.back?.trim() || '',
    deckId: cardData.deckId || '',
    difficulty: cardData.difficulty || 'medium',
    lastReviewed: cardData.lastReviewed || null,
    reviewCount: cardData.reviewCount || 0,
    correctCount: cardData.correctCount || 0,
    nextReview: cardData.nextReview || null,
  };
};

export const sanitizeLearningSession = (sessionData) => {
  return {
    deckId: sessionData.deckId || '',
    startedAt: sessionData.startedAt || new Date().toISOString(),
    completedAt: sessionData.completedAt || null,
    totalCards: sessionData.totalCards || 0,
    correctAnswers: sessionData.correctAnswers || 0,
    accuracy: sessionData.accuracy || 0,
    duration: sessionData.duration || 0,
  };
};

export const sanitizeCardProgress = (progressData) => {
  return {
    cardId: progressData.cardId || '',
    deckId: progressData.deckId || '',
    sessionId: progressData.sessionId || '',
    result: progressData.result || 'incorrect',
    responseTime: progressData.responseTime || null,
  };
};
