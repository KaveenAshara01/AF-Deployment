import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders Countries Explorer header and Home component', () => {
    render(<App />);
    expect(screen.getByText('Countries Explorer')).toBeInTheDocument();
  });
});