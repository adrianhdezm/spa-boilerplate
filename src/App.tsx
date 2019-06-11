import React, { useEffect } from 'react';

const App: React.FC<{}> = () => {
  useEffect(() => {
    document.title = 'Just Another Single-Page Application';
  });

  return (
    <>
      <div> This will be a nice App</div>
    </>
  );
};

export default App;
