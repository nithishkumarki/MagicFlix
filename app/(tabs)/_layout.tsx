import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { ImageBackground,Image } from 'react-native'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TabIcon=({focused,icon,title}:any)=>{
    if(focused)
    {

    
    return(
        <ImageBackground  
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <Image source={icon}  tintColor="#151312" className="size-5" />
            <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
        </ImageBackground>
    )
}
else{
    return(
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#A8B5DB" className="size-5" />
        </View>
    )
}

}

const _Layout = () => {
  return (
    <Tabs>
        //tab.screen is used to hide 
        <Tabs.Screen
        name="index"
        options={
            {
                title:'Home',
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <>
                          <TabIcon 
                        focused={focused} 
                        icon={icons.home} 
                        title="home"
                        />
                    </>
                )

            }
        }
        />
        <Tabs.Screen
        name="saved"
        options={
            {
                title:'Saved',
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <>
                        <TabIcon 
                        focused={focused} 
                        icon={icons.save} 
                        title="saved"
                        />
                    </>
                )
            }
        }
        />
        <Tabs.Screen
        name="search"
        options={
            {
                title:'Search',
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <>
                        <TabIcon 
                        focused={focused} 
                        icon={icons.search} 
                        title="search"
                        />
                    </>
                )
                
            }
        }
        />
        <Tabs.Screen
        name="profile"
        options={
            {
                title:'Profile',
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <>
                        <TabIcon 
                        focused={focused} 
                        icon={icons.person} 
                        title="profile"
                        />
                    </>
                )
            }
        }
        />
    </Tabs>
  )
}

export default _Layout