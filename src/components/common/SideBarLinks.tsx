import Link from 'next/link';
import { Bell, Home, Search, User2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeToggleBtn } from './ThemeToggleBtn';
import SignOutBtn from './SignOutBtn';

function SideBarLinks() {
  const pathName = usePathname();
  return (
    <div className="flex flex-col justify-between h-[85vh]">
      <ul className="mt-10">
        <li>
          <Link
            href="/"
            className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold ${
              pathName == '/' ? 'font-bold' : ''
            }`}
          >
            <Home height={25} width={25} />
            <h3 className="text-lg lg:text-xl">Home</h3>
          </Link>
        </li>

        <li>
          <Link
            href="/explore"
            className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold ${
              pathName == '/explore' ? 'font-bold' : ''
            }`}
          >
            <Search height={25} width={25} />
            <h3 className="text-lg lg:text-xl">Exolore</h3>
          </Link>
        </li>

        <li>
          <Link
            href="/notifications"
            className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold ${
              pathName == '/notifications' ? 'font-bold' : ''
            }`}
          >
            <Bell height={25} width={25} />
            <h3 className="text-lg lg:text-xl">Notifications</h3>
          </Link>
        </li>

        <li>
          <Link
            href="/profile"
            className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold ${
              pathName == '/profile' ? 'font-bold' : ''
            }`}
          >
            <User2 height={25} width={25} />
            <h3 className="text-lg lg:text-xl">Profile</h3>
          </Link>
        </li>
      </ul>

      <div className="flex items-center float-left">
        <SignOutBtn />
        <ThemeToggleBtn />
      </div>
    </div>
  );
}

export default SideBarLinks;
