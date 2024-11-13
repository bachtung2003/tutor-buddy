import React, { Suspense } from "react";
import SideNav from "../../../components/ui/sidenav-student";
import Header from "../../../components/ui/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="h-screen absolute md:fixed md:w-64  md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {/* Use Suspense to display a loading fallback */}
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </div>
  );
};

export default Layout;
