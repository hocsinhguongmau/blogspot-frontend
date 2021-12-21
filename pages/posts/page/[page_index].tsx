import React from 'react';
import Head from 'next/head';
import Post from '@components/main/Post';
import { PostPageType, PostType } from '@lib/interfaces/PostsType';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Pagination from '@components/main/Pagination';
import { getAllPosts } from 'queries';
import { useRouter } from 'next/dist/client/router';
import { useQuery, UseQueryResult } from 'react-query';
import Loading from '@components/Loading';
import NotFound from '@components/main/NotFound';
import PostTitle from '@components/PostTitle';

const postsPerPage = 4;
let start: number,
  end: number = 0;

const PostPage = (props: PostPageType) => {
  const router = useRouter();
  const page: string = router.query.page_index as string;

  start = (parseInt(page) - 1) * postsPerPage;
  end = parseInt(page) * postsPerPage - 1;

  const { isLoading, isError, error, data }: UseQueryResult<PostPageType | undefined, Error> = useQuery<
    PostPageType | undefined,
    Error
  >(['allPosts', page], () => getAllPosts(start, end), {
    initialData: props,
  });

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

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const page: string = query.page_index as string;

  start = (parseInt(page) - 1) * postsPerPage;
  end = parseInt(page) * postsPerPage;
  const data = await getAllPosts(start, end);
  if (!data?.posts.length) {
    return {
      notFound: true,
    };
  }
  return { props: data };
};

export default PostPage;
