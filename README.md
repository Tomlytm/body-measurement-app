# Body Measurement App

A real-time body measurement application using advanced AI models for accurate pose detection and facial landmark analysis. This application combines TensorFlow.js models to provide comprehensive body tracking capabilities through your webcam.

## Features

- **Real-time Pose Detection**: Uses Google's BlazePose model with 33 keypoints for full body tracking
- **Facial Landmark Detection**: Implements MediaPipe FaceMesh with 468 facial landmarks
- **Live Video Processing**: Real-time analysis at 100fps (10ms intervals)
- **Visual Feedback**: Color-coded skeletal overlay and facial mesh visualization
- **High Performance**: Optimized with WebGL backend for smooth real-time processing

## Technology Stack

- **Frontend**: React 16.13.1
- **AI/ML**: TensorFlow.js 4.22.0
- **Models**: 
  - MediaPipe Face Landmarks Detection 0.0.2
  - TensorFlow Pose Detection 2.1.3 (BlazePose)
- **Camera**: React Webcam 5.2.0
- **Backend**: WebGL/CPU acceleration support

## Key Components

### Pose Detection
- **33 Keypoint Tracking**: Full body skeleton including face, arms, torso, and legs
- **Confidence Scoring**: Only displays keypoints with >30% confidence
- **Color-coded Visualization**:
  - Red: Face keypoints (nose, eyes, ears, mouth)
  - Green: Arms and shoulders
  - Blue: Hands and fingers
  - Yellow: Hip joints
  - Magenta: Legs and feet

### Facial Landmark Detection
- **468 Facial Points**: Comprehensive face mapping
- **Triangulated Mesh**: Creates detailed facial surface representation
- **Real-time Tracking**: Smooth facial feature following
- **Aqua Dot Visualization**: Individual landmark points displayed

### Performance Optimizations
- **WebGL Backend**: Hardware-accelerated processing
- **RequestAnimationFrame**: Smooth rendering pipeline
- **Model Caching**: Efficient model loading and reuse
- **Canvas Clearing**: Optimized drawing operations

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Yarn package manager
- Modern web browser with webcam access
- WebGL support for optimal performance

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tomlytm/body-measurement-app.git
   cd body-measurement-app
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Start development server**:
   ```bash
   yarn start
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

5. **Grant camera permissions** when prompted

## Usage

1. **Camera Setup**: Ensure your webcam is connected and working
2. **Position Yourself**: Stand 3-6 feet from the camera for optimal detection
3. **Full Body View**: Make sure your entire body is visible in the frame
4. **Real-time Analysis**: The app will automatically detect and overlay:
   - Green skeletal structure showing body pose
   - Facial mesh with aqua-colored landmarks
   - Color-coded body part identification

## File Structure

```
src/
├── App.js          # Main application component with model loading
├── App.css         # Application styling
├── utilities.js    # Drawing utilities for pose and face mesh
├── index.js        # Application entry point
└── setupTests.js   # Test configuration

public/
├── index.html      # HTML template
└── manifest.json   # PWA configuration
```

## Available Scripts

### `yarn start`
Runs the app in development mode with legacy OpenSSL provider support.<br />
Opens [http://localhost:3000](http://localhost:3000) to view in browser.

### `yarn build`
Builds the app for production to the `build` folder.<br />
Optimizes build for best performance with minification and hash filenames.

### `yarn test`
Launches the test runner in interactive watch mode.

### `yarn eject`
**Warning: This is a one-way operation!**<br />
Removes the single build dependency and exposes configuration files.

## Model Details

### BlazePose (Pose Detection)
- **Architecture**: MediaPipe BlazePose Full model
- **Runtime**: TensorFlow.js
- **Keypoints**: 33 body landmarks
- **Accuracy**: High precision for body measurement applications
- **Performance**: Optimized for real-time processing

### MediaPipe FaceMesh
- **Architecture**: MediaPipe Face Landmarks Detection
- **Landmarks**: 468 facial keypoints
- **Triangulation**: 2643 triangular connections
- **Use Cases**: Facial analysis, measurement, expression tracking

## Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Supported with WebGL
- **Edge**: Full support

**Requirements**:
- WebGL support for hardware acceleration
- Camera/microphone permissions
- Modern ES6+ JavaScript support

## Performance Considerations

- **Frame Rate**: Targets 100fps processing (10ms intervals)
- **Memory Usage**: Optimized model loading and canvas operations
- **CPU/GPU**: Utilizes WebGL backend when available
- **Network**: Models loaded locally, no external API calls

## Privacy & Security

- **Local Processing**: All analysis happens in your browser
- **No Data Upload**: Camera feed never leaves your device
- **No Storage**: No images or video data is stored
- **Permissions**: Only requires camera access

## Troubleshooting

### Common Issues

1. **Camera Access Denied**: Check browser permissions for camera access
2. **Poor Performance**: Ensure WebGL is enabled in browser settings
3. **Model Loading Errors**: Check internet connection for initial model download
4. **Detection Issues**: Ensure good lighting and full body visibility

### Performance Tips

- Use good lighting conditions
- Maintain stable positioning
- Ensure WebGL is enabled
- Close other resource-intensive applications
- Use latest browser version

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- **TensorFlow.js Team**: For the pose detection models
- **MediaPipe Team**: For the facial landmark detection
- **React Team**: For the excellent framework
- **Original Inspiration**: Based on facial landmark detection tutorials

## Future Enhancements

- Body measurement calculations
- Pose comparison and analysis
- Export functionality for measurements
- Multi-person detection support
- 3D pose estimation integration
