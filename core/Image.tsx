'use client';

import ImageBase, { ImageProps } from 'next/image'; // Rename the import to avoid confusion
import { useState } from 'react';

const CustomImage: React.FC<ImageProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageBase
      {...props}
      className={`${props.className} opacity-0 transition-opacity duration-700`}
      onLoad={(image) => {
        setIsLoaded(true);
        (image.currentTarget as HTMLImageElement).classList.remove('opacity-0');
        (image.currentTarget as HTMLImageElement).classList.add('opacity-100');
      }}
    />
  );
};

// Export CustomImage as Image type
export default CustomImage as typeof ImageBase;
