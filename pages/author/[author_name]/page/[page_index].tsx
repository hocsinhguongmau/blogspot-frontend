import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useQuery, UseQueryResult } from 'react-query';
import { getPostsByAuthor } from 'queries';
import Pagination from '@components/main/Pagination';
import Post from '@components/main/Post';
import { AuthorPageType, authorType, PostType } from '@lib/interfaces/PostsType';
import Loading from '@components/Loading';
import NotFound from '@components/main/NotFound';
import PostTitle from '@components/PostTitle';

const postsPerPage = 4;

let start: number,
  end: number = 0;

const AuthorPage = (props: AuthorPageType) => {
  const router = useRouter();
  const author = router.query.author_name as string;
  const page: string = router.query.page_index as string;
  start = (parseInt(page) - 1) * postsPerPage;
  end = parseInt(page) * postsPerPage - 1;
  const { isLoading, isError, error, data }: UseQueryResult<AuthorPageType | undefined, Error> = useQuery<
    AuthorPageType | undefined,
    Error
  >([`postsByAuthor_${author}`, page], () => getPostsByAuthor(author, start, end), {
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

  if (!data) {
    return (
      <>
        <NotFound />
      </>
    );
  } else {
    const numberOfPosts = data.numberOfPosts;
    return (
      <>
        <Head>
          <title>Posts by {data.author.name}</title>
        </Head>
        <div className="posts">
          <div className="container">
            <PostTitle author={true} string={data.author.name} />
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
                urlName={`author/${author}`}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const page: string = query.page_index as string;
  start = (parseInt(page) - 1) * postsPerPage;
  end = parseInt(page) * postsPerPage;
  const data = await getPostsByAuthor(query?.author_name as string, start, end);
  if (!data?.posts.length) {
    return {
      notFound: true,
    };
  }
  return { props: data };
};

export default AuthorPage;
