import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col mx-auto w-full flex-grow">{children}</div>
  );
}

export default layout;
