import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsAndPortfolio } from '../lib/data';
import Hero from '../components/Hero';
import { Fade } from 'react-awesome-reveal';

export default function Home({ data }) {
  // console.log(data);
  return (
    <div className="flex flex-col max-w-full mx-auto justify-center items-center dark:bg-gray-800">
      <Head>
        <title>GraphCMS Portfolio</title>
        <meta name="description" content="Next Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <div className="max-w-4xl mx-2 grid lg:grid-cols-12 gap-6">
        {/*Porftolio Section*/}
        <div className="px-2 lg:px-0 lg:col-span-8">
          {data.portfolios.map(portfolio => (
            <div key={portfolio.slug}>
              <Fade triggerOnce fraction={0.3}>
                <div>
                  <Link href={`/portfolio/${portfolio.slug}`}>
                    <a>
                      <div className="relative mb-10 border-2 shadow-xl">
                        <div className="absolute w-full h-full z-10 opacity-50 bg-blue-900"></div>
                        <div className="absolute w-full h-full z-20 flex flex-col justify-center items-center text-center px-4">
                          <h3 className="text-white text-xl md:text-3xl font-semibold dark:text-gray-100 ">
                            {portfolio.title}
                          </h3>
                          <p className="text-gray-200 md:text-lg leading-relaxed mt-4 hidden md:flex dark:text-gray-100">
                            {portfolio.description}
                          </p>
                          <div className="mt-4">
                            {portfolio.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-gray-200 text-xs md:text-sm uppercase tracking-wide m-2 bg-blue-900 px-2 py-1 rounded-lg"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Image
                          src={portfolio.coverImage.url}
                          height={portfolio.coverImage.height}
                          width={portfolio.coverImage.width}
                          layout="responsive"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              </Fade>
            </div>
          ))}
          <Link href="/portfolio">
            <a className="font-semibold text-gray-900 mx-auto dark:text-gray-100 ">
              Discover more on Portfolio page.
            </a>
          </Link>
        </div>

        {/*Blog Section*/}
        <div className="container mx-auto lg:col-span-4">
          <Fade triggerOnce>
            <div className="mt-10 mx-2 border border-gray-200 shadow-lg px-2">
              <h2 className="text-4xl font-semibold text-gray-900 pt-8 px-2 mb-8 dark:text-gray-100">
                Recent Posts
              </h2>
              {data.posts.map(post => (
                <div key={post.slug}>
                  <Fade triggerOnce cascade fraction={0.3}>
                    <div className="py-2">
                      <div className="">
                        <p className="text-gray-600 text-sm mb-4 px-2 dark:text-gray-100">
                          {new Date(post.date).toDateString()}
                        </p>
                        {/* <div className="p-2 bg-cover">
                          <Image
                            src={post.coverImage.url}
                            width="600"
                            height="400"
                            layout="responsive"
                          />
                        </div> */}
                      </div>
                      <div className="col-span-3 p-2 flex flex-col place-items-start mt-2  mb-8 w-full last:after:hidden">
                        <Link href={`/blog/${post.slug}`}>
                          <a className="text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-300 dark:text-gray-100">
                            {post.title}
                          </a>
                        </Link>
                        <p className="text-gray-600 leading-6 mt-4 mb-4 dark:text-gray-100">
                          {post.description}
                        </p>
                        <div className="text-sm text-gray-700 font-semibold dark:text-gray-100">
                          {post.author.name}
                        </div>
                      </div>
                    </div>
                  </Fade>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await getPostsAndPortfolio();
  return {
    props: {
      data
    }
  };
};
