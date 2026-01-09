import { useNavigate } from 'react-router-dom';

interface BrandSpotlightProps {
  title?: string;
  subtitle?: string;
  image: string;
  brandName?: string;
}

export default function BrandSpotlight({
  title = 'Celebrate togetherness',
  subtitle = 'Your perfect blend of style and serenity',
  image,
  brandName
}: BrandSpotlightProps) {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full aspect-[9/11] overflow-hidden cursor-pointer"
      onClick={() => navigate('/shop')}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="text-xs uppercase tracking-wider mb-1 opacity-90">{subtitle}</p>
        <h2 className="text-2xl font-semibold leading-tight">{title}</h2>

        <button className="mt-4 bg-[#F5A623] text-black font-medium px-6 py-2.5 rounded-full text-sm">
          Shop Now
        </button>
      </div>

      {brandName && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-xs font-medium text-gray-800">{brandName}</span>
        </div>
      )}
    </div>
  );
}
