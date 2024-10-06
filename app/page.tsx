import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Link from 'next/link';

export default async function Home() {
  type PostSlug = {
    slug: string;
  };

  const postSlugs = await client.fetch(groq`
    *[_type == "post"]{
      "slug": slug.current
    }
  `);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col max-w-lg space-y-2'>
        {postSlugs.map((postSlug: PostSlug) => (
          <Link key={postSlug.slug} href={`/${postSlug.slug}`}>
            {postSlug.slug}
          </Link>
        ))}
      </div>
    </div>
  );
}
