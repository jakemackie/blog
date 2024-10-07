import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { headers } from 'next/headers';
import { SinglePost } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// Helper function to build image URLs from Sanity assets
const imageUrlBuilder = (ref: string) => {
  const [_, id, dimensions, format] = ref.split('-');
  return `https://cdn.sanity.io/images/mq1cydnb/production/${id}-${dimensions}.${format}`;
};

export default async function Post() {
  const headerList = headers();
  const slug = headerList.get('x-current-path')?.replace('/blog/', '');
  const post: SinglePost | null = await client.fetch(
    groq`
      *[_type == "post" && slug.current == $slug][0]{
        title,
        slug,
        body,
        author->{
          name,
          image
        },
        mainImage{
          alt,
          asset{
            _ref
          }
        },
        publishedAt
      }
    `,
    { slug }
  );

  if (!post) {
    notFound();
  }

  console.log(post.author);

  post.publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.publishedAt || Date.now()));

  // Extracting the post body content as text
  const body = post.body
    .map((block) => block.children.map((child) => child.text).join(' '))
    .join('\n');

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Main Image */}
      {post.mainImage && post.mainImage.asset && post.mainImage.asset._ref && (
        <div className='relative mt-12 w-full h-96'>
          <Image
            src={imageUrlBuilder(post.mainImage.asset._ref)}
            alt={post.mainImage.alt || 'Post image'}
            fill
            className='object-cover rounded-lg'
          />
        </div>
      )}
      <div className='pt-6 flex flex-col text-left'>
        {/* Author Info */}
        <div className='flex items-center space-x-4'>
          {post.author.image?.asset?._ref ? (
            <Image
              src={imageUrlBuilder(post.author.image.asset._ref)}
              alt='Placeholder image'
              width={32}
              height={32}
              className='rounded-full'
            />
          ) : (
            <Image
              src='/32.32'
              alt='Placeholder image'
              fill
              className='rounded-full'
            />
          )}
          <p className='font-medium'>{post.author.name}</p>
          <p className='text-gray-500'>{post.publishedAt}</p>
        </div>

        {/* Post Title */}
        <h2 className='pt-12 text-5xl font-semibold'>{post.title}</h2>

        {/* Post Body */}
        <section className='pt-6'>
          <p className='text-left text-lg leading-loose'>{body}</p>
        </section>
      </div>
    </div>
  );
}
