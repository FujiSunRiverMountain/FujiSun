import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const BaseLayout = (): ReactElement => {



  return (
    <>
      <div id="base">
        <Outlet />
      </div>
    </>
  )
};

export default BaseLayout;