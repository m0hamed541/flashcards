//hooks.js
// stores/hooks.ts
import { useStore, useCell } from "tinybase/ui-react";
import { useTable, useRow, useResultTable } from "tinybase/ui-react";
import { useCallback } from "react";
import { store } from "./index";

import { 
  TABLES, 
  CARD_COLUMNS, 
  DECK_COLUMNS, 
  LEARNING_SESSION_COLUMNS,
  CARD_PROGRESS_COLUMNS
} from "./schema";
import {
  validateCategory,
  validateDeck,
  validateCard,
  validateLearningSession,
  validateCardProgress,
  sanitizeCategory,
  sanitizeDeck,
  sanitizeCard,
  sanitizeLearningSession,
  sanitizeCardProgress,
} from "./validation";

// Custom hooks for your specific use cases
export const useAppStore = () => useStore(store);

export const useCategories = () => useTable(TABLES.CATEGORIES, store);
export const useCategory = (categoryId) =>
  useRow(TABLES.CATEGORIES, categoryId, store);

export const useDecks = () => useTable(TABLES.DECKS, store);
export const useDeck = (deckId) => useRow(TABLES.DECKS, deckId, store);

export const useCards = () => useTable(TABLES.CARDS, store);
export const useCard = (cardId) => useRow(TABLES.CARDS, cardId, store);

export const useLearningSessions = () => useTable(TABLES.LEARNING_SESSIONS, store);
export const useLearningSession = (sessionId) => useRow(TABLES.LEARNING_SESSIONS, sessionId, store);

export const useCardProgress = () => useTable(TABLES.CARD_PROGRESS, store);
export const useCardProgressByCard = (cardId) => {
  const allProgress = useCardProgress();
  return Object.fromEntries(
    Object.entries(allProgress).filter(([_, progress]) => 
      progress.cardId === String(cardId)
    )
  );
};

// Fixed useCardsByDeck hook
export const useCardsByDeck = (deckId) => {
  const allCards = useCards();
  
  // Filter cards by deckId
  return Object.fromEntries(
    Object.entries(allCards).filter(([cardId, card]) => 
      card.deckId === String(deckId)
    )
  );
};

export const useCategoryDecks = (categoryId) => {
  const decks = useDecks();
  return Object.entries(decks).filter(
    ([_, deck]) => deck.categoryId === categoryId
  );
};

export const useDeckCards = (deckId) => {
  const cards = useCards();
  return Object.entries(cards).filter(([_, card]) => card.deckId === deckId);
};

// Enhanced deck statistics hook
export const useDeckStats = (deckId) => {
  const deck = useDeck(deckId);
  const cards = useCardsByDeck(deckId);
  const learningSessions = useLearningSessions();
  
  if (!deck || !cards) return null;
  
  const totalCards = Object.keys(cards).length;
  const totalLearned = Object.values(cards).filter(card => 
    card.reviewCount && card.reviewCount > 0
  ).length;
  
  // Calculate progress percentage
  const progressPercentage = totalCards > 0 ? (totalLearned / totalCards) * 100 : 0;
  
  // Get last study session for this deck
  const deckSessions = Object.values(learningSessions).filter(session => 
    session.deckId === deckId
  );
  const lastStudied = deckSessions.length > 0 
    ? Math.max(...deckSessions.map(s => new Date(s.completedAt || s.startedAt).getTime()))
    : null;
  
  return {
    totalCards,
    totalLearned,
    progressPercentage: Math.round(progressPercentage),
    lastStudied: lastStudied ? new Date(lastStudied).toLocaleDateString() : null,
    totalSessions: deckSessions.length,
    averageAccuracy: deckSessions.length > 0 
      ? Math.round(deckSessions.reduce((acc, session) => acc + (session.accuracy || 0), 0) / deckSessions.length)
      : 0
  };
};

// Learning session management hook
export const useLearningSessionManager = () => {
  const startLearningSession = (deckId) => {
    const cards = store.getTable(TABLES.CARDS);
    const deckCards = Object.values(cards).filter(card => card.deckId === deckId);
    
    if (deckCards.length === 0) {
      throw new Error("No cards found in this deck");
    }
    
    const sessionId = Date.now().toString();
    const now = new Date().toISOString();
    
    store.setRow(TABLES.LEARNING_SESSIONS, sessionId, {
      id: sessionId,
      deckId,
      startedAt: now,
      totalCards: deckCards.length,
      correctAnswers: 0,
      accuracy: 0,
      duration: 0,
      createdAt: now,
    });
    
    return sessionId;
  };
  
  const completeLearningSession = (sessionId, correctAnswers, duration) => {
    const session = store.getRow(TABLES.LEARNING_SESSIONS, sessionId);
    if (!session) {
      throw new Error("Learning session not found");
    }
    
    const accuracy = Math.round((correctAnswers / session.totalCards) * 100);
    const now = new Date().toISOString();
    
    store.setPartialRow(TABLES.LEARNING_SESSIONS, sessionId, {
      completedAt: now,
      correctAnswers,
      accuracy,
      duration,
    });
    
    // Update deck last studied
    store.setPartialRow(TABLES.DECKS, session.deckId, {
      lastStudied: now,
      totalLearned: correctAnswers,
    });
    
    return { sessionId, accuracy };
  };
  
  const recordCardResult = (cardId, deckId, sessionId, result, responseTime = null) => {
    const progressId = Date.now().toString();
    const now = new Date().toISOString();
    
    store.setRow(TABLES.CARD_PROGRESS, progressId, {
      id: progressId,
      cardId,
      deckId,
      sessionId,
      result,
      responseTime,
      createdAt: now,
    });
    
    // Update card statistics
    const card = store.getRow(TABLES.CARDS, cardId);
    if (card) {
      const reviewCount = (card.reviewCount || 0) + 1;
      const correctCount = (card.correctCount || 0) + (result === 'correct' ? 1 : 0);
      
      store.setPartialRow(TABLES.CARDS, cardId, {
        lastReviewed: now,
        reviewCount,
        correctCount,
        updatedAt: now,
      });
    }
    
    return progressId;
  };
  
  return {
    startLearningSession,
    completeLearningSession,
    recordCardResult,
  };
};

