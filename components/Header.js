import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const navLinks = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'About',
      href: '/about'
    },
    {
      name: 'Portfolio',
      href: '/portfolio'
    },
    {
      name: 'Blog',
      href: '/blog'
    },
    {
      name: 'Gallery',
      href: '/gallery'
    },
    {
      name: 'Contacts',
      href: '/contacts'
    }
  ];
  return (
    <div className="w-full p-6 dark:text-gray-100 dark:bg-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          <span className="text-blue-900 dark:text-blue-500">My</span> Portfolio
        </div>
        <div className="flex flex-wrap pl-8 pr-8 md:p-0 justify-center md:justify-between mt-4 md:mt-0">
          {navLinks.map((link, index) => (
            <ul key={index} className="px-1 md:px-2 text-lg md:text-xl">
              <Link href={link.href}>
                <a
                  className={`hover:text-blue-600 transition-colors duration-300 ${
                    router.pathname === link.href
                      ? 'text-blue-900 dark:text-blue-500 font-semibold'
                      : ''
                  } `}
                >
                  {link.name}
                </a>
              </Link>
            </ul>
          ))}
        </div>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="h-12 w-24 order-2 md:order-3 text-3xl"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {`${theme === 'dark' ? '☀' : '🌙'}`}
        </button>
      </div>
    </div>
  );
};

export default Header;
