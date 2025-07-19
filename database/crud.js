import * as SQLite from "expo-sqlite";

let db = null;

// Get database instance
const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("flashcards.db");
  }
  return db;
};


export const getAllDecks = async () => {
  try {
    const database = await getDatabase();
    const decks = await database.getAllAsync(`
      SELECT *
      FROM decks 
      ORDER BY name ASC
    `);
    console.log("==================== Decks retrieved ====================\n ", decks);
    return decks;
  } catch (error) {
    console.error("Error getting all decks:", error);
    throw error;
  }
};