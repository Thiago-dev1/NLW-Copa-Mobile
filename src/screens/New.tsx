import { Text, VStack, FormControl, Stack, Heading } from "native-base";


import Logo from "../assets/logo.svg"
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Header } from "../components/Header";

export function New() {
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
                        <Input placeholder="Qual nome do seu bolão?" />
                        <Button title="Criar meu bolão" />
                        <Text color="white" textAlign="center">
                            Após criar seu bolão, você receberá um {'\n'} código único que poderá usar para convidar {'\n'} outras pessoas.
                        </Text>
                    </Stack>
                </FormControl>
            </VStack>

        </VStack>
    )
}