import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

import { JWT } from './env';
import { isAdminRole, isSuperAdminRole, isValidRole } from './helpers';

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get('token');
  const { origin } = req.nextUrl;

  if (!jwt) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(`${origin}/auth/inicia-sesion`);
    }

    if (req.nextUrl.pathname.startsWith('/perfil')) {
      return NextResponse.redirect(`${origin}/auth/inicia-sesion`);
    }

    return NextResponse.next();
  }

  const { payload }: any = await jwtVerify(jwt, new TextEncoder().encode(JWT));

  if (req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(`${origin}/`);
  }

  if (req.nextUrl.pathname.startsWith('/perfil')) {
    if (!payload.user.role_id) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin/variantes')) {
    if (!isSuperAdminRole(payload.user.role_id)) {
      return NextResponse.redirect(`${origin}/admin`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin/codigos')) {
    if (!isSuperAdminRole(payload.user.role_id)) {
      return NextResponse.redirect(`${origin}/admin`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin/comentarios')) {
    if (!isAdminRole(payload.user.role_id)) {
      return NextResponse.redirect(`${origin}/admin`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin/direcciones')) {
    if (!isAdminRole(payload.user.role_id)) {
      return NextResponse.redirect(`${origin}/admin`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin/ratings')) {
    if (!isAdminRole(payload.user.role_id)) {
      return NextResponse.redirect(`${origin}/admin`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin/usuarios')) {
    if (!isAdminRole(payload.user.role_id)) {
      return NextResponse.redirect(`${origin}/admin`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!isValidRole(payload.user.role_id)) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.next();
}
