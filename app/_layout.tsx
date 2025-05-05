import { Stack } from "expo-router";
import "./global.css"
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return( 
    <>
   
    <StatusBar hidden={true}></StatusBar>
  <Stack >
    //stack.screen is used to hid the header of navigation
    <Stack.Screen
    name="(tabs)"
    options={{headerShown:false,}}
    />
    <Stack.Screen
    name="movies/[id]"
    options={{headerShown:false,}}
    />
  </Stack>
  </>
    );
}
