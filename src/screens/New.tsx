import { useState } from "react";
import { Text, VStack, FormControl, Stack, Heading, useToast } from "native-base";

import Logo from "../assets/logo.svg"
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { api } from "../services/api";



export function New() {
    const [ title, setTitle ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const toast = useToast()

    async function handlePollCreate() {
        if(!title.trim()) {
            return toast.show({
                title: "Informe um nome para seu bolão",
                placement: "top",
                bgColor: "red.500"
            })
        }

        try {
            setIsLoading(true)
            const response =  await api.post("/polls", {title})

            toast.show({
                title: "Bolão criado com sucesso",
                placement: "top",
                bgColor: "green.500"
            })

            setTitle('')

        } catch (error) {
            console.log(error)

            toast.show({
                title: "Não foi possivel criar o bolão",
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false)
        } 
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" />

            <VStack mt={8} mx={5} alignItems="center">
                <Logo width={212} height={40}/>
                <Heading  fontFamily="heading" color="white" fontSize={"xl"} my={8} textAlign="center">
                    Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
                </Heading>
                <FormControl>
                    <Stack space={4}>
                        <Input placeholder="Qual nome do seu bolão?" onChangeText={setTitle} value={title} />
                        <Button title="Criar meu bolão" onPress={handlePollCreate} isLoading={isLoading}/>
                        <Text color="white" textAlign="center">
                            Após criar seu bolão, você receberá um {'\n'} código único que poderá usar para convidar {'\n'} outras pessoas.
                        </Text>
                    </Stack>
                </FormControl>
            </VStack>
        </VStack>
    )
}