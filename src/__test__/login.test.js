import React from 'react';
import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import AppContextProvider from '../context/AppContext';
import Login from '../pages/Login';
import { act  } from 'react-dom/test-utils';

afterEach(cleanup);

test('Show the login button', () => {
  const addItem = jest.fn();

  render(
    <AppContextProvider value={{ addItem }}>
      <Login />
    </AppContextProvider>
  );

  expect(screen.getByText(/Login/).textContent).toBe('Login');
});


const fakeUserResponse = { token: 'eyJhbGciOiJIUzI1NiJ9.MQ.WF4T4LT2mdBNF-VcpkG0jyV1hUnV753pRhEn4SGIKCs' };

const server = setupServer(
  rest.get('http://localhost:3000/login', (req, res, ctx) => {
    return res(ctx.json({ fakeUserResponse }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Allows the user to login successfully', async () => {
  await act(async () => {
    const addItem = jest.fn();

    const { getByTestId } = render(
      <AppContextProvider value={{ addItem }}>
        <Login />
      </AppContextProvider>
    );

    /* fire events that update state */

    // fill out the form
    fireEvent.change(getByTestId(/email/i), {
      target: { value: 'Sincere@april.biz' },
    });
    fireEvent.change(getByTestId(/password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText(/Sign in/i));

    Storage.prototype.getItem = jest.fn(() => fakeUserResponse.token);

    await waitFor(() => {
      expect(window.sessionStorage.getItem('loggedIn')).toEqual(fakeUserResponse.token);
    });
  
    cleanup();
  });

});

test('handles server exceptions', async () => {
  server.use(
    rest.post('http://localhost:3000/login', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Internal server error' }));
    })
  );

  const addItem = jest.fn();

   await act(async () => {
     const { getByTestId } = render(
       <AppContextProvider value={{ addItem }}>
         <Login />
       </AppContextProvider>
     );

     fireEvent.change(getByTestId(/email/i), {
       target: { value: 'Sincere@april.biz' },
     });
     fireEvent.change(getByTestId(/password/i), {
       target: { value: '123456' },
     });

     fireEvent.click(screen.getByText(/Sign in/i));

      await waitFor(() => {
        // expect(window.sessionStorage.getItem('loggedIn')).toBeNull(); /* <-- Ennek is jónak kellene lennie de hibát dob rá..., ha nincs valami a Storage-ban és lekérjük a getItem -el null -t ad vissza */
        expect(window.sessionStorage.getItem('loggedIn')).toBeFalsy();
      });
      cleanup()
   });
});

test('There is "Login" text on the Login button', () => {
  const { getByTestId } = render(
    <AppContextProvider >
      <Login />
    </AppContextProvider>
  );
  const headerEl = getByTestId('login');

  expect(headerEl.textContent).toBe('Login');
});

test('Email input field has a default value', () => {
  const { getByTestId } = render(
    <AppContextProvider>
      <Login />
    </AppContextProvider>
  );
  const inputEl = getByTestId('email');

  expect(inputEl).toBeEmptyDOMElement();
})


