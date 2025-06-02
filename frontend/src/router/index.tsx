import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements
} from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';
import { LoginPage } from '../components/login';
import { PersonalInfo } from '../components/personalInfo';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<BaseLayout />}>
        <Route  path="/login" element={ <LoginPage />} />
        {/* path="/personalInfo" */}
        <Route index element={ <PersonalInfo />} />
      </ Route>,
    </>
  ),
);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
}

export default AppRouter;