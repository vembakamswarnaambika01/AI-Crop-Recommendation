import * as tf from '@tensorflow/tfjs';

// Mock model for development
const mockPrediction = (normalizedData) => {
  // Simulate model prediction based on input values
  const predictions = new Array(22).fill(0);
  
  // Simple logic to determine crop based on input values
  const { nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall } = normalizedData;
  
  // Rice prefers high nitrogen, high rainfall, and slightly acidic pH
  if (nitrogen > 0.5 && rainfall > 0.6 && ph < 0.5) {
    predictions[0] = 0.8; // rice
  }
  // Maize prefers moderate temperature and nitrogen
  else if (temperature > 0.4 && temperature < 0.7 && nitrogen > 0.3) {
    predictions[1] = 0.75; // maize
  }
  // Default to a balanced distribution
  else {
    predictions.forEach((_, index) => {
      predictions[index] = 0.2 + Math.random() * 0.3;
    });
  }
  
  return predictions;
};

// Load the model
let model = null;
const loadModel = async () => {
  try {
    if (!model) {
      try {
        model = await tf.loadLayersModel('/model/model.json');
      } catch (error) {
        console.warn('Using mock model for development:', error.message);
        return null;
      }
    }
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    return null;
  }
};

// Normalize input data
const normalizeInput = (data) => {
  try {
    return {
      nitrogen: parseFloat(data.nitrogen) / 140,
      phosphorous: parseFloat(data.phosphorous) / 145,
      potassium: parseFloat(data.potassium) / 205,
      temperature: parseFloat(data.temperature) / 50,
      humidity: parseFloat(data.humidity) / 100,
      ph: parseFloat(data.ph) / 14,
      rainfall: parseFloat(data.rainfall) / 300
    };
  } catch (error) {
    throw new Error('Invalid input data: Please check all fields are properly filled');
  }
};

// Crop labels
const cropLabels = [
  'rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
  'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
  'banana', 'mango', 'grapes', 'watermelon', 'muskmelon',
  'apple', 'orange', 'papaya', 'coconut', 'cotton',
  'jute', 'coffee'
];

export const predictCrop = async (inputData) => {
  try {
    // Validate input data
    if (!inputData || Object.values(inputData).some(value => value === '')) {
      throw new Error('Please fill in all fields');
    }

    const normalizedData = normalizeInput(inputData);
    const loadedModel = await loadModel();
    
    let probabilities;
    if (loadedModel) {
      // Use actual model
      const inputTensor = tf.tensor2d([Object.values(normalizedData)]);
      const prediction = await loadedModel.predict(inputTensor).array();
      probabilities = prediction[0];
      inputTensor.dispose(); // Clean up tensor
    } else {
      // Use mock prediction
      probabilities = mockPrediction(normalizedData);
    }
    
    // Get the index of the highest probability
    const maxIndex = probabilities.indexOf(Math.max(...probabilities));
    
    // Create probability distribution object
    const probabilityDistribution = {};
    cropLabels.forEach((crop, index) => {
      probabilityDistribution[crop] = probabilities[index];
    });
    
    return {
      recommendedCrop: cropLabels[maxIndex],
      confidence: probabilities[maxIndex],
      probabilities: probabilityDistribution
    };
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error(error.message || 'Failed to make prediction. Please try again.');
  }
};

export const getCropInfo = (cropName) => {
  const cropInfo = {
    rice: {
      season: 'Kharif',
      waterRequirement: 'High',
      soilType: 'Clay or clay loam',
      description: 'Staple food crop that requires standing water'
    },
    maize: {
      season: 'Kharif/Rabi',
      waterRequirement: 'Moderate',
      soilType: 'Well-drained loamy soil',
      description: 'Versatile crop that grows in various conditions'
    },
    // Add more crop information as needed
  };
  
  return cropInfo[cropName.toLowerCase()] || {
    season: 'Information not available',
    waterRequirement: 'Information not available',
    soilType: 'Information not available',
    description: 'Detailed information coming soon'
  };
};