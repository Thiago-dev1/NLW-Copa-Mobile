import { Octicons } from "@expo/vector-icons"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

import { VStack, Icon, Text, View, Image, Stack, Center, useToast, FlatList } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCard } from "../components/PoolCard";

import { api } from "../services/api";


interface pollsProps {
    Participant: {
        id: string;
        User: {
            AvatartUrl: string | null;
        };
    }[];
    owner: {
        id: string;
        name: string;
    } | null;
    _count: {
        Participant: number;
    };
    id: string,
    title: string,
    code: string
}


export function Polls() {
    const { navigate } = useNavigation()

    const toast = useToast()

    const [ isLoading, setIsLoading ] = useState(true)
    const [polls, setPolls] = useState<pollsProps[]>([])

    async function fetchPolls() {
        try {
            setIsLoading(true)

            const response = await api.get("/polls")
            setPolls(response.data)
        } catch (error) {
            console.log(error)

            toast.show({
                title: "Falha",
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPolls()
    }, []))

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus Bolões" />
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button
                    title="Buscar bolão por código"
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                    onPress={() => navigate('find')}
                />
            </VStack>

            {
                isLoading ? <Loading /> : <FlatList
                data={polls}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return <Stack key={item.id} bg="gray.600" flexDirection="row" p="4" justifyContent="space-between" alignItems="center" rounded="sm" borderBottomWidth="4" borderBottomColor="yellow.500" mb={3}>
                        <View>
                            <Text color="white" fontWeight="bold">{item.title}</Text>
                            <Text color="white">Criado por {item.owner.name}</Text>
                        </View>
                        <View flexDirection="row">
                            {item.Participant.map(participant => {
                                return (
                                    <Image key={participant.id} width="8" height="8" rounded={"3xl"} source={{ uri: participant.User.AvatartUrl }} alt={`Nome do bolão ${item.title}`} />
                                );
                            })}
                            {item._count.Participant > 4 ?
                                <Center w={8} h={8} bgColor="gray.700" rounded="full" borderWidth={1} borderColor="gray.800">
                                    <Text color="gray.100" fontSize="xs" fontFamily="medium">
                                        {item._count.Participant ? `+${item._count.Participant - 4}` : 0}
                                    </Text>
                                </Center>
                                : null}
                        </View>
                    </Stack>;
                }}
                px={5}
                showsVerticalScrollIndicator={false}
                _contentContainerStyle={{pb: 10}}
                ListEmptyComponent={() => <EmptyPoolList />}
                />
            }
        </VStack>
    )
}