import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div className="flex mx-auto w-full flex-grow">{children}</div>;
}

export default layout;
