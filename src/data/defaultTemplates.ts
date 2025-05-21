
import { ChoreTemplate } from "@/models/ChoreTypes";

// Sample data for templates
export const defaultTemplates: ChoreTemplate[] = [
  {
    id: 'daily-chores',
    name: 'Daily Chores',
    description: 'Essential chores that need to be done every day',
    type: 'daily',
    thumbnail: '/templates/daily.png',
    chores: [
      {
        id: 'make-bed',
        name: 'Make Bed',
        description: 'Make your bed neatly first thing in the morning',
        schedule: { frequency: 'daily' },
        category: 'bedroom',
        icon: '🛏️',
      },
      {
        id: 'brush-teeth',
        name: 'Brush Teeth',
        description: 'Brush teeth morning and night',
        schedule: { frequency: 'daily' },
        category: 'hygiene',
        icon: '🪥',
      },
      {
        id: 'pick-up-toys',
        name: 'Pick Up Toys',
        description: 'Put away all toys before bedtime',
        schedule: { frequency: 'daily' },
        category: 'bedroom',
        icon: '🧸',
      },
      {
        id: 'feed-pet',
        name: 'Feed Pet',
        description: 'Feed the pet morning and evening',
        schedule: { frequency: 'daily' },
        category: 'pets',
        icon: '🐕',
      },
      {
        id: 'clear-dishes',
        name: 'Clear Dishes',
        description: 'Clear your dishes after meals',
        schedule: { frequency: 'daily' },
        category: 'kitchen',
        icon: '🍽️',
      },
    ],
  },
  {
    id: 'weekly-chores',
    name: 'Weekly Chores',
    description: 'Chores scheduled on different days of the week',
    type: 'weekly',
    thumbnail: '/templates/weekly.png',
    chores: [
      {
        id: 'vacuum',
        name: 'Vacuum Room',
        description: 'Vacuum your bedroom thoroughly',
        schedule: { frequency: 'weekly', daysOfWeek: ['saturday'] },
        category: 'cleaning',
        icon: '🧹',
      },
      {
        id: 'laundry',
        name: 'Do Laundry',
        description: 'Sort, wash, fold and put away your laundry',
        schedule: { frequency: 'weekly', daysOfWeek: ['sunday'] },
        category: 'cleaning',
        icon: '👕',
      },
      {
        id: 'take-out-trash',
        name: 'Take Out Trash',
        description: 'Take out trash and recycling',
        schedule: { frequency: 'weekly', daysOfWeek: ['monday', 'thursday'] },
        category: 'cleaning',
        icon: '🗑️',
      },
      {
        id: 'water-plants',
        name: 'Water Plants',
        description: 'Water all house plants',
        schedule: { frequency: 'weekly', daysOfWeek: ['wednesday', 'saturday'] },
        category: 'garden',
        icon: '🪴',
      },
      {
        id: 'clean-bathroom',
        name: 'Clean Bathroom',
        description: 'Clean sink, mirror, and tidy up bathroom',
        schedule: { frequency: 'weekly', daysOfWeek: ['saturday'] },
        category: 'cleaning',
        icon: '🚿',
      },
    ],
  },
  {
    id: 'custom-chores',
    name: 'Custom Chores',
    description: 'Start with a blank template and create your own chore chart',
    type: 'custom',
    thumbnail: '/templates/custom.png',
    chores: [],
    allowCustomChores: true,
  }
];
