import "./App.css";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import TopPlay from "./components/TopPlay";
import Discover from "./pages/Discover";
import SongDetails from "./pages/SongDetails";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer/index";
import ArtistDetails from "./pages/ArtistDetails";
import TopArtists from "./pages/TopArtists";
import Search from "./pages/Search";

function App() {
  const {activeSong} = useSelector((state) => state.player);
  return (
    <div className="relative flex">
      {/* Sidebar  */}
      <SideBar />
      
      <div className="flex-1 flex flex-col bg-backgroundColor">
        <SearchBar />
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>
      {activeSong?.title && (
        <div className="absolute h-40 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-black/50  to-backgroundColor
         backdrop-blur-lg z-10">
         <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default App;
