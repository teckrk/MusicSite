import React from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const SearchBar = () => {
    const [{ searchTerm }, dispatch] = useStateValue();

    const setSearchTerm = (value) => {
        dispatch({
            type: actionType.SET_SEARCH_TERM,
            searchTerm: value,
        });
    };

    return (
        <div className="w-full my-4 h-16 bg-second flex items-center justify-center">     {/* bg-card */}

            <div className="w-full gap-4 p-4 md:w-2/3 bg-primary box-shadow mt-12 rounded-md flex items-center">
                <IoSearch className="text-2xl text-first" />
                <input
                    type="text"
                    value={searchTerm}
                    className="w-full h-full bg-transparent text-lg text-first border-none outline-none "
                    placeholder="Search here ...."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;