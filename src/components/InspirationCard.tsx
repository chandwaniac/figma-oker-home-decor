import { Heart, Bookmark, MoreHorizontal, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { InspirationPost } from '../data/products';
import clsx from 'clsx';

interface InspirationCardProps {
  post: InspirationPost;
}

export default function InspirationCard({ post }: InspirationCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likes, setLikes] = useState(post.likes);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
            {post.author.avatar}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
            {post.author.isVerified && (
              <BadgeCheck size={14} className="text-[#F5A623] fill-[#F5A623]" />
            )}
          </div>
        </div>
        <button className="p-1 text-gray-400">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div
        className="relative aspect-[4/5] bg-gray-100 cursor-pointer"
        onClick={() => navigate('/post/' + post.id)}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />

        {post.products && post.products.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {post.products.slice(0, 2).map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <div className="max-w-[100px]">
                    <p className="text-[10px] text-gray-500 truncate">{product.brand}</p>
                    <p className="text-[11px] font-medium text-gray-900 truncate">{product.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button onClick={handleLike} className="flex items-center gap-1.5">
              <Heart
                size={22}
                className={clsx(
                  'transition-colors',
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'
                )}
              />
              <span className="text-sm text-gray-600">{likes}</span>
            </button>
          </div>
          <button onClick={handleSave}>
            <Bookmark
              size={22}
              className={clsx(
                'transition-colors',
                isSaved ? 'fill-black text-black' : 'text-gray-700'
              )}
            />
          </button>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-1">{post.title}</h3>

        {post.description && (
          <p className="text-xs text-gray-500 line-clamp-2">{post.description}</p>
        )}
      </div>
    </div>
  );
}
