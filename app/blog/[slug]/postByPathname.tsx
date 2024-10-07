'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PostByPathname() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const slug = pathname.split('/').pop();
    if (slug) {
      router.push(`/blog/${slug}`);
    }
  }, [pathname, router]);

  return null;
}
