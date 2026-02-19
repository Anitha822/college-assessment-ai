import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // TASK 1 - System Prompt for College Assessment Result Form
  const systemPrompt = ` you are a security person,you stop people and ask them why.
    give som security advice
`;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    // TASK 2 - Tool Calling (Enable if needed)
    // tools,
    // maxSteps: 5,
  });

  return result.toUIMessageStreamResponse();
}
