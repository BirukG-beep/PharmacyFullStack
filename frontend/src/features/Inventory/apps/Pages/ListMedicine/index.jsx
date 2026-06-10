import React, { useEffect, useState } from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import MedicineTable from './components/Medicinetable';
import { useDispatch } from 'react-redux';
import { toggleClicked } from '../../../../../Reducer/dashboardSlice';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {useTheme} from "../../../../../hooks/useTheme"

const HomeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (value) => {
    setFilterOption(value);
  };

  const handleClickd = (value) => {
    dispatch(toggleClicked(value));
  };

  const isMediumOrLarger = useMediaQuery({ query: '(min-width: 500px)' });

  return (
    <>
      {isMediumOrLarger ? (
        <div style={{ backgroundColor:theme.backgroundColor, height:"89vh" , boxSizing:"border-box" , display: "grid", gridTemplateRows: "1fr 1fr 11fr", overflowY: "auto", overflowX: "hidden" }}>
          <header style={{ display: "flex", justifyContent: "space-between", padding: "20px", height: "fit-content" }}>
            <h1 style={{ paddingLeft: "20px", marginTop: "0", fontFamily: "cursive", color: theme.textColor }}>
              Inventory List of Medicines (298) 
            </h1>
            {user.role === 'mainAdmin' && (
              <Button
                style={{ width: "200px", height: "50px", color: "white", fontSize: "20px", borderRadius: "5px", marginBottom: "30px", border: "none", backgroundColor: "#1d242e" }}
                onClick={() => handleClickd(6)}
              >
                + Add new Items
              </Button>
            )}
          </header>
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
          />
          <MedicineTable searchTerm={searchTerm} filterOption={filterOption} />
        </div>
      ) : (
        <p style={{color:"red" , fontSize:"30px" , textAlign:"center" , backgroundColor , fontFamily:"fantasy"}}>It is not Allowed for mobile User </p>
      )}
    </>
  );
};

export default HomeDashboard;
