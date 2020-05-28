import React from 'react';
import LoginForm from './LoginForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const entries = [
  { name: 'John', email: 'john_doe@yahoo', password: 'helloworld' },
  { name: 'Jo', email: 'jo.msn.com', password: 'pa$$W0rd' },
  { name: '', email: 'marry123@test.com', password: '123WX&abcd' },
  {
    name: 'kent'.repeat(10),
    email: 'kent@testing.com',
    password: 'w%oRD123yes',
  },
  { name: 'Robert', email: 'robert_bell@example.com', password: 'r&bsEc234E' },
];

describe('Input validate', () => {
  test.each(entries)('test with %s entry', async (entry) => {
    render(<LoginForm />);

    const nameInput =
      screen.queryByLabelText(/name/i) ||
      screen.queryByPlaceholderText(/name/i);
    const emailInput =
      screen.getByLabelText(/email/i) ||
      screen.queryByPlaceholderText(/email/i);
    const passwordInput =
      screen.getByLabelText(/password/i) ||
      screen.queryByPlaceholderText(/password/i);

    fireEvent.change(nameInput, { target: { value: entry.name } });
    fireEvent.blur(nameInput);

    if (entry.name.length === 0) {
      expect(await screen.findByText(/name is required/i)).not.toBeNull();
      console.log('name is required');
    } else if (!checkName(entry.name)) {
      expect(await screen.findByText(/invalid name/i)).not.toBeNull();
      console.log(entry.name + ' is invalid name');
    }
    await act(() => Promise.resolve());
  });
});

const checkName = (name) => {
  return name.length >= 3 && name.length <= 30;
};
