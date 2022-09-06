import { TransactionJson } from "../interfaces";

export interface Message {
  message: string;
  value: unknown | undefined;
}

export const messageCreator = (txArray: TransactionJson[]): string => {
  let messages: Message[] = []
  for (const txData of txArray) {
    const msgTo = { message: "to:", value: txData.receiverId }
    messages.push(msgTo)
    for (const txDataAction of txData.actions) {
      messages.push({ message: "transaction data action", value: txDataAction.type })
    }
  }
  return messages
    .map(({ message, value }) => message + " " + String(value))
    .join("\n");
}


