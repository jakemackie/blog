import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './theme-toggle';

export default function Navbar() {
  const navItems = [
    {
      name: 'Blog',
      url: '/blog',
    },
    {
      name: 'Projects',
      url: '/projects',
    },
    {
      name: 'About',
      url: '/about',
    },
  ];

  return (
    <div className='border-b'>
      <nav className='mx-auto max-w-screen-lg px-4 lg:px-0 flex justify-between items-center py-4'>
        <div>
          <Link href='/' className='text-2xl font-bold'>
            jake
          </Link>
        </div>
        <ul className='flex items-center space-x-4 font-medium'>
          {navItems.map((page) => (
            <li key={page.name}>
              <Link href={page.url}>
                <Button variant='outline'>{page.name}</Button>
              </Link>
            </li>
          ))}
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
}
