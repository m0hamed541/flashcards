// Database schema definitions for TinyBase
export const TABLES = {
  CATEGORIES: 'categories',
  DECKS: 'decks',
  CARDS: 'cards',
  LEARNING_SESSIONS: 'learning_sessions',
  CARD_PROGRESS: 'card_progress',
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
  COLOR: 'color',
  CARDS_NUM: 'cardsNum',
  TOTAL_LEARNED: 'totalLearned',
  LAST_STUDIED: 'lastStudied',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};

export const CARD_COLUMNS = {
  ID: 'id',
  DECK_ID: 'deckId',
  FRONT: 'front',
  BACK: 'back',
  DIFFICULTY: 'difficulty',
  LAST_REVIEWED: 'lastReviewed',
  REVIEW_COUNT: 'reviewCount',
  CORRECT_COUNT: 'correctCount',
  NEXT_REVIEW: 'nextReview',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};

export const LEARNING_SESSION_COLUMNS = {
  ID: 'id',
  DECK_ID: 'deckId',
  STARTED_AT: 'startedAt',
  COMPLETED_AT: 'completedAt',
  TOTAL_CARDS: 'totalCards',
  CORRECT_ANSWERS: 'correctAnswers',
  ACCURACY: 'accuracy',
  DURATION: 'duration',
  CREATED_AT: 'createdAt',
};

export const CARD_PROGRESS_COLUMNS = {
  ID: 'id',
  CARD_ID: 'cardId',
  DECK_ID: 'deckId',
  SESSION_ID: 'sessionId',
  RESULT: 'result',
  RESPONSE_TIME: 'responseTime',
  CREATED_AT: 'createdAt',
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
  color: { type: 'string', required: true, pattern: /^#[0-9A-F]{6}$/i },
  totalLearned: { type: 'number', required: false, min: 0 },
  lastStudied: { type: 'string', required: false },
};

export const CARD_SCHEMA = {
  front: { type: 'string', required: true, minLength: 1, maxLength: 1000 },
  back: { type: 'string', required: true, minLength: 1, maxLength: 1000 },
  deckId: { type: 'string', required: true },
  difficulty: { type: 'string', required: false, enum: ['easy', 'medium', 'hard'] },
  lastReviewed: { type: 'string', required: false },
  reviewCount: { type: 'number', required: false, min: 0 },
  correctCount: { type: 'number', required: false, min: 0 },
  nextReview: { type: 'string', required: false },
};

export const LEARNING_SESSION_SCHEMA = {
  deckId: { type: 'string', required: true },
  startedAt: { type: 'string', required: true },
  completedAt: { type: 'string', required: false },
  totalCards: { type: 'number', required: true, min: 1 },
  correctAnswers: { type: 'number', required: false, min: 0 },
  accuracy: { type: 'number', required: false, min: 0, max: 100 },
  duration: { type: 'number', required: false, min: 0 },
};

export const CARD_PROGRESS_SCHEMA = {
  cardId: { type: 'string', required: true },
  deckId: { type: 'string', required: true },
  sessionId: { type: 'string', required: true },
  result: { type: 'string', required: true, enum: ['correct', 'incorrect'] },
  responseTime: { type: 'number', required: false, min: 0 },
};
