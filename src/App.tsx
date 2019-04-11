import React, { useEffect } from 'react';

import AppRouter from '@app/AppRouter';

const App: React.FC<{}> = () => {
  useEffect(() => {
    document.title = 'Just Another Single-Page Application';
  });
  return <AppRouter />;
};

export default App;
