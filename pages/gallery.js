import React from 'react';
import { getPhotos } from '../lib/data';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import PageTitle from '../components/PageTitle';

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
    <div className="max-w-full dark:bg-gray-800">
      <div className="max-w-full flex justify-center">
        <PageTitle text="Gallery" />
      </div>
      <div className="max-w-3xl mt-4 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-2">
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
    </div>
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
