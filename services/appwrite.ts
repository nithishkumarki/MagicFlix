
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID=process.env.APPWRITE_PROJECT_MAGICFLIX_DB1!;
const COLLECTION_ID=process.env.APPWRITE_PROJECT_MAGICFLIX_DB1_C1!;
// https://cloud.appwrite.io/v1 default endpoint for appwrite
const client=new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject("680bb4300031a64d643e");

const database=new Databases(client);




export const updateSearchCount= async(query:string,movie:Movie)=>{
    alert("alert");
    try{

    const result=await database.listDocuments("6814895b0002363f638b","681489e2001acb687296", [ Query.equal('searchTerm',query)]);
     if(result.documents.length>0)
     {
        alert("Search term already exists in the database, updating the count");
        const existingMovie=result.documents[0];
        await database.updateDocument("6814895b0002363f638b","681489e2001acb687296",existingMovie.$id,{count:existingMovie.count+1})
     }
     else
     {
        alert("Search term does not exist in the database, creating a new document");

        await database.createDocument("6814895b0002363f638b","681489e2001acb687296",ID.unique(),{
            searchTerm:query,
            movie_id:movie.id,
            title:movie.title,
            count:1,
            poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
        });
     }
    console.log("result of search count update"+JSON.stringify(result));
    }
    catch(err)
    {
        console.log("Error in updating search count"+err);
        throw err;

    }
}

export const getTrendingMovies=async():Promise<TrendingMovie[]|undefined>=>
{
try
{
    const result=await database.listDocuments("6814895b0002363f638b","681489e2001acb687296", [ Query.limit(5),Query.orderDesc("count"),]);
    return result.documents as unknown as TrendingMovie[];

}
catch(error)
{
    console.log("Error in getting trending movies"+error);
    alert("error in getting trending movies"+error);
}
}