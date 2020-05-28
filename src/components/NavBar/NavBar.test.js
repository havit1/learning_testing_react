import React from 'react';
import { screen, render } from '@testing-library/react';
import NavBar from './NavBar.jsx';

const links = [
  { text: 'Home', location: '/' },
  { text: 'Contact', location: '/contact' },
  { text: 'About', location: '/about' },
  { text: 'Search', location: '/search' },
];

test('render about link', () => {
  render(<NavBar />);
  expect(screen.getByText(/about/)).toBeInTheDocument();
});
