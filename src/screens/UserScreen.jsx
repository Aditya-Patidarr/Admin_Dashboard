import React from "react";
import {UserPage} from "../components";

const User = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto h-screen ml-0 sm:ml-64">
          <UserPage />
        </main>
      </div>
    </div>
  );
};

export default User;
