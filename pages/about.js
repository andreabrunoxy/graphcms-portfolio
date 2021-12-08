import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { getAuthors } from '../lib/data';
import Image from 'next/image';

const About = ({ data }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-0 flex flex-col">
      <h2 className="text-4xl font-semibold text-gray-900 mb-8 pt-8 self-center">
        <span className="text-blue-900 font-bold">About</span> Page
      </h2>
      <h2 className="text-3xl font-semibold text-gray-900 mb-8 pt-8 self-center">
        Team Members
      </h2>
      {data.authors.map(author => (
        <div key={author.id}>
          <Fade triggerOnce fraction={0.3}>
            <div className="max-w-3xl flex flex-col justify-center items-center p-6 border border-gray-200 shadow-lg">
              <h4 className="font-semibold text-gray-800 text-2xl">{author.name}</h4>
              <div className="mt-4 mb-4 pb-4 border-b border-gray-200">
                <Image src={author.image.url} height="100" width="100" />
              </div>
              <p className="text-gray-800 text-lg leading-relaxed mt-4">
                {author.biography}
              </p>
            </div>
          </Fade>
        </div>
      ))}
    </div>
  );
};

export default About;

export const getStaticProps = async () => {
  const data = await getAuthors();
  return {
    props: {
      data
    }
  };
};
