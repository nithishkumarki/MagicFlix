import { View, Text,TouchableOpacity,Image } from 'react-native'
import {Link} from 'expo-router'
import React from 'react'
import { icons } from '@/constants/icons';

const MovieCard = ({
    id,
  poster_path,
  title,
  vote_average,
  release_date,
}:Movie) =>
{
 console.log(title);
      return (
        <View style={{ width: '32%' }}>
        <Link href={`/movies/${id}`} asChild>
          <TouchableOpacity>
            <Image
              source={{
                uri: poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
              }}
              className="w-full h-52 rounded-lg"
              resizeMode="cover"
            />
            <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
              {title}
            </Text>
            <View className="flex-row items-center gap-x-1 mt-1">
              <Image source={icons.star} className="size-4" />
              <Text className="text-xs text-white font-bold uppercase">
                {Math.round(vote_average) / 2}
              </Text>
            </View>
            
            <Text className="text-xs text-light-300 font-medium mt-1">
              {release_date?.split("-")[0]}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      
  )
}

export default MovieCard;