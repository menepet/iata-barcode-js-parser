import { render, screen } from '@testing-library/react';
import App from './index.js';

test('renders IATA Barcode Javascript Parser Header', () => {
  render(<App />);
  const linkElement = screen.getByText(/IATA Barcode Javascript Parser/i);
  expect(linkElement).toBeInTheDocument();
});
