import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "native-base"

import { PlusCircle, SoccerBall } from "phosphor-react-native"


import { New } from "../screens/New"
import { Polls } from "../screens/Polls"
import { Find } from "../screens/Find"


const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
    const { colors, sizes } = useTheme()


    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarLabelPosition: 'beside-icon',
            tabBarActiveTintColor: colors.green[800],
            tabBarInactiveTintColor: colors.blue[800],
            tabBarStyle: {
                position: "absolute",
                height: sizes[22],
                borderTopWidth: 0,
                backgroundColor: colors.gray[800]
            },
            tabBarItemStyle: {
                position: "relative",
                top: Platform.OS === "android" ? -10 : 0
            }
        }}>
            <Screen name="new" component={New} options={{
                tabBarIcon: ({ color }) => <PlusCircle color={color} />,
                tabBarLabel: "Novo Bolão"
            }} />

            <Screen name="polls" component={Polls} options={{
                tabBarIcon: ({ color }) => <SoccerBall color={color} />,
                tabBarLabel: "Meus Bolões"
            }} />

            <Screen name="find" component={Find} options={{ tabBarButton: () => null}} />
        </Navigator>

    )
}