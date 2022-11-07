import { VStack, FormControl, Stack, Heading } from "native-base";


import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Header } from "../components/Header";

export function Find() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header showBackButton title="Buscar por código" />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading  fontFamily="heading" color="white" fontSize={"xl"} mb={8} textAlign="center">
                    Encontre um bolão através de {'\n'} seu código único
                </Heading>
                <FormControl>
                    <Stack space={4}>
                        <Input placeholder="Qual nome do seu bolão?" />
                        <Button title="Buscar bolão?" />
                    </Stack>
                </FormControl>
            </VStack>

        </VStack>
    )
}