import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  // const requestObj = req.json()
  const l = req
  const d =await req.json()
  console.log(d,'ddd')
  const {navigatorDetail,appVersion,installedApp,batteryPercent,userAgentData,contactDetail} = await d
  console.log(`Location Details is ${l}`,{navigatorDetail,appVersion,batteryPercent,installedApp,userAgentData,contactDetail})
  

return NextResponse.json({ message: l });
}
