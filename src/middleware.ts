import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'

export function middleware() {
  // For now, just allow all routes - we'll add auth protection later
  // You can add authentication logic here when needed
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}