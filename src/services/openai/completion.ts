import { addGPTContext, getGPTContext, setGPTContext, TGPTConversation } from '../../context';
import {openai } from "./config";



type TCompletionMessage = TGPTConversation[]
export async function getCompletion(context: TCompletionMessage | undefined) {
    if(!context) return
    console.log(context)
    const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: context,
    });
    console.log(response.data.choices[0].message?.content)
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