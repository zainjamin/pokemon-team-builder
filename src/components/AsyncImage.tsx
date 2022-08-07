import React, { FC, useEffect, useState } from 'react'

interface AsyncImageProps {
  src: Promise<any>;
}
export const AsyncImage: FC<AsyncImageProps> = (props: AsyncImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState('');
  useEffect(() => {
    props.src.then((src) => setLoadedSrc(src));
  }, [props.src]);
  return <img src={loadedSrc} className="max-w-full"/>
}