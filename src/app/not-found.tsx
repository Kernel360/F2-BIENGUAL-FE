import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Component() {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-12 text-center">
        <div className="space-y-6">
          <h1 className="text-9xl font-bold tracking-tighter animate-bounce">
            404
          </h1>
          <h2 className="text-3xl font-semibold">Oops! Page Not Found</h2>
          <p className="text-lg">Ready to continue your learning journey?</p>
          <Link href="/">
            <Button className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 mt-6">
              Return to Biengual
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
