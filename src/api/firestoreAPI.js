import { doc, setDoc, query, where, onSnapshot, collection, deleteDoc} from "firebase/firestore"; 
import { db } from "../firebase";


const LikeRef = collection(db, 'likedSongs');

export const likeSongCard =  async (songID,userID,liked) => {
    try{
        const docToLike = doc(LikeRef, `${userID}-${songID}`);
        if(liked){
            await deleteDoc(docToLike)
        }
        else{
            await setDoc( docToLike, {userID, songID});
        }
        console.log("like song card");
        console.log(songID);
        console.log(userID);
    }
    catch(error){
        console.log(error);
    }

}

export const getLikesByUser = (userID, songID, setLiked) => {
    try{
        let likeQuery = query(LikeRef, where("songID", "==", songID));
        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data());
            console.log(likes);
            const isLiked = likes.some((like) => like.userID === userID)
            setLiked(isLiked);
        });
    }
    catch(error){
        console.log(error);
    }


}
