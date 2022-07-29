import React from 'react';

const Tabs = ({ tabs, select, onSelect }) => (
    <div>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                {
                    tabs.map((tab, index) => (
                        index === select ? (
                            <li className="mr-2" role="presentation" key={index}>
                                <button className="inline-block p-4 rounded-t-lg border-b-2" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls={tab.name} aria-selected="false">{tab.description}</button>
                            </li>
                        ) : (
                            <li className="mr-2" role="presentation" key={index}>
                                <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls={tab.name} aria-selected="false" onClick={() => onSelect(index)}>{tab.description}</button>
                            </li>
                        )
                    ))
                }
            </ul>
        </div>
    </div>
);

export default Tabs;
