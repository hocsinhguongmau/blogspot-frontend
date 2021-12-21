import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useQuery, UseQueryResult } from 'react-query';
import { PostPageType, PostType } from '@lib/interfaces/PostsType';
import { getPostsByTag, getTag } from 'queries';
import Post from '@components/main/Post';
import Pagination from '@components/main/Pagination';
import Loading from '@components/Loading';
import NotFound from '@components/main/NotFound';
import PostTitle from '@components/PostTitle';

const postsPerPage = 4;
const page = '1';

const TagPage = (props: PostPageType) => {
  const router = useRouter();
  const tag = router.query.tag_name as string;
  const { isLoading, isError, error, data }: UseQueryResult<PostPageType | undefined, Error> = useQuery<
    PostPageType | undefined,
    Error
  >([`postsByTag_${tag}`, 1], () => getPostsByTag(tag, 0, postsPerPage), {
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
    return <NotFound />;
  } else {
    const numberOfPosts = data.numberOfPosts;
    return (
      <>
        <Head>
          <title>Posts in {data.title?.title}</title>
        </Head>
        <div className="posts">
          <div className="container">
            <PostTitle string={data.title?.title} />
            <div className="posts__wrapper">
              {data.posts.map((post: PostType) => (
                <Post classes="posts__item" key={post.title} post={post} button={true} size={[150, 100]} />
              ))}
            </div>
            {numberOfPosts! > postsPerPage ? (
              <Pagination
                currentPage={parseInt(page)}
                numberOfPosts={numberOfPosts!}
                postsPerPage={postsPerPage}
                maxPages={5}
                urlName={`tag/${tag}`}
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

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const data = await getPostsByTag(params?.tag_name as string, 0, postsPerPage);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: data };
};

export const getStaticPaths = async () => {
  const tags = await getTag();
  const paths = tags.map((tag) => ({
    params: {
      tag_name: tag.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default TagPage;
