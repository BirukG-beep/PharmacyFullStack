import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';

const NavTab = ({ activeTab, onTabChange }) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});

  const tabs = ['Pharmacist', 'Cosmotics', 'User', 'WholeSaler'];

  // Update slider position when active or hovered tab changes
  useEffect(() => {
    const currentTab = hoveredTab || activeTab;
    const el = tabRefs.current[currentTab];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setSliderStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab, hoveredTab]);

  return (
    <nav className="nav-tabs">
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab} // now tab is a string, safe as key
            ref={(el) => (tabRefs.current[tab] = el)}
            onMouseEnter={() => setHoveredTab(tab)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onTabChange(tab); // notify parent
                setActiveTab(tab); // internal state (if you still want it)
              }}
              className={activeTab === tab ? 'active' : ''}
            >
              {tab}
            </a>
          </li>
        ))}
        <div className="slider" style={sliderStyle} />
      </ul>
    </nav>
  );
};

export default NavTab;