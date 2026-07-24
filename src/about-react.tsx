import React from 'react';
import ReactDOM from 'react-dom/client';
import { SplineSceneBasic } from '@/components/ui/spline-demo';
import '@/src/index.css'; // Make sure this path is correct, wait let's use the correct one

const rootElement = document.getElementById('react-spline-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <SplineSceneBasic />
    </React.StrictMode>
  );
}
