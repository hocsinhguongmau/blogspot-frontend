import React, { ReactElement } from 'react';
import { AiOutlineLoading3Quarters } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters';

interface Props {}

function Loading(): ReactElement {
  return (
    <div className="text-center">
      <AiOutlineLoading3Quarters className="animate-spin inline-block" />
    </div>
  );
}

export default Loading;
