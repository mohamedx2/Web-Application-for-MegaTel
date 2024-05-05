// Import necessary libraries for testing
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

// Import the component to be tested
import App from './App';

// Mock localStorage getItem method
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  // Add more test cases as needed
});
