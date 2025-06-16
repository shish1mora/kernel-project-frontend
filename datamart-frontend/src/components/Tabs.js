// Tabs.js
import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="tabs">
      <div className="tab-headers">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={activeTab === tab.label ? 'active' : ''}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          activeTab === tab.label ? <div key={tab.label}>{tab.content}</div> : null
        ))}
      </div>
    </div>
  );
};

export default Tabs;
