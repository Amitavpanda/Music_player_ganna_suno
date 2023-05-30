import React,{useState} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTermModified =  searchTerm.replace(/ /g, '%20');
    navigate(`/search/${searchTermModified}`);
  }
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
      <label htmlFor="search-field" className="sr-only">
        Search All files
      </label>
      <div className="flex flex-row justify-start items-center  ">
        <AiOutlineSearch aria-hidden="true" className="w-5 h-10 ml-4 fill-skyColor"/>
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
    </form>
  )
}

export default SearchBar;
