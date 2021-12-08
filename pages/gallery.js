import React from 'react';
import { getPhotos } from '../lib/data';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

const blurImages = async photos => {
  const images = await Promise.all(
    photos.map(async image => {
      const { base64, img } = await getPlaiceholder(image.photo.url, { size: 10 });
      return {
        ...img,
        base64,
        id: image.id,
        description: image.description,
        date: image.date
      };
    })
  );
  return images;
};

const Gallery = ({ blurredPhotos }) => {
  return (
    <>
      <div className="flex">
        <h2 className="text-4xl font-semibold text-gray-900 mb-8 pt-8 mx-auto">
          <span className="text-blue-900 font-bold">Gallery</span> Page
        </h2>
      </div>
      <div className="max-w-3xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {blurredPhotos.map(photo => (
          <Image
            key={photo.id}
            src={photo.src}
            width={photo.width / 3}
            height={photo.height / 3}
            placeholder="blur"
            layout="responsive"
            objectFit="cover"
            blurDataURL={photo.base64}
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;

export const getStaticProps = async () => {
  const photoResponse = await getPhotos();
  const { photos } = photoResponse;
  const blurredPhotos = await blurImages(photos);

  return {
    props: {
      revalidate: 3600,
      blurredPhotos
    }
  };
};
