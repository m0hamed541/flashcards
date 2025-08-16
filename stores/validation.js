// Data validation utilities for TinyBase
import { CATEGORY_SCHEMA, DECK_SCHEMA, CARD_SCHEMA } from './schema';

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
  };
};

export const sanitizeCard = (cardData) => {
  return {
    front: cardData.front?.trim() || '',
    back: cardData.back?.trim() || '',
    deckId: cardData.deckId || '',
  };
};
