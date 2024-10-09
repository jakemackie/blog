import getPosts from '@/utils/getPosts';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className='flex flex-col'>
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

            // Extracting the post body content as text
            const body = post.body
              .map((block) =>
                block.children.map((child) => child.text).join(' ')
              )
              .join('\n');

            return (
              <div key={post.slug.current} className='relative group text-left'>
                <div className='pointer-events-none absolute mx-auto -top-5 -left-2 right-0 w-[105%] h-96 bg-indigo-500 rounded-xl filter blur-xl opacity-15 group-hover:opacity-50 transition-opacity duration-700'></div>
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
                  <div className='py-5 flex items-center space-x-3'>
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
                    <span className='text-gray-500'>/</span>
                    <p className='text-gray-500'>{formattedDate}</p>
                  </div>
                  <h3 className='text-2xl font-medium group-hover:text-indigo-500 transition-colors duration-300 ease-out'>
                    {post.title}
                  </h3>
                  {/* Categories */}
                  <p className='pt-2 text-gray-500 leading-relaxed text-lg'>
                    {body.length > 100 ? `${body.slice(0, 100)}...` : body}
                  </p>
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
