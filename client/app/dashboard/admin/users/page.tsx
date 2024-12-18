"use client";
import AllUsersSection from "@/components/admin/users/allUsersSection";
import globalApi from "@/services/globalApi";
import React, { useEffect, useState } from "react";

const page = () => {
  const [allUsers, getAllUsers] = useState(null);
  useEffect(() => {
    globalApi.getAllUsers().then((resp) => {
      getAllUsers(resp.data);
    });
  }, []);
  if (!allUsers) {
    return <div>Loading...</div>; // Optional: Loading state
  }
  return (
    <div className="mt-6 mx-8">
      <div className="text-3xl text-primary">All Users</div>
      <div className="text-gray-500 font-thin">Manage users for your page!</div>
      <main>
        {/* users */}
        <section>
          <h2 className="text-2xl text-primary font-semibold my-4"></h2>
          <div>
            <AllUsersSection users={allUsers} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
