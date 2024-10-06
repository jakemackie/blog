import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { Author } from '@/types';

export default async function Home() {
  const authors = await client.fetch(groq`*[_type=="author"]`);
  console.log(authors);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='max-w-lg space-y-8'>
        {authors.map((author: Author) => (
          <pre key={author._id}>{JSON.stringify(author, null, 2)}</pre>
        ))}
      </div>
    </div>
  );
}
