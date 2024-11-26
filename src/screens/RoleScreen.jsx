import React from "react";
import {RolePage} from "../components";

const Role = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto h-screen ml-0 sm:ml-64">
          <RolePage />
        </main>
      </div>
    </div>
  );
};

export default Role;
