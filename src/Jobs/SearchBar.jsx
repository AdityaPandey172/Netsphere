import React from 'react';

function SearchBar() {
    return (
        <div className='search-bar'>
            <select className='select-box'>
                <option value="" disabled hidden defaultValue>Job Role</option>
                <option value="Human Resource Manager">Human Resource Manager</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Business Management Consultant">Business Management Consultant</option>
                <option value="Sales & Marketing Manager">Sales & Marketing Manager</option>
                <option value="Organizational Development Consultant">Organizational Development Consultant</option>
            </select>
            <select className='select-box'>
                <option value="" disabled hidden defaultValue>Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contractual">Contractual</option>
            </select>
            <select className='select-box'>
                <option value="" disabled hidden defaultValue>Location</option>
                <option value="In-office">In-Office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
            </select>
            <select className='select-box'>
                <option value="" disabled hidden defaultValue>Required Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="Junior Level">Junior Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
            </select>
            <button className='search-button'>Search</button>
        </div>
    );
}

export default SearchBar;
