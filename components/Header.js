import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

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
    }
  ];
  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="text-4xl font-bold text-gray-900">My Portfolio</div>
        <div className="flex justify-between mt-4 md:mt-0">
          {navLinks.map((link, index) => (
            <ul key={index} className="px-1 md:px-2 text-lg md:text-xl">
              <Link href={link.href}>
                <a
                  className={`hover:text-blue-600 transition-colors duration-300 ${
                    router.pathname === link.href ? 'text-blue-900 font-semibold' : ''
                  } `}
                >
                  {link.name}
                </a>
              </Link>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
