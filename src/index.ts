import * as dotenv from 'dotenv' 
import { addGPTContext, getGPTContext, setGPTContext, TGPTConversation } from './context';
dotenv.config()
import {openai } from "./services/openai/config";
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query:any) => new Promise((resolve) => rl.question(query, resolve))

type TCompletionMessage = TGPTConversation[]
async function getCompletion(context: TCompletionMessage | undefined) {
    if(!context) return
    console.log(context)
    const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: context,
    });
    console.log(response.data)
    return response.data.choices[0].message?.content

}

async function  main() {
    let userContext =  setGPTContext("test")
    //Get input from user
    while(true){
    let content =await prompt("User : ") as string
    let newMessage: TGPTConversation = {
        role: "user",
        content,
    }
    if (userContext !== undefined) {
        userContext = addGPTContext("test", newMessage)
        let completion = await getCompletion(userContext)
        if(completion){
            addGPTContext('test',{
                role: 'assistant',
                content: completion
            })
        }
        console.log(completion)
    }
}
    //console.log(await getCompletion("This is a test"))
}

main()