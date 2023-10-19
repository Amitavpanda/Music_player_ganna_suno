import "./App.css";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import TopPlay from "./components/TopPlay";
import Discover from "./pages/Discover";
import SongDetails from "./pages/SongDetails";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer/index";
import ArtistDetails from "./pages/ArtistDetails";
import TopArtists from "./pages/TopArtists";
import Search from "./pages/Search";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle } from "./redux/features/userSlice";
import { signInWithEmail } from "./redux/features/userSlice";
import { logout } from "./redux/features/userSlice";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { activeSong } = useSelector((state) => state.player);
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";



const handleClose = () => {
  console.log("close icon is clicked");
}

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, uid } = user;
        if (user.providerData[0].providerId === 'password') {
          dispatch(signInWithEmail.fulfilled({ email, name: displayName, userId: uid }))
        }
        else {
          dispatch(
            signInWithGoogle.fulfilled({ email, name: displayName, userId: uid })
          );
        }


      } else {
        dispatch(logout());
      }
    });
  }, []);



  return (
    <div className="relative flex">
      {/* Sidebar  */}
      {!isAuthPage && <SideBar />}


      <div className="flex-1 flex flex-col bg-backgroundColor">
        {!isAuthPage && <SearchBar />}

        <div className={`px-6 ${isAuthPage ? `h-screen` : `h-[calc(100vh-72px)]`}  overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col`}>
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          {!isAuthPage && <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>}

        </div>
      </div>
      {activeSong?.title && (
        <>
          <div
            className="absolute h-40 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-black/50 to-backgroundColor backdrop-blur-lg z-10">
            <div
              className="absolute top-2 right-2 cursor-pointer text-white text-xl" onClick={handleClose} 
            >
              <AiOutlineClose />
            </div>

            <MusicPlayer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
