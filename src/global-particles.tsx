import React from 'react';
import ReactDOM from 'react-dom/client';
import ParticlesComponent from '@/components/ui/particles-bg';

const rootElement = document.getElementById('particles-react-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ParticlesComponent />
    </React.StrictMode>
  );
}
