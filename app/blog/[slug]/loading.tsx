export default function Loading() {
  return (
    <div className='min-h-screen flex flex-col animate-pulse-fast'>
      {/* Main Image Placeholder */}
      <div className='relative mt-12 w-full h-96 bg-foreground/20 rounded-lg ring-4 ring-foreground/30'></div>

      <div className='pt-6 flex flex-col text-left'>
        {/* Author Info Placeholder */}
        <div className='flex items-center space-x-4'>
          <div className='w-8 h-8 rounded-full bg-foreground/20'></div>
          <div className='w-24 h-4 rounded-md bg-foreground/20'></div>
          <div className='w-32 h-4 rounded-md bg-foreground/20'></div>
        </div>

        {/* Post Title Placeholder */}
        <div className='mt-14 w-1/2 h-8 rounded-md bg-foreground/20'></div>

        {/* Post Body Placeholder */}
        <section className='mt-9 space-y-4'>
          <div className='w-full h-4 rounded-md bg-foreground/20'></div>
          <div className='w-full h-4 rounded-md bg-foreground/20'></div>
          <div className='w-3/4 h-4 rounded-md bg-foreground/20'></div>
        </section>
      </div>
    </div>
  );
}
