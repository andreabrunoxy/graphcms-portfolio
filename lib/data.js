import { gql, GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(endpoint);

export const getPostsAndPortfolio = async () => {
  const query = gql`
    {
      portfolios(first: 3, orderBy: date_DESC) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
      posts(first: 3, orderBy: date_DESC) {
        title
        slug
        description
        date
        tags
        coverImage {
          url
        }
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;
  return await graphQLClient.request(query);
};

export const getPortfolioItems = async () => {
  const query = gql`
    {
      portfolios(orderBy: date_DESC) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
    }
  `;
  return await graphQLClient.request(query);
};

export const getPosts = async () => {
  const query = gql`
    {
      posts(orderBy: date_DESC) {
        title
        slug
        description
        date
        tags
        coverImage {
          url
        }
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;
  return await graphQLClient.request(query);
};

export const getPortfolioItem = async slug => {
  const query = gql`
    query getPortfolio($slug: String!) {
      portfolios(where: { slug: $slug }) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
        content {
          raw
        }
      }
    }
  `;
  const variables = {
    slug
  };

  return await graphQLClient.request(query, variables);
};

export const getPortfolioSlugs = async () => {
  const query = gql`
    query {
      portfolios {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPost = async slug => {
  const query = gql`
    query getPost($slug: String!) {
      posts(where: { slug: $slug }) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
        }
        author {
          name
          image {
            url
          }
        }
        content {
          raw
        }
      }
    }
  `;
  const variables = {
    slug
  };

  return await graphQLClient.request(query, variables);
};

export const getBlogSlugs = async () => {
  const query = gql`
    query {
      posts {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPhotos = async () => {
  const query = gql`
    {
      photos(orderBy: date_DESC) {
        id
        date
        title
        description
        photo {
          id
          url
          height
          width
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getAuthors = async () => {
  const query = gql`
    {
      authors {
        id
        name
        biography
        image {
          url
          width
          height
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};
