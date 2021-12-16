import { getPortfolioItems } from '../../lib/data';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import { Fade } from 'react-awesome-reveal';
import PageTitle from '../../components/PageTitle';

const PortfolioPage = ({ data }) => {
  console.log(data);
  return (
    <div className="max-w-full mx-auto px-4 lg:px-0 flex flex-col dark:bg-gray-800 justify-center">
      <PageTitle text="Portfolio" />
      {data.portfolios.map(portfolio => (
        <div key={portfolio.slug}>
          <Fade triggerOnce fraction={0.3}>
            <div className="max-w-4xl mt-4 mx-auto">
              <Link href={`/portfolio/${portfolio.slug}`}>
                <a>
                  <div className="relative mb-10 border-2 shadow-xl hover:transition-transform hover:-translate-y-1 duration-300">
                    <div className="absolute w-full h-full z-10 opacity-50 bg-blue-900"></div>
                    <div className="absolute w-full h-full z-20 flex flex-col justify-center items-center text-center px-4">
                      <h3 className="text-white text-xl md:text-3xl font-semibold ">
                        {portfolio.title}
                      </h3>
                      <p className="text-gray-200 md:text-lg leading-relaxed mt-4 hidden md:flex">
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
    </div>
  );
};

export default PortfolioPage;

export const getStaticProps = async () => {
  const data = await getPortfolioItems();
  return {
    props: {
      data
    }
  };
};
