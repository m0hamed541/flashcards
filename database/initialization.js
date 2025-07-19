import * as SQLite from "expo-sqlite";

export const initializeDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("flashcards.db");

  // Check if tables exist by querying sqlite_master
  const tablesInfo = await db.getAllAsync(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name IN ('cards', 'decks', 'categories')
  `);

  if (tablesInfo.length > 0) {
    console.log("Dropping existing tables for clean recreation...");
    await db.execAsync(`
        DROP TABLE IF EXISTS cards;
        DROP TABLE IF EXISTS decks;
        DROP TABLE IF EXISTS categories;
      `);
  }

  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          color TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS decks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          category_id INTEGER,
          color TEXT,
          card_count INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories (id)
        );
        
        CREATE TABLE IF NOT EXISTS cards (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          front TEXT NOT NULL,
          back TEXT NOT NULL,
          deck_id INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (deck_id) REFERENCES decks (id)
        );
      `);

  console.log("Database tables created successfully");

  // Check if default deck already exists before creating it
  const existingDecks = await db.getAllAsync('SELECT * FROM decks WHERE name = ?', ['Default Deck']);
  
  if (existingDecks.length === 0) {
    const result = await db.runAsync('INSERT INTO decks (name, color, category_id, card_count) VALUES (?, ?, ?, ?)', 'Default Deck', '#c3ffc3ff', null, 2);
    console.log("Default deck created successfully:", result);
  } else {
    console.log("Default deck already exists");
  }
};