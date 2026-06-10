import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Home, HomeContent} from './styleHome.jsx';
import { toggleClicked } from '../../Reducer/dashboardSlice.js';
import { Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import  Sidebar  from './Elements/SideBar.jsx';
import HeaderNav from "./Elements/Header.jsx"
import { componentMap } from './components.jsx';


const HomePage = () => {
    const [show, setShow] = useState(false);
    const [showR, setShowR] = useState(false);
    const [showiconR, setIconsR] = useState(true);
    const [icons, setIcons] = useState(true);
    const [showC, setShowC] = useState(false);
    const [iconC, setIconsC] = useState(true);
    const dispatch = useDispatch();
    //for humbergur
    const [showhumberger , setHum] = useState(false);
    const [showhumbergerR , setHumR] = useState(false);
    const hums = ()  =>{
        setHum(!showhumberger);
        setHumR(!showhumbergerR)
    }

    const clicked = useSelector((state) => state.dashboard.clicked);
const user = useSelector((state) => state.user);

const Component = componentMap[clicked];
const content = Component ? Component(user) : null;
if(user.role=== ''){
    return <Navigate to="/" />
}
    const expandsMedicine = () => {
        setShow(!show);
        setIcons(!icons);
    }

    const expandReport = () => {
        setShowR(!showR);
        setIconsR(!showiconR);
    }

    const expandContact = () => {
        setShowC(!showC);
        setIconsC(!iconC);
    }

   
 
    const handleItemClick = (id, event) => {
      event.stopPropagation(); // Prevent click event from propagating to parent
      handleClickd(id); // Pass ID to the handleClickd function
    };


    const handleClickd = (value) => {
        dispatch(toggleClicked(value));
    };
    const isMediumOrLarger = useMediaQuery({ query: '(min-width: 50px)' });
      const [inputValue, setInputValue] = useState("");
    return (
        <Home>
        <Sidebar
    user={user}
    clicked={clicked}
    handleClickd={handleClickd}
    isMediumOrLarger={isMediumOrLarger}
    showhumberger={showhumberger}
    showhumbergerR={showhumbergerR}
    hums={hums}
    icons={icons}
    expandsMedicine={expandsMedicine}
    show={show}
    handleItemClick={handleItemClick}
    showiconR={showiconR}
    expandReport={expandReport}
    showR={showR}
    iconC={iconC}
    expandContact={expandContact}
    showC={showC}
/>
            <HomeContent>
           <HeaderNav 
  inputValue={inputValue}
  setInputValue={setInputValue}
  user={user}
 />
                {content}
            </HomeContent>
        </Home>
    );
}

export default HomePage;
