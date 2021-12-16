import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { getAuthors } from '../lib/data';
import Image from 'next/image';
import PageTitle from '../components/PageTitle';

const About = ({ data }) => {
  return (
    <div className="max-w-full mx-auto px-4 lg:px-0 flex flex-col dark:bg-gray-800">
      <PageTitle text="About" />
      <h3 className="text-3xl font-semibold text-gray-900 mb-8 pt-2 self-center dark:text-gray-100">
        Team Members
      </h3>
      <div className="md:flex max-w-4xl mx-auto">
        {data.authors.map(author => (
          <div key={author.id}>
            <Fade triggerOnce fraction={0.3}>
              <div className="max-w-3xl flex flex-col justify-center items-center m-4 p-6 border border-gray-200 shadow-lg">
                <h4 className="font-semibold text-gray-800 text-2xl dark:text-gray-100">
                  {author.name}
                </h4>
                <div className="mt-4 mb-4 pb-4 border-b border-gray-200">
                  <Image src={author.image.url} height="100" width="100" />
                </div>
                <p className="text-gray-800 text-lg leading-relaxed mt-4 dark:text-gray-100">
                  {author.biography}
                </p>
              </div>
            </Fade>
          </div>
        ))}
      </div>
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
