import { ModeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='max-w-lg space-y-8'>
        <h1 className='text-2xl'>hey</h1>
        <p>hey</p>
      </div>
      <ModeToggle />
    </div>
  );
}
