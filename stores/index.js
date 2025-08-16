// stores/index.js
import { createStore } from 'tinybase';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the main store
export const store = createStore();

// Custom AsyncStorage persister implementation
export class AsyncStoragePersister {
  constructor(store, storageKey = 'myapp-store') {
    this.store = store;
    this.storageKey = storageKey;
    this.autoSaveInterval = null;
  }

  async startAutoLoad() {
    try {
      const data = await AsyncStorage.getItem(this.storageKey);
      if (data) {
        const parsedData = JSON.parse(data);
        this.store.setTables(parsedData);
      }
    } catch (error) {
      console.error('Failed to load data from AsyncStorage:', error);
    }
  }

  async startAutoSave(intervalMs = 1000) {
    // Save immediately
    await this.save();
    
    // Set up automatic saving
    this.autoSaveInterval = setInterval(async () => {
      await this.save();
    }, intervalMs);

    // Listen to store changes and save
    this.store.addListener(() => {
      this.save();
    });
  }

  async save() {
    try {
      const tables = this.store.getTables();
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(tables));
    } catch (error) {
      console.error('Failed to save data to AsyncStorage:', error);
    }
  }

  async load() {
    try {
      const data = await AsyncStorage.getItem(this.storageKey);
      if (data) {
        const parsedData = JSON.parse(data);
        this.store.setTables(parsedData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load data from AsyncStorage:', error);
      return false;
    }
  }

  stopAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  async clear() {
    try {
      await AsyncStorage.removeItem(this.storageKey);
      this.store.delTables();
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
    }
  }
}

// Create persister instance
export const persister = new AsyncStoragePersister(store, 'myapp-store');

// Initialize the store with default data structure
export const initializeStore = async () => {
  // Define your initial tables structure
  const initialTables = {
    categories: {},
    decks: {},
    cards: {},
  };

  // Try to load existing data first
  const hasExistingData = await persister.load();
  
  // If no existing data, set initial structure
  if (!hasExistingData) {
    store.setTables(initialTables);
  }

  // Start auto-save functionality
  await persister.startAutoSave();
};

// Helper functions for data management
export const saveStore = () => persister.save();
export const loadStore = () => persister.load();
export const clearStore = () => persister.clear();
