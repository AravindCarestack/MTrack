import { geolocation, ipAddress } from "@vercel/edge";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
//   const req = request.json();
//   const ipAddress = request.headers.get("x-forwarded-for");

  const geoData = geolocation(request);
  console.log(geoData)
  console.log(request.headers.get('x-dcmguid'),'dcmguid')
  console.log(request.headers.get('x-up-subno'),'subno')
  console.log(request.headers.get('x-jphone-uid'),'jphone')
  console.log(request.headers.get('x-em-uid'),'em-uid')
//   request.headers.set("x-locV", JSON.stringify(geoData));
  return NextResponse.next();
}
