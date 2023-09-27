import React from 'react';
import { AppRouter } from './core';
import { AuthProvider } from './core/auth';

const App : React.FunctionComponent = () => 
{
  return (
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    
  );
}

export default App;
