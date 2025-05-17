import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { routes } from '@/navigation/routes.tsx';

export function App() {
  const lp = retrieveLaunchParams();
  const platform = ['macos', 'ios'].includes(String(lp.platform)) ? 'ios' : 'base';

  return (
    <HashRouter>
      <AppRoot
        appearance="light"
        platform={platform}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/gallery" replace />} />
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </AppRoot>
    </HashRouter>
  );
}
