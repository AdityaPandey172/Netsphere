import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import SearchBar from './SearchBar';
import Header from '../Header/Header';
import './job.css';

const jobsData = [
    {
        id: 1,
        postedOn: '2024-03-20',
        title: 'Human Resource Manager',
        company: 'Stripe',
        type: 'Part Time',
        experience: 'Mid Level',
        location: 'Remote',
        skills: ["Recruitment Strategy", "People Management", "Interviewing Skills"],
        job_link: "https://stripe.com/jobs/search"
    },
    {
        id: 2,
        postedOn: '2024-03-23',
        title: 'Project Manager',
        company: 'PayPal',
        type: 'Part Time',
        experience: 'Senior Level',
        location: 'Remote',
        skills: ["Project Planning", "Risk management", "Data Analysis"],
        job_link: "https://careers.pypl.com/home/"
    },
    {
        id: 3,
        postedOn: '2024-03-18',
        title: 'Business Management Consultant',
        company: 'Bain & Company',
        type: 'Full Time',
        experience: 'Senior Level',
        location: 'Hybrid',
        skills: ["Supply Chain Management", "Financial Analysis", "Business Process Methodologies"],
        job_link: "https://www.bain.com/careers/"
    },
    {
        id: 4,
        postedOn: '2024-04-01',
        title: 'Sales and Marketing Manager',
        company: 'Mariott International',
        type: 'Contractual',
        experience: 'Junior Level',
        location: 'In-office',
        skills: ["Digital marketing", "Customer Relationship Management", "Branding"],
        job_link: "https://careers.marriott.com/career-paths/corporate/"
    },
    {
        id: 5,
        postedOn: '2024-04-01',
        title: 'Sales Officer',
        company: 'Mariott International',
        type: 'Contractual',
        experience: 'Junior Level',
        location: 'In-office',
        skills: ["Digital marketing", "Customer Relationship Management", "Branding"],
        job_link: "https://careers.marriott.com/career-paths/corporate/"
    }
];

function JobCard() {
    const [diffInDays, setDiffInDays] = useState([]);

    useEffect(() => {
        setDiffInDays(jobsData.map(job => {
            const date1 = dayjs(Date.now());
            return date1.diff(job.postedOn, 'day');
        }));
    }, []);

    return (
        <>
            <Header />
            <SearchBar />
            {jobsData.map((job, index) => (
                <div key={job.id} className='job-card'>
                    <div className='job-content'>
                        <div className='job-details'>
                            <h1 className='job-title'>{job.title} - {job.company}</h1>
                            <p>{job.type} &#x2022; {job.experience} &#x2022; {job.location}</p>
                            <div className='skills'>
                                {job.skills.map(skill => (
                                    <p key={skill} className='skill'>{skill}</p>
                                ))}
                            </div>
                        </div>
                        <div className='apply-section'>
                            <p className='posted-info'>Posted {diffInDays[index]} days ago</p>
                            <a href={job.job_link} className='apply-button'>Apply</a>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default JobCard;
