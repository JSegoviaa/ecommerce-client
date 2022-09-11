import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get('token');

  if (!jwt) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/auth/inicia-sesion', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/perfil')) {
      return NextResponse.redirect(new URL('/auth/inicia-sesion', req.url));
    }

    return NextResponse.next();
  }

  const { payload }: any = await jwtVerify(
    jwt,
    new TextEncoder().encode('JaBoNaRtE-TeSt-2022')
  );

  if (req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/perfil')) {
    if (!payload.user.role_id) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (
      payload.user.role_id !== 1 &&
      payload.user.role_id !== 2 &&
      payload.user.role_id !== 3
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}
