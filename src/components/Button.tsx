import { Button as ButtonReactNative, Text, IButtonProps } from "native-base"


interface ButtonProps extends IButtonProps {
    title: string,
    type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({title, type = "PRIMARY", ...rest}: ButtonProps) {
    return (
        <ButtonReactNative
            w="full"
            h={14}
            rounded="sm"
            fontSize="md"
            bg={type === "SECONDARY" ? "red.400" : "yellow.300"}
            _pressed={{
                bg: type === "SECONDARY" ? "red.600" : "yellow.600"
            }}
            {...rest}
        >
            <Text textTransform="uppercase" fontSize="sm" fontFamily="heading" color={type === "SECONDARY" ? "white" : "black"}>
                {title}
            </Text>
        </ButtonReactNative>
    )
}