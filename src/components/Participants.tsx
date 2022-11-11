import { Avatar, Center, HStack, Text } from 'native-base';

export interface ParticipantProps {
  id: string;
  User: {
    name: string;
    AvatartUrl: string;
  };
};

interface Props {
  Participant: ParticipantProps[];
  count: number;
};

export function Participants({Participant, count }: Props) {

  return (
    <HStack>
      {
        Participant && Participant.map((participant) => (
          <Avatar
            key={participant.id}
            source={{ uri: participant.User.AvatartUrl}}
            w={8}
            h={8}
            rounded="full"
            borderWidth={2}
            marginRight={-3}
            borderColor="gray.800"
          >
           {participant.User?.name?.at(0).toUpperCase()}
          </Avatar>
        ))
      }

     {Participant?.length > 3 ? 
      <Center w={8} h={8} bgColor="gray.700" rounded="full" borderWidth={1} borderColor="gray.800">
        <Text color="gray.100" fontSize="xs" fontFamily="medium">
          {count ? `+${count - 4}` : 0}
        </Text>
      </Center>
      :
      null
      }
    </HStack>
  );
}