import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";

const BaseLayout = (): ReactElement => {



  return (
    <>
      <Header/>
      <div id="base" className="fixed top-0 left-0 right-0 bg-white shadow">
        <Outlet />
      </div>
    </>
  )
};

export default BaseLayout;