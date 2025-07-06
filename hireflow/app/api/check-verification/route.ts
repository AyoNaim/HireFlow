import { account } from "@/app/lib/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await account.get();
        NextResponse.json({ verified: user.emailVerification })
    } catch (error) {
        NextResponse.json({ verified: false })
    }
}