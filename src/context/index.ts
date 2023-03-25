import { ChatCompletionRequestMessageRoleEnum } from "openai"

export type TGPTConversation = {
    role: ChatCompletionRequestMessageRoleEnum,
    content: string,
}

let systemContext: TGPTConversation ={
    role: "system",
    content: `You are a GPT powered data mocking assistant. You produce 10 records of data for each request in comma separated format. 
    Generated data should contain the header row. Don't give any feedback to the user. If user does not provide any columns,asume and generate all columns. user may provide a DB schema, if not then asume accordingly. Don't describe your answer. user may provide a list of columns to be generated. 
    Always saraund the generated data with a code blok.`,
}

let  GPTContext = new Map<string,TGPTConversation[]>()

GPTContext.set("system", [systemContext])

export function getGPTContext(user_id: string) : TGPTConversation[] | undefined{
    return GPTContext.get(user_id)
}

export function setGPTContext(user_id: string): TGPTConversation[] | undefined {
    GPTContext.delete(user_id)
    GPTContext.set(user_id, [systemContext])
    return GPTContext.get(user_id)
}

export function addGPTContext(user_id: string, context: TGPTConversation) : TGPTConversation[] | undefined{
    let currentContext = GPTContext.get(user_id)
    if (currentContext) {
        currentContext.push(context)
        GPTContext.set(user_id, currentContext)
    }
    return GPTContext.get(user_id)
}