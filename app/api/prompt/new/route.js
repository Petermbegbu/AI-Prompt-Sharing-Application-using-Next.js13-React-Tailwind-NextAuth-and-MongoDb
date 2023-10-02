import { connectToDB } from "@/utils/database";
import Prompt from "@/models/Prompt";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { _userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = Prompt.create({ _userId, prompt, tag });

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response(
      `Prompt creation failed due to the following error - ${error}`,
      { status: 500 }
    );
  }
};
