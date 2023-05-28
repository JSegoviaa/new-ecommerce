import { useContext } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

import { AppRouter } from './routers';
import { AdminContext, AuthContext } from './contexts';

function App() {
  const { isLoading } = useContext(AdminContext);
  const { isLoading: isAuthLoading } = useContext(AuthContext);

  return (
    <LoadingOverlay
      active={isLoading || isAuthLoading}
      spinner
      text="Cargando información"
      fadeSpeed={50}
      styles={{
        wrapper: { width: '100vw', height: '100vh' },
        overlay: (base) => ({
          ...base,
          background: 'rgba(30, 30, 30, 0.95)',
          zIndex: 9999,
        }),
      }}
    >
      <AppRouter />
    </LoadingOverlay>
  );
}

export default App;
