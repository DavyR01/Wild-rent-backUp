import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CREATE_USER } from 'lib/graphql/mutations';
import RegisterPage from 'pages/register';


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: CREATE_USER,
      variables: {
        newUserData: {
          username: 'user2',
          email: 'user2@dtest.com',
          password: 'MyPassword2!',
        },
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: '2',
          username: 'user2',
          email: 'user2@dtest.com',
        },
      },
    },
  },
];

describe('RegisterPage', () => {
  it('renders the registration form', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    );

   //  screen.debug();

    expect(screen.getByLabelText(/Nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmez le mot de pass/i)).toBeInTheDocument();
    expect(screen.getByText(/S'enregistrer/i)).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText(/S'enregistrer/i));

    expect(await screen.findByText(/Le nom d'utilisateur est requis/i)).toBeInTheDocument();
    expect(await screen.findByText(/Le mail est requis/i)).toBeInTheDocument();
    expect(await screen.findByText(/Le mot de passe est requis/i)).toBeInTheDocument();
    expect(await screen.findByText(/La confirmation de mot de passe est requise/i)).toBeInTheDocument();
  });

//   it('shows error message if passwords do not match', async () => {
//     render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <RegisterPage />
//       </MockedProvider>
//     );

//     fireEvent.input(screen.getByLabelText(/Nom d'utilisateur/i), { target: { value: 'testuser' } });
//     fireEvent.input(screen.getByLabelText(/E-mail/i), { target: { value: 'test@example.com' } });
//     fireEvent.input(screen.getByLabelText(/Mot de passe/i), { target: { value: 'Password123!' } });
//     fireEvent.input(screen.getByLabelText(/Confirmez le mot de passe/i), { target: { value: 'Password1234!' } });

//     fireEvent.click(screen.getByText(/S'enregistrer/i));

//     expect(await screen.findByText(/Les mots de passe ne correspondent pas/i)).toBeInTheDocument();
//   });

//   it('redirects to login page on successful registration', async () => {
//     const push = jest.fn();
//     (useRouter as jest.Mock).mockReturnValue({ push });

//     render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <RegisterPage />
//       </MockedProvider>
//     );

//     fireEvent.input(screen.getByLabelText(/Nom d'utilisateur/i), { target: { value: 'testuser' } });
//     fireEvent.input(screen.getByLabelText(/E-mail/i), { target: { value: 'test@example.com' } });
//     fireEvent.input(screen.getByLabelText(/Mot de passe/i), { target: { value: 'Password123!' } });
//     fireEvent.input(screen.getByLabelText(/Confirmez le mot de passe/i), { target: { value: 'Password123!' } });

//     fireEvent.click(screen.getByText(/S'enregistrer/i));

//     await waitFor(() => {
//       expect(push).toHaveBeenCalledWith('/login');
//     });
//   });
});
