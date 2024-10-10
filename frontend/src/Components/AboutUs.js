// src/components/AboutUs.js
import React from 'react';
import './AboutUs.css'; // Import the CSS file for styles

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Yogendra Sharma',
      github: 'https://github.com/YogendraBits',
      image: 'https://github.com/YogendraBits.png', // Replace with the actual image URL
    },
    {
      name: 'Trupti Koli',
      github: 'https://github.com/TruptiBits',
      image: 'https://github.com/TruptiBits.png', // Replace with the actual image URL
    },
    {
      name: 'Ishank',
      github: 'https://github.com/IshankBits',
      image: 'https://github.com/IshankBits.png', // Replace with the actual image URL
    },
    {
      name: 'Gaurav',
      github: 'https://github.com/GauravBits',
      image: 'https://github.com/GauravBits.png', // Replace with the actual image URL
    },
    {
      name: 'Rahaf',
      github: 'https://github.com/RahafBits',
      image: 'https://github.com/RahafBits.png', // Replace with the actual image URL
    },
  ];

  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to our company! We are dedicated to providing the best service
        possible. Our mission is to enhance the lives of our customers.
      </p>
      <p>
        Our team consists of experienced professionals who are passionate
        about what they do.
      </p>
      <p>
        Thank you for visiting our About Us page. Feel free to reach out if you have
        any questions!
      </p>
      <div className="team-container">
        {teamMembers.map((member) => (
          <div className="team-member" key={member.name}>
            <img src={member.image} alt={member.name} className="member-image" />
            <h3 className="member-name">{member.name.split(' ')[0]}</h3> {/* Only show first name */}
            <a href={member.github} target="_blank" rel="noopener noreferrer" className="github-link">
              GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
