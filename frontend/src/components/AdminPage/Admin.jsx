import Gradient from "../partial/Gradient";
import React, { useEffect, useState } from "react";
import UserDB from "./adminComponents/UserDB";

const Admin = () => {
  return (
    <main className="flex flex-grow justify-center relative isolate px-6 pt-14 lg:px-8">
      <Gradient />
      <UserDB />
    </main>
  );
};

export default Admin;
