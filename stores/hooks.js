// stores/hooks.ts
import { useStore, useTable, useRow, useCell } from 'tinybase/ui-react';
import { store } from './index';

import { TABLES } from './schema';
import { 
  validateCategory, 
  validateDeck, 
  validateCard,
  sanitizeCategory,
  sanitizeDeck,
  sanitizeCard
} from './validation';


// Custom hooks for your specific use cases
export const useAppStore = () => useStore(store);

export const useCategories = () => useTable(TABLES.CATEGORIES, store);
export const useCategory = (categoryId) => useRow(TABLES.CATEGORIES, categoryId, store);

export const useDecks = () => useTable(TABLES.DECKS, store);
export const useDeck = (deckId) => useRow(TABLES.DECKS, deckId, store);

export const useCards = () => useTable(TABLES.CARDS, store);
export const useCard = (cardId) => useRow(TABLES.CARDS, cardId, store);

export const useCategoryDecks = (categoryId) => {
  const decks = useDecks();
  return Object.entries(decks).filter(([_, deck]) => deck.categoryId === categoryId);
};

export const useDeckCards = (deckId) => {
  const cards = useCards();
  return Object.entries(cards).filter(([_, card]) => card.deckId === deckId);
};

// Custom hook for adding data
export const useStoreActions = () => {
  

  
  const addCategory = (categoryData) => {
    // Validate the data
    const validation = validateCategory(categoryData);
    if (!validation.isValid) {
      throw new Error(`Category validation failed: ${validation.errors.join(', ')}`);
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
      throw new Error(`Deck validation failed: ${validation.errors.join(', ')}`);
    }

    // Sanitize the data
    const sanitizedData = sanitizeDeck(deckData);

    const id = Date.now().toString();
    const now = new Date().toISOString();
    store.setRow(TABLES.DECKS, id, {
      ...sanitizedData,
      id,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  };

  const addCard = (cardData) => {
    // Validate the data
    const validation = validateCard(cardData);
    if (!validation.isValid) {
      throw new Error(`Card validation failed: ${validation.errors.join(', ')}`);
    }

    // Sanitize the data
    const sanitizedData = sanitizeCard(cardData);

    const id = Date.now().toString();
    const now = new Date().toISOString();
    store.setRow(TABLES.CARDS, id, {
      ...sanitizedData,
      id,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  };


  const updateCategory = (categoryId, categoryData) => {
    // Validate the data
    const validation = validateCategory(categoryData);
    if (!validation.isValid) {
      throw new Error(`Category validation failed: ${validation.errors.join(', ')}`);
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
      throw new Error(`Deck validation failed: ${validation.errors.join(', ')}`);
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
      throw new Error(`Card validation failed: ${validation.errors.join(', ')}`);
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