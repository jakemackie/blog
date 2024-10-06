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
      name: 'About',
      url: '/about',
    },
    {
      name: 'Contact',
      url: '/contact',
    },
    {
      name: 'Projects',
      url: '/projects',
    },
  ];

  return (
    <div className='border-b'>
      <nav className='mx-auto max-w-screen-lg flex justify-between items-center py-4'>
        <div>
          <Link href='/' className='text-2xl font-bold'>
            jake.cat
          </Link>
        </div>
        <ul className='flex items-center space-x-4 font-medium'>
          {navItems.map((page) => (
            <li key={page.name}>
              <Button variant='outline'>
                <Link href={page.url}>{page.name}</Link>
              </Button>
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
