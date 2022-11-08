import { VStack, Icon, Text } from "native-base";
import { useEffect, useState } from 'react';
import { Fontisto } from "@expo/vector-icons"


import Logo from "../assets/logo.svg"
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
    // const [count, setCount] = useState(0)

    // useEffect(() => {
    //     fetch("http://10.10.10.184:3333/users/count")
    //       .then(response => response.json())
    //       .then(data => setCount(data.count))
    //   }, [])
    
      
    const { signIn, isUserLoading } = useAuth()

    return (
        <VStack flex={1} bgColor="gray.900" alignItems="center" justifyContent="center" p={7} >
            <Logo width={212} height={40} />
            <Button
                title="Entrar com google"
                type="SECONDARY"
                leftIcon={<Icon as={Fontisto}
                    name="google"
                    color="white"
                    size="md" />}
                mt={12}
                onPress={signIn}
                isLoading={isUserLoading}
                _loading={{_spinner: {color:'white'}}}
            />
            <Text color="white" mt={4}>
                Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
            </Text>
        </VStack>
    )
}