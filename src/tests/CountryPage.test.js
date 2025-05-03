import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CountryPage from '../pages/CountryPage';

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ code: 'DEU' })
}));

// Mock the CountryDetails component
jest.mock('../components/CountryDetails', () => {
  return function MockCountryDetails() {
    return <div data-testid="country-details">Country Details</div>;
  };
});

// Mock the fetch API
global.fetch = jest.fn();

describe('CountryPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        name: { common: 'Germany' },
        cca3: 'DEU'
      })
    });
  });

  test('renders loading state', () => {
    render(
      <MemoryRouter>
        <CountryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches country data with code from params', () => {
    render(
      <MemoryRouter>
        <CountryPage />
      </MemoryRouter>
    );
    
    expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/DEU');
  });
});