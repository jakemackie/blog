import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { SinglePost } from '@/types';

export default async function getPosts(): Promise<SinglePost[]> {
  const posts = await client.fetch(groq`
      *[_type == "post"] {
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
    `);
  return posts;
}
