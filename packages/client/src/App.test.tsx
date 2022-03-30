import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders messages from server and db', () => {
  render(<App />);

  const messageFromServer = screen.getByText('Сообщение от сервера по пути \'/api/ping\':');
  const messageFromDb = screen.getByText('Посты из базы:');

  expect(messageFromServer).toBeInTheDocument();
  expect(messageFromDb).toBeInTheDocument();
});
