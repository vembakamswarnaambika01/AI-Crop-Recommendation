import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Welcome to Crop Recommendation System
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Get intelligent recommendations for your crops based on soil conditions and climate data
        </p>
        <Link
          to="/recommend"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Soil Analysis"
          description="Input your soil parameters to get accurate recommendations"
          icon="🌱"
        />
        <FeatureCard
          title="Smart Predictions"
          description="AI-powered crop suggestions based on multiple factors"
          icon="🤖"
        />
        <FeatureCard
          title="Data Visualization"
          description="View detailed charts and analysis of recommendations"
          icon="📊"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-green-600 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;