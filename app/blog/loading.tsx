export default async function Loading() {
  const fakePosts = ['post-1', 'post-2'];
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex flex-col text-center'>
        <p className='pt-16 font-medium'>The blog</p>
        <h2 className='pt-2 text-5xl font-semibold'>Most recent posts</h2>
        <p className='pt-4'>
          The latest posts from the blog. Click on a post to read more.
        </p>
        <section className='animate-pulse-fast pt-16 grid grid-cols-1 lg:grid-cols-2 justify-center gap-x-12 gap-y-24'>
          {fakePosts.map((post) => (
            <div key={post} className='group text-left'>
              <li className='mx-auto flex flex-col'>
                <div className='relative w-full h-[350px] rounded-lg overflow-hidden ring-4 ring-foreground/30'>
                  <div className='absolute inset-0'>
                    <div className='size-full object-cover bg-foreground/20'></div>
                  </div>
                </div>
                {/* Author Info */}
                <div className='pt-4 flex items-center space-x-4'>
                  <div className='size-8 rounded-full bg-foreground/20'></div>
                  <div className='w-24 h-3 rounded-md bg-foreground/20'></div>
                  <div className='w-24 h-3 rounded-md bg-foreground/20'></div>
                </div>
                <div className='mt-6 w-36 h-4 rounded-md bg-foreground/20'></div>
              </li>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
