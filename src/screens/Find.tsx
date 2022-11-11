import { VStack, FormControl, Stack, Heading, useToast } from "native-base";


import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { useState } from "react";
import { api } from "../services/api";

import { useNavigation } from "@react-navigation/native";
import { PoolPros } from "../components/PoolCard";

export function Find() {
    const { navigate } = useNavigation()

    const [ isLoading, setIsLoading ] = useState(false)

    const toast = useToast()

    const [polls, setPolls] = useState<PoolPros[]>([])
    const [code, setCode] = useState('')
    
    async function handleJoinPoll() {
        try {
            setIsLoading(true)

            if (!code.trim()) {
                setIsLoading(false)
                return toast.show({
                    title: "Informe o código",
                    placement: "top",
                    bgColor: "red.500"
                })
                
            }

            const response = await api.post("/polls/join", {code})

            setCode('')
            setIsLoading(false)
            
            
            toast.show({
                title: "Você entrou no bolão",
                placement: "top",
                bgColor: "red.500"
            })
            navigate("polls")

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            if (error.response?.data?.message === "Poll not found!!") {
                return toast.show({
                    title: "Bolão não encontrado",
                    placement: "top",
                    bgColor: "red.500"
                })
            }

            if (error.response?.data?.message === "User already participates in the pool!!") {
                return toast.show({
                    title: "Você já está nesse bolão",
                    placement: "top",
                    bgColor: "red.500"
                })
            }

        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header showBackButton title="Buscar por código" />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading  fontFamily="heading" color="white" fontSize={"xl"} mb={8} textAlign="center">
                    Encontre um bolão através de {'\n'} seu código único
                </Heading>
                <FormControl>
                    <Stack space={4}>
                        <Input placeholder="Qual nome do seu bolão?" onChangeText={setCode} autoCapitalize="characters" />
                        <Button title="Buscar bolão?" isLoading={isLoading} onPress={handleJoinPoll} />
                    </Stack>
                </FormControl>
            </VStack>

        </VStack>
    )
}