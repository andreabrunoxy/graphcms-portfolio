import { useState } from 'react';
import { request } from 'graphql-request';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { Fade } from 'react-awesome-reveal';
import PageTitle from '../../components/PageTitle';

const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);

const BlogPage = ({ posts }) => {
  const [searchValue, setSearchValue] = useState('');
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const prevPage = () => {
    setSkip(skip - 2);
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setSkip(skip + 2);
    setCurrentPage(currentPage + 1);
  };

  const { data, error } = useSWR(
    [
      process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
      `query getPosts($searchValue: String $skip: Int) {
        postsConnection(
          orderBy: date_DESC
          where: {title_contains: $searchValue}
          first: 2
          skip: $skip
        ) {
          edges {
            node {
              id
              title
              date
              slug
              description
              coverImage {
                url
              }
              author {
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            pageSize
          }
        }
      }`,
      searchValue,
      skip
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue, skip }),
    {
      initialData: posts,
      revalidateOnFocus: true
    }
  );

  if (error) {
    return (
      <div>
        <h2>There was an error fetching data.</h2>
      </div>
    );
  }
  console.log(posts);

  return (
    <div className="flex flex-col dark:bg-gray-800">
      <PageTitle text="Blog" />
      <input
        type="text"
        value={searchValue}
        placeholder="🔍 Search blog posts"
        onChange={e => setSearchValue(e.target.value)}
        className="w-200 md:w-1/3 lg:w-1/4 h-10 rounded-full pl-2 mt-4 mx-auto border border-gray-400 focus:outline-none focus:ring-1 focus:drop-shadow-md focus:ring-gray-500"
      />
      <div className="mt-4">
        {data &&
          data.postsConnection.edges.map(post => (
            <div key={post.node.slug}>
              <Fade triggerOnce fraction={0.3}>
                <Link href={`/blog/${post.node.slug}`}>
                  <div className="max-w-3xl mt-8 mb-8 mx-4 md:mx-auto px-4 border border-gray-200 shadow-lg hover:transition-transform hover:-translate-y-1 duration-300 cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-4 py-4">
                      <div className="col-span-1">
                        <p className="text-gray-600 text-sm mb-4 dark:text-gray-100">
                          {new Date(post.node.date).toDateString()}
                        </p>
                        <div>
                          <Image
                            src={post.node.coverImage.url}
                            width="600"
                            height="400"
                            layout="responsive"
                          />
                        </div>
                      </div>
                      <div className="col-span-3 p-4">
                        <a className="text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-300 dark:text-gray-100">
                          {post.node.title}
                        </a>
                        <p className="text-gray-600 leading-relaxed mt-4 mb-4 dark:text-gray-100">
                          {post.node.description}
                        </p>
                        <div className="text-sm text-gray-700 font-semibold dark:text-gray-100  ">
                          {post.node.author.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Fade>
            </div>
          ))}
      </div>
      {data && (
        <div className="flex space-x-5 justify-center items-center">
          <div>
            <button
              onClick={() => prevPage()}
              disabled={!data.postsConnection.pageInfo.hasPreviousPage}
              className="bg-blue-900 text-white px-3 py-1 rounded-md disabled:bg-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed"
            >
              Prev
            </button>
          </div>
          <div>
            <button
              onClick={() => nextPage()}
              disabled={!data.postsConnection.pageInfo.hasNextPage}
              className="bg-blue-900 text-white px-3 py-1 rounded-md disabled:bg-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          {!searchValue && (
            <div className="text-gray-800 dark:text-gray-100">
              Page: {currentPage} of {Math.ceil(posts.postsConnection.edges.length / 2)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;

export const getStaticProps = async () => {
  const data = await fetcher(
    process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    `
    query getPosts {
      postsConnection(
        orderBy: date_DESC
      ) {
        edges {
          node {
            id
            title
            date
            slug
            description
            coverImage {
              url
            }
            author {
              name
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
`
  );

  return {
    props: {
      posts: data
    }
  };
};
