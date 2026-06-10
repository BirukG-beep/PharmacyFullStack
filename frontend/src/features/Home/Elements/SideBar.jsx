import React from 'react';
import { 
    SideBar, Get, Image, AdminInfo, PAdminInfo, 
    Dashboard, DashboardP, Application, Configuration, 
    Fotter, Notification, P, P2, P3, P4, P5, P6, P7, 
    Invertory, Invertorys, InvertoryC 
} from '../styleHome.jsx';

import EllipsisMenu from '../../../components/HomePage/EllipsisMenu.jsx';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StorageIcon from '@mui/icons-material/Storage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import TuneIcon from '@mui/icons-material/Tune';

import { FaBars, FaTimes } from 'react-icons/fa';

 const Sidebar = ({
    user,
    clicked,
    handleClickd,
    isMediumOrLarger,
    showhumberger,
    showhumbergerR,
    hums,
    icons,
    expandsMedicine,
    show,
    handleItemClick,
    showiconR,
    expandReport,
    showR,
    iconC,
    expandContact,
    showC,
}) => {
    return (
        <SideBar>
            <div style={{ width: '100%', display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "3px" }}>
                <Image src='./Logo.png' alt='Logo' />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="profile-contaner">
                <AdminInfo>
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }} 
                         onClick={() => handleClickd(26)}>
                        <PAdminInfo 
                            src={user?.image || '/defualt-image.avif'} 
                            alt='User Profile' 
                        />
                        <div style={{
                            width: "14px", 
                            height: "14px", 
                            borderRadius: "7px", 
                            top: "65%", 
                            right: "0", 
                            position: "absolute", 
                            background: "green"
                        }}></div>
                    </div>
                    <div style={{ display: "flex", height: "fit-content", marginTop: "auto", marginBottom: "auto", marginLeft: "20px", flexDirection: "column" }}>
                        <p style={{ color: "white", fontSize: "20px", fontFamily: '"DM Sans", sans-serif', margin: "0", fontWeight: "bold" }}>
                            {user?.username}
                        </p>
                        <p style={{ color: "white", fontSize: "14px", fontFamily: '"DM Sans", sans-serif', margin: "0", color: "yellow" }}>
                            {user?.role}
                        </p>
                    </div>
                </AdminInfo>
                <EllipsisMenu />
            </div>

            <div style={{ width: "100%" }} className='homebar'>
                {/* Hamburger Button */}
                {!isMediumOrLarger && (
                    <div>
                        {showhumberger ? (
                            <FaTimes 
                                style={{ color: "white", fontSize: "20px", position: "absolute", top: "130px", right: "10px" }} 
                                onClick={hums} 
                            />
                        ) : (
                            <FaBars 
                                style={{ color: "white", fontSize: "20px", position: "absolute", top: "130px", right: "10px" }} 
                                onClick={hums} 
                            />
                        )}
                    </div>
                )}

                {/* Dashboard - Main Admin only */}
                {((isMediumOrLarger && user?.role === 'mainAdmin') || (showhumbergerR && user?.role === 'mainAdmin')) && (
                    <Dashboard clicked={clicked} onClick={() => handleClickd(1)}>
                        <DashboardIcon style={{ color: "white", display: "inline", marginRight: "20px" }} />
                        <DashboardP style={{ display: "inline", fontFamily: '"DM Sans", sans-serif' }}>Dashboard</DashboardP>
                    </Dashboard>
                )}

                {/* Inventory */}
                {((isMediumOrLarger) || showhumbergerR) && (
                    <Invertory clicked={clicked} onClick={() => handleClickd(13)}>
                        <div style={{ display: "flex", alignItems: "center", height: "9vh", paddingLeft: "30px" }} className="add">
                            <StorageIcon style={{ color: "white", display: "inline", marginRight: "20px" }} />
                            <DashboardP style={{ display: "inline", fontFamily: '"DM Sans", sans-serif' }}>Inventory</DashboardP>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "9vh", paddingRight: "10px", paddingLeft: "10px", boxSizing: "border-box" }} className='pad'>
                            {icons ? (
                                <ExpandMoreIcon style={{ color: 'white', fontSize: '25px' }} onClick={expandsMedicine} />
                            ) : (
                                <ExpandLessIcon style={{ color: 'white', fontSize: '25px' }} onClick={expandsMedicine} />
                            )}
                        </div>
                        {show && (
                            <div className='sublist'>
                                <P clicked={clicked} onClick={(e) => handleItemClick(7, e)} style={{ fontFamily: '"DM Sans", sans-serif' }}>List of Medicines</P>
                                <P2 clicked={clicked} onClick={(e) => handleItemClick(8, e)} style={{ fontFamily: '"DM Sans", sans-serif' }}>Medicine Groups</P2>
                                <P7 clicked={clicked} onClick={(e) => handleItemClick(101, e)} style={{ fontFamily: '"DM Sans", sans-serif' }}>Cosmotics</P7>
                            </div>
                        )}
                    </Invertory>
                )}

                {/* Report - Main Admin only */}
                {((isMediumOrLarger && user?.role === 'mainAdmin') || (showhumbergerR && user?.role === 'mainAdmin')) && (
                    <Invertorys clicked={clicked} onClick={() => handleClickd(15)}>
                        <div style={{ display: "flex", alignItems: "center", height: "9vh", paddingLeft: "30px" }} className="add">
                            <AssessmentIcon style={{ color: "white", display: "inline", marginRight: "20px" }} />
                            <DashboardP style={{ display: "inline", fontFamily: '"DM Sans", sans-serif' }}>Report</DashboardP>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "9vh", paddingRight: "10px", paddingLeft: "10px", boxSizing: "border-box" }} className='pad'>
                            {showiconR ? (
                                <ExpandMoreIcon style={{ color: 'white', fontSize: '25px' }} onClick={expandReport} />
                            ) : (
                                <ExpandLessIcon style={{ color: 'white', fontSize: '25px' }} onClick={expandReport} />
                            )}
                        </div>
                        {showR && (
                            <div className='sublist'>
                                <P3 clicked={clicked} onClick={(e) => handleItemClick(9, e)} style={{ fontFamily: '"DM Sans", sans-serif' }}>Sales Report</P3>
                                <P4 clicked={clicked} onClick={(e) => handleItemClick(10, e)} style={{ fontFamily: '"DM Sans", sans-serif' }}>Payment Report</P4>
                            </div>
                        )}
                    </Invertorys>
                )}

                {/* Configuration - Main Admin only */}
                {((isMediumOrLarger && user?.role === 'mainAdmin') || (showhumbergerR && user?.role === 'mainAdmin')) && (
                    <Configuration clicked={clicked} onClick={() => handleClickd(2)}>
                        <TuneIcon style={{ color: "white", display: "inline", marginRight: "20px" }} />
                        <DashboardP style={{ display: "inline", fontFamily: '"DM Sans", sans-serif' }}>Configuration</DashboardP>
                    </Configuration>
                )}

                {/* Customer, Notifications, etc. */}
                {((isMediumOrLarger) || showhumbergerR) && (
                    <>
                        <InvertoryC clicked={clicked} onClick={() => handleClickd(11)}>
                            <div style={{ display: "flex", alignItems: "center", height: "9vh", paddingLeft: "30px" }} className="add">
                                <PeopleIcon style={{ color: "white", display: "inline", marginRight: "20px" }} />
                                <DashboardP style={{ display: "inline", fontFamily: '"DM Sans", sans-serif' }}>Customer</DashboardP>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "9vh", paddingRight: "10px", paddingLeft: "10px", boxSizing: "border-box" }} className='pad'>
                                {iconC ? (
                                    <ExpandMoreIcon style={{ color: 'white', fontSize: '25px' }} onClick={expandContact} />
                                ) : (
                                    <ExpandLessIcon style={{ color: 'white', fontSize: '25px' }} onClick={expandContact} />
                                )}
                            </div>
                            {showC && (
                                <div style={{ width: "100%" }} className='sublist'>
                                    <P5 clicked={clicked} onClick={(e) => handleItemClick(17, e)} style={{ fontFamily: '"DM Sans", sans-serif' }}>contacts</P5>
                                    <P6 clicked={clicked} onClick={(e) => handleItemClick(18, e)} style={{ fontFamily: '"DM Sans", sans-serif' }}>contact Report</P6>
                                </div>
                            )}
                        </InvertoryC>

                        <Notification clicked={clicked} onClick={() => handleClickd(3)}>
                            <NotificationsIcon style={{ color: "white", display: "inline", marginRight: "20px" }} />
                            <DashboardP style={{ display: "inline", fontFamily: '"DM Sans", sans-serif' }}>Notifications</DashboardP>
                        </Notification>

                        <Application clicked={clicked} onClick={() => handleClickd(4)}>
                            <SettingsIcon style={{ color: "white", display: "inline", marginRight: "20px" }} />
                            <DashboardP style={{ display: "inline", fontFamily: '"DM Sans", sans-serif' }}>Application Setting</DashboardP>
                        </Application>

                        <Get clicked={clicked} onClick={() => handleClickd(5)}>
                            <HelpIcon style={{ color: "white", display: "inline", marginRight: "20px" }} />
                            <DashboardP style={{ display: "inline", fontFamily: '"DM Sans", sans-serif' }}>Get tech Help</DashboardP>
                        </Get>
                    </>
                )}

                <Fotter>Powered by Advera © 2024 v 1.1.2</Fotter>
            </div>
        </SideBar>
    );
};

export default Sidebar;