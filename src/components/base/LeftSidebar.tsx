'use client';
import Image from 'next/image';

import SideBarLinks from '../common/SideBarLinks';

function LeftSidebar() {
  return (
    <div className="h-screen border-r-2 md:w-1/4 lg:p-10 md:pt-5 hidden md:block">
      <div className="flex justify-start items-center">
        <Image src="/images/logo.svg" width={50} height={50} alt="logo" />
        <h1 className="font-bold text-xl ml-2">Threads</h1>
      </div>

      <SideBarLinks />
    </div>
  );
}

export default LeftSidebar;
