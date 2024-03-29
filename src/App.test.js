import React from 'react';
import { render } from '@testing-library/react';
import Homepage from '../src/pages/Homepage';

// Test per verificare la resa corretta del componente Welcome in Homepage
test('renders Welcome component in Homepage', () => {
  const { getByTestId } = render(<Homepage />);
  const welcomeElement = getByTestId('welcome-component');
  expect(welcomeElement).toBeInTheDocument();
});
