import React from 'react';

import type { GetStaticProps } from 'next';
import { useQuery, UseQueryResult } from 'react-query';
import Head from 'next/head';
import NewPosts from '@components/main/NewPosts';
import RecentPosts from '@components/main/RecentPosts';
import PopularPosts from '@components/main/PopularPosts';

import { getPosts } from 'queries';
import { PostsType } from '@lib/interfaces/PostsType';
import Loading from '@components/Loading';
import NotFound from '@components/main/NotFound';

export interface InitialDataProps {
  posts: PostsType;
}

const Home = ({ posts }: InitialDataProps) => {
  const { isLoading, isError, error, data }: UseQueryResult<PostsType, Error> = useQuery<PostsType, Error>(
    'posts',
    getPosts,
    {
      initialData: posts,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>{error?.message}</p>
      </div>
    );
  }

  if (!data) {
    return <NotFound />;
  } else {
    return (
      <>
        <Head>
          <title>Blogspot</title>
          <meta name="description" content="Blogspot" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <NewPosts posts={data.mainPosts.slice(0, 4)} />
          <RecentPosts posts={data.mainPosts.slice(4, 12)} />
          {/* <PopularPosts posts={data.popularPosts} /> */}
        </main>
      </>
    );
  }
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { posts: PostsType };
}> => {
  const posts = await getPosts();

  return { props: { posts: posts } };
};

export default Home;
