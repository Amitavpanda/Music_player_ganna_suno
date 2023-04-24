import "./App.css";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import TopPlay from "./components/TopPlay";
import Discover from "./pages/Discover";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="relative flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <SearchBar />
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
