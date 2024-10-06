import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Link from 'next/link';
import Image from 'next/image';

export default async function Blog() {
  type Post = {
    title: string;
    slug: string;
    author: {
      name: string;
      image: string;
    };
  };

  const posts = await client.fetch(groq`
    *[_type == "post"]{
      "title": title,
      "slug": slug.current,
      "author": author->{
        "name": name,
        "image": image
      },
    }
  `);

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex flex-col text-center'>
        <p className='pt-16 font-medium'>The blog</p>
        <h2 className='pt-2 text-5xl font-semibold'>Most recent posts</h2>
        <p className='pt-4'>
          The latest posts from the blog. Click on a post to read more.
        </p>
        <section className='pt-16 grid grid-cols-1 lg:grid-cols-2 justify-center gap-24'>
          {posts.map((post: Post) => (
            <div key={post.slug} className='text-left'>
              <Link
                className='mx-auto flex flex-col'
                key={post.slug}
                href={`/${post.slug}`}
              >
                <Image
                  src='/500x350.svg'
                  alt='Placeholder image'
                  width={500}
                  height={350}
                />
                <h3 className='pt-4 text-xl font-medium'>{post.title}</h3>
              </Link>
              <Link href='/404' className='pt-0.5'>
                By {post.author.name}
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
