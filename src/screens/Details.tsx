import {  useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react";
import { Share } from "react-native"
import { HStack, useToast, VStack } from "native-base";

import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolPros, PoolCard } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";


import { api } from "../services/api";
import { Guesses } from "../components/Guesses";


interface RouteParams {
    id: string
}

export function Details() {
    const route = useRoute()
    const { id } = route.params as RouteParams

    const toast = useToast()

    const [isLoading, setIsLoading] = useState(false)
    const [optionSelected, setOptionSelected] = useState<"Seus palpites" | "Ranking do grupo">("Seus palpites")
    const [pollsDetails, setPollsDetails] = useState<PoolPros>({} as PoolPros)

    async function fecthPollsDetails() {
        try {
            setIsLoading(true)


            const response = await api.get(`/polls/${id}`)

            setPollsDetails(response.data)
        } catch (error) {
            console.log(error)

            toast.show({
                title: "Não foi possivel carregar os detalhes bolões",
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
       await Share.share({
            message: pollsDetails.code
        })
    }

    useEffect(() => {
        fecthPollsDetails()
    }, [id])

    if(isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={pollsDetails.title} showBackButton showShareButton onShare={handleCodeShare} />
            {pollsDetails._count?.Participant > 0 ?
                <VStack flex={1} px={5}>
                    <PoolHeader data={pollsDetails}/>
                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option 
                            title="Seus palpites" 
                            isSelected={optionSelected === "Seus palpites"}
                            onPress={() => setOptionSelected("Seus palpites")}
                            />
                        <Option 
                            title="Ranking do grupo" 
                            isSelected={optionSelected === "Ranking do grupo"}
                            onPress={() => setOptionSelected("Ranking do grupo")}
                            />
                    </HStack>

                    <Guesses poolId={pollsDetails.id} />
                </VStack>
            : <EmptyMyPoolList code={pollsDetails.code} onShare={handleCodeShare}/>
            }
        </VStack>
    )
}