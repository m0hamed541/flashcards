const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Devices and gadgets",
    created_at: "2023-01-01",
    color: "#FF5733",
  },
  {
    id: 2,
    name: "Books",
    description: "Literature and reading materials",
    created_at: "2023-01-02",
    color: "#33FF57",
  },
];

const decks = [
  {
    id: 1,
    title: "React Basics",
    category_id: 1,
    created_at: "2023-01-10",
    color: "#FF5733",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    category_id: 1,
    created_at: "2023-01-15",
    color: "#33FF57",
  },
];

const cards = [
  {
    id: 1,
    deck_id: 1,
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces.",
    created_at: "2023-01-11",
  },
  {
    id: 2,
    deck_id: 2,
    question: "What is JavaScript?",
    answer: "A programming language used for web development.",
    created_at: "2023-01-16",
  },
];

export { categories, decks, cards };