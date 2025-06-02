// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { tokenUseStore } from './components/BaseLayout/zustand';
import AppRouter from './router/'
import { useAuth } from "react-oidc-context";

function App() {

  const auth = useAuth();
  const { updateToken } = tokenUseStore();


  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    updateToken(auth.user?.id_token!);
    return <AppRouter />;
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>

    </div>
  );
}

export default App
