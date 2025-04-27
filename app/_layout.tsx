import { Stack } from "expo-router";
import "./global.css"

export default function RootLayout() {
  return( 
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
    );
}
