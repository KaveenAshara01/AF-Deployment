import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';

// Mock the CountryCard component
jest.mock('../components/CountryCard', () => {
  return function MockCountryCard({ country }) {
    return <div data-testid="country-card">{country.name.common}</div>;
  };
});

// Mock fetch API
global.fetch = jest.fn();

describe('Home Component', () => {
  // Sample countries data for testing
  const mockCountries = [
    {
      name: { common: 'United States' },
      cca3: 'USA',
      region: 'Americas',
      flags: { png: 'usa-flag.png', alt: 'Flag of USA' },
      capital: ['Washington, D.C.'],
      population: 331002651
    },
    {
      name: { common: 'Germany' },
      cca3: 'DEU',
      region: 'Europe',
      flags: { png: 'germany-flag.png', alt: 'Flag of Germany' },
      capital: ['Berlin'],
      population: 83240525
    },
    {
      name: { common: 'Japan' },
      cca3: 'JPN',
      region: 'Asia',
      flags: { png: 'japan-flag.png', alt: 'Flag of Japan' },
      capital: ['Tokyo'],
      population: 126476461
    }
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify([])),
      setItem: jest.fn(),
      removeItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Mock successful fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockCountries
    });
  });

  test('renders the Home component', () => {
    render(<Home />);
    expect(screen.getByText('Favorite Countries')).toBeInTheDocument();
    expect(screen.getByText('No matching favorite countries')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Clear Session')).toBeInTheDocument();
  });

  test('clear session button is clickable', () => {
    render(<Home />);
    const clearButton = screen.getByText('Clear Session');
    fireEvent.click(clearButton);
    // Just test that clicking doesn't cause an error
    expect(clearButton).toBeInTheDocument();
  });
  
  test('search input is usable', () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput.value).toBe('test search');
  });
  
  test('region filter is usable', () => {
    render(<Home />);
    const regionSelect = screen.getByRole('combobox');
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });
    expect(regionSelect.value).toBe('Europe');
  });

  test('handles API fetch error', () => {
    // Mock a failed fetch
    fetch.mockRejectedValueOnce(new Error('API Error'));
    
    // Suppress console.error for this test since we expect an error
    const originalError = console.error;
    console.error = jest.fn();
    
    render(<Home />);
    
    // Restore console.error
    console.error = originalError;
    
    // This test will pass as long as the component renders without throwing
    expect(screen.getByText('Favorite Countries')).toBeInTheDocument();
  });
});