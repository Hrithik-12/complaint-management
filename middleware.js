// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; 

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/register';
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value || '';
  
  // If path is public and user has token, redirect to dashboard
  if (isPublicPath && token) {
    try {
      // Verify token using jose library 
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      // Redirect based on role
      return NextResponse.redirect(new URL(`/com-man/${payload.role}`, request.url));
    } catch (error) {
      // Invalid token - continue to public page
      return NextResponse.next();
    }
  }
  
  // If path requires auth and user doesn't have valid token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // For protected routes, verify the token
  if (!isPublicPath && token) {
    try {
      // Verify token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      // Check if user has access to the specific role route
      if (path.includes('/com-man/admin') && payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Add the config to specify which paths this middleware applies to
export const config = {
  matcher: ['/login', '/register', '/com-man/:path*']
};