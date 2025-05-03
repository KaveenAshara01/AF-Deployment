import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar'; 

describe('SearchBar Component', () => {
  test('renders with default placeholder when no searchTerm provided', () => {
    render(<SearchBar onSearch={() => {}} searchTerm="" />);
    
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');
  });

  test('renders with provided searchTerm value', () => {
    render(<SearchBar onSearch={() => {}} searchTerm="Germany" />);
    
    const searchInput = screen.getByPlaceholderText('Germany');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('Germany');
  });

  test('calls onSearch when input changes', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} searchTerm="" />);
    
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Japan' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('Japan');
    expect(searchInput.value).toBe('Japan');
  });

  test('updates input value when searchTerm prop changes', () => {
    const { rerender } = render(<SearchBar onSearch={() => {}} searchTerm="Germany" />);
    
    let searchInput = screen.getByPlaceholderText('Germany');
    expect(searchInput.value).toBe('Germany');
    
    // Rerender with new searchTerm
    rerender(<SearchBar onSearch={() => {}} searchTerm="France" />);
    
    searchInput = screen.getByPlaceholderText('France');
    expect(searchInput.value).toBe('France');
  });
});