// Database schema definitions for TinyBase
export const TABLES = {
  CATEGORIES: 'categories',
  DECKS: 'decks',
  CARDS: 'cards',
};

export const CATEGORY_COLUMNS = {
  ID: 'id',
  NAME: 'name',
  COLOR: 'color',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};

export const DECK_COLUMNS = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  CATEGORY_ID: 'categoryId',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};

export const CARD_COLUMNS = {
  ID: 'id',
  DECK_ID: 'deckId',
  FRONT: 'front',
  BACK: 'back',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};

// Validation schemas for data integrity
export const CATEGORY_SCHEMA = {
  name: { type: 'string', required: true, minLength: 1, maxLength: 100 },
  color: { type: 'string', required: true, pattern: /^#[0-9A-F]{6}$/i },
};

export const DECK_SCHEMA = {
  name: { type: 'string', required: true, minLength: 1, maxLength: 100 },
  description: { type: 'string', required: false, maxLength: 500 },
  categoryId: { type: 'string', required: true },
};

export const CARD_SCHEMA = {
  front: { type: 'string', required: true, minLength: 1, maxLength: 1000 },
  back: { type: 'string', required: true, minLength: 1, maxLength: 1000 },
  deckId: { type: 'string', required: true },
};
