import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { getPost, getBlogSlugs } from '../../lib/data';

export default function Home({ post }) {
  console.log(post);
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }
      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }
      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case 'image':
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };
  return (
    <div className="flex justify-center">
      <Head>
        <title>Next Portfolio</title>
        <meta name="description" content="Next Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex-col m-6 p-6 lg:w-1/2 border-gray-400 shadow-md">
        <h1 className="font-bold text-6xl mb-4">{post.title}</h1>
        <p className="mb-4">{new Date(post.date).toDateString()}</p>
        <div className="mb-4 text-xs">
          {post.tags.map(tag => (
            <span
              className="text-xs md:text-sm uppercase tracking-wide mr-2 bg-gray-200 px-2 py-1 rounded-lg"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <p className="font-semibold mb-4 mr-4">{post.author.name}</p>
          <Image src={post.author.image.url} width="60" height="60" />
        </div>
        <div className="after:inline-block border-b border-gray-200 mb-8 leading-relaxed"></div>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: {
      post: post.posts[0]
    }
  };
};

export const getStaticPaths = async () => {
  const slugsRes = await getBlogSlugs();
  const slugs = slugsRes.posts;
  return {
    paths: slugs.map(slug => ({ params: { slug: slug.slug } })),
    fallback: false
  };
};