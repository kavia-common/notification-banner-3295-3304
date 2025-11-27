import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

jest.useFakeTimers();

describe('Notification flow', () => {
  test('renders trigger button', () => {
    render(<App />);
    const btn = screen.getByTestId('btn-show-random');
    expect(btn).toBeInTheDocument();
  });

  test('shows notification and auto-dismisses after 3 seconds (custom)', () => {
    render(<App />);
    const input = screen.getByLabelText(/message/i);
    const showBtn = screen.getByTestId('btn-show-custom');

    // type custom message
    fireEvent.change(input, { target: { value: 'Hello world' } });

    // click show
    fireEvent.click(showBtn);

    // ensure notification appears
    const notifWrapper = screen.getByTestId('notification-wrapper');
    expect(notifWrapper).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();

    // advance timers by 3s
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // notification should disappear
    expect(screen.queryByTestId('notification-wrapper')).toBeNull();
  });

  test('manual close works', () => {
    render(<App />);
    const input = screen.getByLabelText(/message/i);
    fireEvent.change(input, { target: { value: 'Close me' } });
    fireEvent.click(screen.getByTestId('btn-show-custom'));

    const closeBtn = screen.getByTestId('notification-close');
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('notification-wrapper')).toBeNull();
  });
});
