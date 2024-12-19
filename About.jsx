import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-6">About the Project</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 mb-4">
          The Crop Recommendation System is an AI-powered application that helps farmers and agricultural 
          enthusiasts make informed decisions about crop selection based on various environmental factors.
        </p>
        
        <h2 className="text-xl font-semibold text-green-600 mt-6 mb-3">How it Works</h2>
        <p className="text-gray-700 mb-4">
          Our system uses machine learning algorithms to analyze various parameters including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Nitrogen content in soil</li>
          <li>Phosphorous content in soil</li>
          <li>Potassium content in soil</li>
          <li>Temperature</li>
          <li>Humidity</li>
          <li>pH level</li>
          <li>Rainfall</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-green-600 mt-6 mb-3">Technology Stack</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>React.js for the frontend interface</li>
          <li>TensorFlow.js for machine learning predictions</li>
          <li>Chart.js for data visualization</li>
          <li>Tailwind CSS for styling</li>
        </ul>
      </div>
    </div>
  );
}

export default About;