import { createContext, ReactNode, useState, useEffect } from "react"
import * as Google from "expo-auth-session/providers/google"
import * as AuthSession from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import { api } from "../services/api"

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
    name: string;
    avatarUrl: string;
}

interface AuthContextProviderProps {
    children: ReactNode
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps) 

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [isUserLoading, setIsUserLoading] = useState(false)
    const [user, setUser] = useState<UserProps>({} as UserProps)

   const [request, response, promptAsync ] = Google.useAuthRequest({
        clientId: "610269519666-h81rlc0i49dil6fni6kg9dgid52jhm0v.apps.googleusercontent.com",
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    

    async function signIn() {
        try {
            setIsUserLoading(true)
            await promptAsync()

        } catch (error) {
            console.log(error)
            throw(error)
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInWithGoogle(access_token: string) {
        try {
            setIsUserLoading(true)

            const tokenResponse = await api.post("/users", {access_token})

            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data}`

            const userInfoResponse = await api.get('/me')
            setUser(userInfoResponse.data)

        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
    }

    useEffect(() => {
        if(response?.type === "success" && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken)
        }
    }, [response])

    return (
        <AuthContext.Provider value={{signIn, isUserLoading, user}}>
            { children }
        </AuthContext.Provider>
    )
}