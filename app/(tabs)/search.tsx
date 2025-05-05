import { View, Text, ActivityIndicator,FlatList,Image } from 'react-native'
import {useState,useEffect} from 'react'
import React from 'react'
import { images } from '@/constants/images'
import {fetchMovies} from '@/services/api';
import useFetch from '@/services/useFetch'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons';
import SearchBar from "@/components/SearchBar";
import {updateSearchCount} from '@/services/appwrite'


const Search = () =>
{
  const {data:movies,loading:moviesLoading, error:moviesError,refetch:loadingMovies,reset,}=useFetch(()=>fetchMovies({query:searchQuery}),false);

  const [searchQuery,setSearchQuery]=useState('');

   console.log("\n SearchPage searchquery"+searchQuery+ " moviesloading=" + moviesLoading + " movieserrorr" + moviesError);
  //Debouncing(concept): to make the search more user friendly we are using a timeout of 500ms to wait for the user to finish typing before making the api call
  useEffect(()=>{
    const timeoutId=setTimeout(async()=>{
      
      if(searchQuery.trim())
        {
          await loadingMovies();   
        }
        else{
          reset();
        }
      }, 500);
      return ()=>clearTimeout(timeoutId);
  },[searchQuery]);

  useEffect(()=>{
    if(movies && movies?.length>0)
      {
      updateSearchCount(searchQuery,movies[0]);
     alert("Search count updated successfully");
    }
    else
      {
        alert("No movies found for this search term");
      }
  },[movies])
 
  return (
    <View className="flex-1 bg-black">
           <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"></Image>
           <FlatList
           data={movies}
           renderItem={({item})=><MovieCard{...item}/>}
           keyExtractor={(item)=>item.id.toString()}
          className='px-5'
          numColumns={3}
          columnWrapperStyle={{
            justifyContent:'center',
            gap:16,
            marginVertical:16
          }}
          contentContainerStyle={{paddingBottom:100}}
          ListHeaderComponent=
          {
            <>
            <View className="w-full flex-row justify-center mt-20 items-center" >
              <Image source={icons.logo} className='w-12 h-10'/>
            </View>
            <View className='my-5'>
              <SearchBar 
              placeholder='Search movies...' 
              value={searchQuery}
              onChangeText={(text:string)=>setSearchQuery(text)}
              />
             </View>
             {moviesLoading && ( <ActivityIndicator size="large" color="#0000ff" className='my-3'></ActivityIndicator>)}
             {moviesError && ( <Text className="text-red-500 px-5 my-3">Error:{moviesError.message}</Text>)}

             {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length>0 && (
              <Text className='text-xl text-white font-bold'>
                Search results for {' '}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
             ) }

            </>
          }
          ListEmptyComponent={!moviesLoading&&!moviesError?(
                     <View className="mt-10 px-5">
                      <Text className="text-center text-gray-500">
                        {searchQuery.trim()?'No movies found':'search for a movie what ever you want'}

                      </Text>
                     </View>
          ):null}
           />
           
    </View>
  )
}

export default Search