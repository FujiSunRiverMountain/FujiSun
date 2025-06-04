import { useEffect } from 'react';
import { tokenUseStore } from './components/BaseLayout/zustand';
import AppRouter from './router/'
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();
  const { updateToken } = tokenUseStore();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.id_token) {
      updateToken(auth.user.id_token);
    }
  }, [auth.isAuthenticated, auth.user]);


  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <AppRouter />;
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App
