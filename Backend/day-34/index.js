import "dotenv/config"
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mail.services.js";
import * as z from "zod"


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "use this tool to sends an email",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email")
        })
    }
)


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const model = new ChatMistralAI({
    model: "mistral-small-latest"
});

const agent = createAgent({
    model,
    tools: [ emailTool ]
})

const messages = []

while (true) {
    const userInput = await rl.question("You: ")
    messages.push(new HumanMessage(userInput))
    const response = await agent.invoke({
        messages
    })
    messages.push(response.messages[ response.messages.length - 1 ])
    console.log(`AI: ${response.messages[ response.messages.length - 1 ].content}`)
}