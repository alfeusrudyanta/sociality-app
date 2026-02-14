import { CommentOverlay } from '@/components/shared/comment-overlay';
import { useState } from 'react';

type ProfilePostItemProps = {
  id: number;
  imageUrl: string;
};

export const ProfilePostItem: React.FC<ProfilePostItemProps> = ({
  id,
  imageUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        onClick={() => setIsOpen(true)}
        src={imageUrl}
        alt={String(id)}
        className='aspect-square w-full cursor-pointer'
      />

      <CommentOverlay id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
