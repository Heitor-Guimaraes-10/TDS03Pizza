import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/Presentation/Views/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { RegisterScreen } from "./src/Presentation/Views/register/Register";

export type RootStackParamList = {
  Inicial: undefined;
  RegisterScreen: undefined;
}

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{
        headerShown: false
        
        }}>
           <Stack.Screen 
        name="Inicial" component={HomeScreen}
         />
        <Stack.Screen 
        name="RegisterScreen" component={RegisterScreen}
         options={{
         headerShown : true ,
         title: "Novo Usuario"
         }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
      
export default App;