import { connectToDB } from "@/utils/database";
import Prompt from "@/models/Prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ _userId: params.id }).populate(
      "_userId"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch all prompt - ${error}`, {
      status: 500,
    });
  }
};
