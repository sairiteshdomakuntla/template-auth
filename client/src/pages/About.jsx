import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          At TaskApp, we believe in simplifying task management. Our mission is to help individuals and teams organize their 
          work efficiently with an intuitive and powerful tool that fits seamlessly into their workflow.
        </p>
        <p className="text-gray-700">
          Founded in 2025, we've been on a journey to create the most user-friendly task management application that doesn't 
          compromise on features or performance.
        </p>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-32 w-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-center">Ritesh</h3>
            <p className="text-gray-600 text-center">Founder & Lead Developer</p>
            <p className="mt-4 text-gray-700">
              Full-stack developer with a passion for creating intuitive user interfaces and robust backend systems.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-32 w-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-center">Jane Doe</h3>
            <p className="text-gray-600 text-center">UX Designer</p>
            <p className="mt-4 text-gray-700">
              Expert in user experience design with a focus on creating beautiful and functional interfaces that users love.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
        <p className="text-gray-700 mb-4">
          We built TaskApp using modern web technologies to ensure speed, security, and reliability:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>React for a dynamic and responsive frontend</li>
          <li>Tailwind CSS for beautiful, utility-first styling</li>
          <li>Node.js and Express for a robust backend</li>
          <li>MongoDB for scalable data storage</li>
          <li>JWT authentication for secure user sessions</li>
        </ul>
      </div>
    </div>
  );
}