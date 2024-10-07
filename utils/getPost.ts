import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { SinglePost } from '@/types';

export default async function getPosts(postSlug: string): Promise<SinglePost> {
  const post = await client.fetch(
    groq`
      *[_type == "post" && slug.current == $postSlug] {
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
    { postSlug }
  );
  return post;
}
