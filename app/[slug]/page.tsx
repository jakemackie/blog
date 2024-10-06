import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { headers } from 'next/headers';
import { SinglePost } from '@/types';
import { notFound } from 'next/navigation';

export default async function Post() {
  const headerList = headers();
  const slug = headerList.get('x-current-path')?.replace('/', '');
  const post: SinglePost | null = await client.fetch(
    groq`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      slug,
      author->{
        name,
        image
      },
      publishedAt
    }
  `,
    { slug: slug }
  );

  if (!post) {
    notFound();
  }

  console.log(post);

  const body = post.body
    .map((block) => block.children.map((child) => child.text).join(' '))
    .join('\n');

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='max-w-lg'>
        <h2 className='text-4xl font-bold'>{post.title}</h2>
        <h3 className='text-lg font-medium'>By {post.author.name}</h3>
        <section>
          <p>{body}</p>
        </section>
      </div>
    </div>
  );
}
