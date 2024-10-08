import getPosts from '@/utils/getPosts';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from '@/core/Image';
import { SinglePost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog',
};

// Helper function to build image URLs from Sanity assets
const imageUrlBuilder = (ref: string) => {
  const [_, id, dimensions, format] = ref.split('-');
  return `https://cdn.sanity.io/images/mq1cydnb/production/${id}-${dimensions}.${format}`;
};

export default async function Blog() {
  const posts: SinglePost[] = await getPosts();

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex flex-col text-center'>
        <p className='pt-16 font-medium'>The blog</p>
        <h2 className='pt-2 text-5xl font-semibold'>Most recent posts</h2>
        <p className='pt-4'>
          The latest posts from the blog. Click on a post to read more.
        </p>
        <section className='pt-16 grid grid-cols-1 lg:grid-cols-2 justify-center gap-x-12 gap-y-24'>
          {posts.map((post: SinglePost) => {
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(post.publishedAt || Date.now()));

            return (
              <div key={post.slug.current} className='relative group text-left'>
                <div className='z-10 pointer-events-none absolute mx-auto bottom-20 left-0 right-0 h-10 w-full bg-indigo-500 rounded-full filter blur-xl opacity-15 group-hover:opacity-25 transition-opacity duration-700'></div>
                <Link
                  className='mx-auto flex flex-col'
                  href={`/blog/${post.slug.current}`}
                >
                  <div className='relative w-full h-[350px] rounded-lg overflow-hidden ring-4 ring-transparent group-hover:ring-indigo-500 transition-all duration-300 ease-out'>
                    <div className='absolute inset-0'>
                      {post.mainImage?.asset?._ref ? (
                        <Image
                          src={imageUrlBuilder(post.mainImage.asset._ref)}
                          alt={post.mainImage.alt || 'Post image'}
                          fill
                          priority={true}
                          sizes='500px'
                          className='object-cover'
                        />
                      ) : (
                        <Image
                          src='/500x350.svg'
                          alt='Placeholder image'
                          fill
                          sizes='500px'
                          className='object-cover'
                        />
                      )}
                    </div>
                  </div>
                  {/* Author Info */}
                  <div className='pt-4 flex items-center space-x-4'>
                    {post.author.image &&
                    post.author.image.asset &&
                    post.author.image.asset._ref ? (
                      <Image
                        src={imageUrlBuilder(post.author.image.asset._ref)}
                        alt='Author image'
                        width={32}
                        height={32}
                        className='rounded-full'
                      />
                    ) : (
                      <Image
                        src='/32x32.svg'
                        alt='Placeholder image'
                        width={32}
                        height={32}
                        className='rounded-full'
                      />
                    )}
                    <p className='font-medium'>{post.author.name}</p>
                    <p className='text-gray-500'>{formattedDate}</p>
                  </div>
                  <h3 className='pt-4 text-xl font-medium group-hover:text-indigo-500 transition-colors duration-300 ease-out'>
                    {post.title}
                  </h3>
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
