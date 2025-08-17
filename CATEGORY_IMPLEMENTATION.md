# Category Implementation with TinyBase

This document describes the implementation of category functionality using TinyBase for the flashcards application.

## Overview

The category system allows users to organize their flashcard decks into logical groups. Each category has a name and a color for visual identification.

## Database Schema

### Categories Table
- `id`: Unique identifier (auto-generated timestamp)
- `name`: Category name (required, 1-100 characters)
- `color`: Hex color code (required, valid hex format)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Decks Table
- `id`: Unique identifier
- `name`: Deck name
- `description`: Optional description
- `categoryId`: Reference to category
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Cards Table
- `id`: Unique identifier
- `deckId`: Reference to deck
- `front`: Front side of card
- `back`: Back side of card
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Files Structure

```
stores/
├── index.js          # Main store configuration and actions
├── schema.js         # Database schema definitions
├── validation.js     # Data validation and sanitization
└── hooks.js          # React hooks for TinyBase integration
```

## Usage

### Adding a New Category

```javascript
import { useStoreActions } from '../stores/hooks';

const { addCategory } = useStoreActions();

const handleSaveCategory = () => {
  try {
    const categoryId = addCategory({
      name: "Programming",
      color: "#2196F3"
    });
    //console.log('Category created with ID:', categoryId);
  } catch (error) {
    console.error('Validation error:', error.message);
  }
};
```

### Retrieving Categories

```javascript
import { useCategories } from '../stores/hooks';

const categories = useCategories();

// Display categories
Object.entries(categories).map(([categoryId, category]) => (
  <Category
    key={categoryId}
    title={category.name}
    color={category.color}
    id={categoryId}
  />
));
```

### Updating a Category

```javascript
import { useStoreActions } from '../stores/hooks';

const { updateCategory } = useStoreActions();

const handleUpdateCategory = (categoryId) => {
  try {
    updateCategory(categoryId, {
      name: "Updated Name",
      color: "#FF5722"
    });
  } catch (error) {
    console.error('Update error:', error.message);
  }
};
```

### Deleting a Category

```javascript
import { useStoreActions } from '../stores/hooks';

const { deleteCategory } = useStoreActions();

const handleDeleteCategory = (categoryId) => {
  // This will also delete all decks and cards in the category
  deleteCategory(categoryId);
};
```

## Data Validation

All category data is validated before saving:

- **Name**: Required, 1-100 characters
- **Color**: Required, valid hex color format (#RRGGBB)

## Data Sanitization

Data is automatically sanitized:
- Names are trimmed of whitespace
- Default color is applied if none provided
- Timestamps are automatically generated

## Persistence

Categories are automatically persisted using AsyncStorage and will survive app restarts.

## Error Handling

The system provides comprehensive error handling:
- Validation errors with specific field messages
- Graceful fallbacks for missing data
- User-friendly error messages in the UI

## Testing

Run the test file to verify functionality:

```javascript
// Import and run the test file
import './stores/test';
```

## Future Enhancements

- Category icons/symbols
- Category sorting and filtering
- Category templates
- Bulk category operations
- Category sharing between users
