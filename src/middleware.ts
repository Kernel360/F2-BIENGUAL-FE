import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 서버컴포넌트에서는 쿠키 접근 가능
  const token = request.cookies.get('access_token');
  // token없으면 어느 페이지에서든 /login으로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next({ request });
}

export const config = {
  matcher: ['/mypage/:path*'],
};
