import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useQuery, UseQueryResult } from 'react-query';
import { PostPageType, PostType } from '@lib/interfaces/PostsType';
import { searchByQuery } from 'queries';
import Post from '@components/main/Post';
import Pagination from '@components/main/Pagination';
import Loading from '@components/Loading';
import NotFound from '@components/main/NotFound';
import PostTitle from '@components/PostTitle';

const postsPerPage = 4;

let start: number,
  end: number = 0;

const SearchPage = (props: PostPageType) => {
  const router = useRouter();
  const search = router.query.q as string;
  const page: string = router.query.page_index as string;
  start = (parseInt(page) - 1) * postsPerPage;
  end = parseInt(page) * postsPerPage - 1;

  const { isLoading, isError, error, data }: UseQueryResult<PostPageType | undefined, Error> = useQuery<
    PostPageType | undefined,
    Error
  >([`search_${search}`, page], () => searchByQuery(search, start, end), {
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

  if (data && data.posts.length > 0) {
    const numberOfPosts = data.numberOfPosts;
    return (
      <>
        <Head>
          <title>Search for {search}</title>
        </Head>
        <div className="posts">
          <div className="container">
            <h1 className="text-center text-2xl font-bold">Search for "{search}"</h1>
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
                urlName={`search`}
                query={search}
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
  const data = await searchByQuery(query.q as string, start, end);
  if (!data?.posts.length) {
    return {
      notFound: true,
    };
  }
  return { props: data };
};

export default SearchPage;
