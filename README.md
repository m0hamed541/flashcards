# Flashcards Mobile App - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Features Documentation](#features-documentation)
5. [Data & State Management](#data--state-management)
6. [Development Guidelines](#development-guidelines)

---

## Project Overview

### Name of the App
**Flashcards** - A modern, minimalist flashcard application designed for IT students to enhance their learning experience.

### Short Description
Flashcards is a React Native mobile application that provides an intuitive and efficient way for students to create, organize, and study flashcards. The app features a clean, modern UI with smooth navigation and comprehensive progress tracking, making it ideal for educational purposes and self-paced learning.

**Purpose**: To provide a digital flashcard solution that enhances learning retention through spaced repetition and organized study sessions.

**Target Users**: 
- IT students and professionals
- Self-learners studying technical subjects
- Educators creating study materials
- Anyone requiring organized knowledge retention

**Main Value**: Streamlined flashcard creation, categorization, and study tracking with a focus on user experience and learning effectiveness.

### Key Features Summary
- **Category Management**: Organize flashcards into logical categories with custom colors
- **Deck Creation**: Create themed decks within categories for focused study sessions
- **Flashcard Management**: Add, edit, and organize individual flashcards
- **Progress Tracking**: Monitor study progress with detailed statistics and achievements
- **Modern UI/UX**: Clean, intuitive interface with smooth navigation
- **Offline-First**: Local data storage with automatic persistence

---

## Architecture & Technology Stack

### High-Level System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile Client │    │   Local Storage │    │   State Store   │
│   (React Native)│◄──►│  (AsyncStorage) │◄──►│   (TinyBase)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   UI Components │    │  Data Persistence│    │  Business Logic │
│   (Components/) │    │   (Persister)    │    │   (Hooks)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Architecture Pattern**: Client-Side Architecture with Local-First Data Storage

- **Mobile Client**: React Native application with Expo framework
- **Local Storage**: AsyncStorage for persistent data storage
- **State Management**: TinyBase for reactive state management
- **Data Persistence**: Custom AsyncStorage persister with auto-save functionality
- **UI Layer**: Component-based architecture with NativeWind styling

### Chosen Technology Stack

#### Frontend Framework
- **React Native 0.79.5**: Cross-platform mobile development
- **Expo SDK 53**: Development platform and build tools
- **React 19.0.0**: Latest React version for modern features

#### State Management
- **TinyBase 6.5.2**: Lightweight, reactive state management library
- **Custom Hooks**: React hooks for state operations and data management

#### Styling & UI
- **NativeWind 4.1.23**: Tailwind CSS for React Native
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Expo Vector Icons**: Icon library for consistent UI elements

#### Data Storage & Persistence
- **AsyncStorage**: Local data persistence for mobile platforms
- **Custom Persister**: Automatic data saving and loading implementation

#### Development Tools
- **TypeScript 5.8.3**: Type safety and development experience
- **ESLint**: Code quality and consistency
- **Babel**: JavaScript compilation and transformation
- **Metro**: React Native bundler

#### Navigation
- **Expo Router 5.1.3**: File-based routing system
- **React Navigation**: Tab-based navigation structure

## Project Structure

### Explanation of Major Folders/Files

#### `/app` - Application Core
- **`_layout.jsx`**: Root application layout, initializes store and fonts
- **`(tabs)/`**: Tab-based navigation structure using Expo Router
- **`screens/`**: Additional screen components for specific functionality

#### `/components` - Reusable UI Components
- **Component Library**: Modular, reusable components following React best practices
- **Consistent Design**: All components use NativeWind for consistent styling
- **Accessibility**: Components designed with accessibility in mind

#### `/stores` - State Management
- **`index.js`**: Store initialization and persistence setup
- **`schema.js`**: Data structure definitions and validation schemas
- **`hooks.js`**: Custom React hooks for state operations
- **`validation.js`**: Data validation and sanitization logic

#### `/constants` - Application Constants
- **`Colors.ts`**: Centralized color definitions for light/dark themes
- **`global.css`**: Global CSS styles and custom properties

#### `/assets` - Static Resources
- **`fonts/`**: Custom typography (SpaceMono font)
- **`images/`**: App icons, splash screens, and visual assets

## Features Documentation

### Core Features

#### 1. Category Management
- **Description**: Create and organize flashcard categories with custom colors
- **Functionality**: 
  - Add new categories with name and color selection
  - Edit existing category properties
  - Delete categories (with cascading deletion of related content)
  - Visual color coding for easy identification

#### 2. Deck Creation and Management
- **Description**: Create themed study decks within categories
- **Functionality**:
  - Create decks with name, description, and color
  - Associate decks with specific categories
  - Edit deck properties and metadata
  - Delete decks with automatic card cleanup

#### 3. Flashcard Management
- **Description**: Create, edit, and organize individual flashcards
- **Functionality**:
  - Add front and back content to flashcards
  - Associate flashcards with specific decks
  - Edit flashcard content and properties
  - Delete individual flashcards

#### 4. Progress Tracking
- **Description**: Monitor study progress and learning achievements
- **Functionality**:
  - Study session statistics (cards studied, time spent)
  - Accuracy tracking and performance metrics
  - Study streaks and consistency monitoring
  - Achievement system for learning milestones


## Data & State Management

### Local Data Storage

#### AsyncStorage Implementation
- **Storage Method**: `@react-native-async-storage/async-storage`
- **Data Format**: JSON serialization of TinyBase store tables
- **Storage Key**: `myapp-store` for main application data
- **Automatic Persistence**: Real-time data saving on store changes

#### Data Structure
```javascript
{
  categories: {
    [categoryId]: {
      id: string,
      name: string,
      color: string,
      createdAt: string,
      updatedAt: string
    }
  },
  decks: {
    [deckId]: {
      id: string,
      name: string,
      description: string,
      categoryId: string,
      color: string,
      createdAt: string,
      updatedAt: string
    }
  },
  cards: {
    [cardId]: {
      id: string,
      deckId: string,
      front: string,
      back: string,
      createdAt: string,
      updatedAt: string
    }
  }
}
```

### State Management Approach

#### TinyBase Store Architecture
- **Central Store**: Single source of truth for application state
- **Reactive Updates**: Automatic UI re-rendering on data changes
- **Table Structure**: Organized data storage with relational relationships
- **Row Operations**: CRUD operations for individual data entities

### Custom React Hooks

#### Data Access Hooks
- **`useCategories()`**: Access all categories
- **`useDecks()`**: Access all decks
- **`useCards()`**: Access all cards
- **`useCategory(categoryId)`**: Access specific category
- **`useDeck(deckId)`**: Access specific deck
- **`useCard(cardId)`**: Access specific card

#### Action Hooks
- **`useStoreActions()`**: CRUD operations for all data types
- **Data Validation**: Input validation before storage
- **Data Sanitization**: Clean data before persistence
- **Error Handling**: Graceful error handling for operations
