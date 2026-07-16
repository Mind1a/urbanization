import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch(
        "https://urbantransformation-wzta.onrender.com/api/slider/"
    );

    const data = await response.json();

    return NextResponse.json(data);
}