// Custom hook for adding data
export const useStoreActions = () => {
  const addCategory = (categoryData) => {
    // Validate the data
    const validation = validateCategory(categoryData);
    if (!validation.isValid) {
      throw new Error(
        `Category validation failed: ${validation.errors.join(", ")}`
      );
    }

    // Sanitize the data
    const sanitizedData = sanitizeCategory(categoryData);

    const id = Date.now().toString();
    const now = new Date().toISOString();
    store.setRow(TABLES.CATEGORIES, id, {
      ...sanitizedData,
      id,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  };

  const addDeck = (deckData) => {
    // Validate the data
    const validation = validateDeck(deckData);
    if (!validation.isValid) {
      throw new Error(
        `Deck validation failed: ${validation.errors.join(", ")}`
      );
    }

    // Sanitize the data
    const sanitizedData = sanitizeDeck(deckData);

    const id = Date.now().toString();
    const now = new Date().toISOString();
    store.setRow(TABLES.DECKS, id, {
      ...sanitizedData,
      id,
      totalLearned: 0,
      lastStudied: null,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  };

  const addCard = (cardData) => {
    // Validate the data
    const validation = validateCard(cardData);
    if (!validation.isValid) {
      throw new Error(
        `Card validation failed: ${validation.errors.join(", ")}`
      );
    }

    // Sanitize the data
    const sanitizedData = sanitizeCard(cardData);

    const id = Date.now().toString();
    const now = new Date().toISOString();
    store.setRow(TABLES.CARDS, id, {
      ...sanitizedData,
      id,
      difficulty: sanitizedData.difficulty || 'medium',
      lastReviewed: null,
      reviewCount: 0,
      correctCount: 0,
      nextReview: null,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  };

  const updateCategory = (categoryId, categoryData) => {
    // Validate the data
    const validation = validateCategory(categoryData);
    if (!validation.isValid) {
      throw new Error(
        `Category validation failed: ${validation.errors.join(", ")}`
      );
    }

    // Sanitize the data
    const sanitizedData = sanitizeCategory(categoryData);

    store.setPartialRow(TABLES.CATEGORIES, categoryId, {
      ...sanitizedData,
      updatedAt: new Date().toISOString(),
    });
  };

  const updateDeck = (deckId, deckData) => {
    // Validate the data
    const validation = validateDeck(deckData);
    if (!validation.isValid) {
      throw new Error(
        `Deck validation failed: ${validation.errors.join(", ")}`
      );
    }

    // Sanitize the data
    const sanitizedData = sanitizeDeck(deckData);

    store.setPartialRow(TABLES.DECKS, deckId, {
      ...sanitizedData,
      updatedAt: new Date().toISOString(),
    });
  };

  const updateCard = (cardId, cardData) => {
    // Validate the data
    const validation = validateCard(cardData);
    if (!validation.isValid) {
      throw new Error(
        `Card validation failed: ${validation.errors.join(", ")}`
      );
    }

    // Sanitize the data
    const sanitizedData = sanitizeCard(cardData);

    store.setPartialRow(TABLES.CARDS, cardId, {
      ...sanitizedData,
      updatedAt: new Date().toISOString(),
    });
  };

  const deleteCategory = (categoryId) => {
    // First delete all decks in this category
    const decks = store.getTable(TABLES.DECKS);
    Object.entries(decks).forEach(([deckId, deck]) => {
      if (deck.categoryId === categoryId) {
        // Delete all cards in this deck
        const cards = store.getTable(TABLES.CARDS);
        Object.entries(cards).forEach(([cardId, card]) => {
          if (card.deckId === deckId) {
            store.delRow(TABLES.CARDS, cardId);
          }
        });
        store.delRow(TABLES.DECKS, deckId);
      }
    });
    store.delRow(TABLES.CATEGORIES, categoryId);
  };

  const deleteDeck = (deckId) => {
    // Delete all cards in this deck
    const cards = store.getTable(TABLES.CARDS);
    Object.entries(cards).forEach(([cardId, card]) => {
      if (card.deckId === deckId) {
        store.delRow(TABLES.CARDS, cardId);
      }
    });
    store.delRow(TABLES.DECKS, deckId);
  };

  const deleteCard = (cardId) => {
    store.delRow(TABLES.CARDS, cardId);
  };

  return {
    addCategory,
    addDeck,
    addCard,
    updateCategory,
    updateDeck,
    updateCard,
    deleteCategory,
    deleteDeck,
    deleteCard,
  };
};