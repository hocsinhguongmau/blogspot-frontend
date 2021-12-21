import React from 'react';

type Props = {
  string: string | undefined;
  author?: boolean;
};

const PostTitle = ({ string, author }: Props) => {
  return (
    <h1 className="text-center text-2xl font-bold">
      Posts {author ? 'by' : 'in'} {string}
    </h1>
  );
};

export default PostTitle;
