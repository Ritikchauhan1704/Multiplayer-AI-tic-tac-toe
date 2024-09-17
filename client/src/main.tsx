import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {AI, Home, Offline, Online} from './pages';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/ai/:id" element={<AI />} />
      <Route path="/offline" element={<Offline />} />
      <Route path="/online/:id" element={<Online />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
