import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements
} from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';
import { LoginPage } from '../components/login';
import { PersonalInfo } from '../components/personalInfo';
import { GenerateSlide } from '../components/generateSlide';
import { DownloadSlide } from '../components/downloadSlide';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<BaseLayout />}>
        <Route  path="/login" element={ <LoginPage />} />
        <Route  path="/generate-slide" element={ <GenerateSlide />} />
        <Route  path="/download-slide" element={ <DownloadSlide />} />
        <Route index element={ <PersonalInfo />} />
      </ Route>,
    </>
  ),
);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
}

export default AppRouter;