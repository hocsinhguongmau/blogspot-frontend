import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useQuery, UseQueryResult } from 'react-query';
import { PostPageType, PostType } from '@lib/interfaces/PostsType';
import { getAllPosts } from 'queries';
import Post from '@components/main/Post';
import Pagination from '@components/main/Pagination';
import NotFound from '@components/main/NotFound';
import Loading from '@components/Loading';
import PostTitle from '@components/PostTitle';

const postsPerPage = 4;
const page = '1';

const PostPage = (props: PostPageType) => {
  const { isLoading, isError, error, data }: UseQueryResult<PostPageType | undefined, Error> = useQuery<
    PostPageType | undefined,
    Error
  >(['allPosts', 1], () => getAllPosts(0, postsPerPage), {
    initialData: props,
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>{error?.message}</p>
      </div>
    );
  }
  if (data) {
    const numberOfPosts = data.numberOfPosts;

    return (
      <>
        <Head>
          <title>All posts</title>
        </Head>
        <div className="posts">
          <div className="container">
            <PostTitle string="All posts" />
            <div className="posts__wrapper">
              {data.posts.map((post: PostType) => (
                <Post classes="posts__item" key={post.title} post={post} button={true} size={[150, 100]} />
              ))}
            </div>
            {numberOfPosts > postsPerPage ? (
              <Pagination
                currentPage={parseInt(page)}
                numberOfPosts={numberOfPosts}
                postsPerPage={postsPerPage}
                maxPages={5}
                urlName={'posts'}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </>
    );
  } else {
    return <NotFound />;
  }
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPosts(0, postsPerPage);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: data };
};

export default PostPage;
