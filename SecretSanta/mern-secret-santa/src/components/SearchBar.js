import React from 'react';

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"100%",background:"#FFFFFF", borderRadius: "0.7rem", padding:"0.5rem", height: "1.5rem"};
  return (
    <input 
     style={BarStyling}
     key="searchBar"
     value={keyword}
     placeholder={"Search"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar