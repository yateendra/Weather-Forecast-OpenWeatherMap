# Weather Forecast Application

A beautiful and responsive weather application that provides current weather conditions and a 5-day forecast for any city in the world.

## Features

- Display current weather conditions (temperature, humidity, wind speed, etc.)
- Show 5-day weather forecast with daily temperature ranges
- Search for weather by city name with autocomplete suggestions
- Use current location for weather data
- Toggle between Celsius and Fahrenheit temperature units
- Weather-responsive design that changes based on current conditions
- Recent search history saved in local storage
- Responsive design for all device sizes

## Screenshots

(Screenshots would be added here after deployment)

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- OpenWeatherMap API
- Axios
- Lucide React for icons

## Setup Instructions

### Prerequisites

- Node.js (v14.0.0 or higher)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure API Key:
   - Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
   - Open `src/utils/constants.ts`
   - Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key:
     ```typescript
     export const API_KEY = "your-api-key-here";
     ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` or the URL displayed in your terminal

### Building for Production

To create a production build:

```
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## API Key Configuration

This application uses the OpenWeatherMap API, which requires an API key. To obtain your key:

1. Register for a free account at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
2. After confirming your account, navigate to the [API keys section](https://home.openweathermap.org/api_keys)
3. Copy your API key
4. Update the `API_KEY` constant in `src/utils/constants.ts`

Note: The free tier has a limit of 60 calls per minute and 1,000,000 calls per month, which is sufficient for personal use.

## Testing

This application includes basic test cases for core functionality. To run tests:

```
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.