import { Chat, ChatStatus } from '../generated/graphql.d';

export const activeSwapsSend = ({
  chatSender = [],
}: {
  chatSender: Pick<Chat, 'status'>[];
}) => {
  return chatSender.filter((chat) => chat.status !== ChatStatus.Swapped);
};

export const activeSwapsReceive = ({
  chatRecipient = [],
}: {
  chatRecipient: Pick<Chat, 'status'>[];
}) => {
  return chatRecipient.filter((chat) => chat.status !== ChatStatus.Swapped);
};
