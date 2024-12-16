'use client';

export default function LoadingSpinner({
  size = 'default',
  className = '',
}: {
  size?: 'small' | 'default' | 'large';
  className?: string;
}) {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        className={`relative ${sizeClasses[size]} ${className} border-4 border-t-transparent border-primary rounded-full animate-spin`}
      />
    </div>
  );
}
