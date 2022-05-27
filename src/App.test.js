import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('With React Testing Library', () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;

test('renders learn react link', () => {
  store = mockStore(initialState);
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  ;
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
})