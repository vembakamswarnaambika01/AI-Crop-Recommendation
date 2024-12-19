import React, { useState } from 'react';
import { predictCrop } from '../utils/modelPrediction';
import InputField from '../components/InputField';
import ResultDisplay from '../components/ResultDisplay';

function CropRecommendation() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await predictCrop(formData);
      setPrediction(result);
    } catch (error) {
      setError(error.message);
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Crop Recommendation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Nitrogen (N)"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              placeholder="Enter nitrogen content"
            />
            <InputField
              label="Phosphorous (P)"
              name="phosphorous"
              value={formData.phosphorous}
              onChange={handleChange}
              placeholder="Enter phosphorous content"
            />
            <InputField
              label="Potassium (K)"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              placeholder="Enter potassium content"
            />
            <InputField
              label="Temperature (°C)"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="Enter temperature"
            />
            <InputField
              label="Humidity (%)"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              placeholder="Enter humidity"
            />
            <InputField
              label="pH"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              placeholder="Enter pH level"
            />
            <InputField
              label="Rainfall (mm)"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              placeholder="Enter rainfall"
            />
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg transition-colors mt-4 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isLoading ? 'Processing...' : 'Get Recommendation'}
            </button>
          </form>
        </div>
        
        {prediction && <ResultDisplay prediction={prediction} />}
      </div>
    </div>
  );
}

export default CropRecommendation;