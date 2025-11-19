# Color Trouble – Real-Time Color Extraction Tool

Color Trouble is a React-based web application that captures frames from a webcam stream and extracts dominant colors using image processing techniques. The system provides an interactive interface for analyzing color composition in real-time, with configurable output formats and a clean user interface inspired by Sprite’s iconic gradient aesthetic.

This project demonstrates proficiency in client-side computer vision, state-driven UI design, and front-end software engineering practices using modern JavaScript frameworks.

## 1. Overview

Color Trouble enables users to capture a single frame from a live webcam feed and automatically extract its six most dominant colors. These colors are presented as interactive swatches that reveal their values upon hover. Users may toggle between HEX and RGB formats, and clicking a swatch copies the value to the clipboard for immediate use in design or analysis workflows.

The application operates entirely on the client side and is optimized for both desktop and mobile environments when deployed over HTTPS.

## 2. Features

### Real-Time Webcam Stream
- Continuous video feed using react-webcam.
- The live stream remains uninterrupted during capture.

### Color Extraction
- Dominant colors extracted using color-thief-browser.
- Hidden <img> element used to process captured frames without disrupting the UI.

### Interactive Swatch Display
- Mouse hover reveals numeric color values.
- Automatic text-contrast adjustment based on luminance.
- One-click copying for seamless integration into design workflows.

### Format Toggle
- Users can choose to display color values in either HEX or RGB format.

### Flash Feedback Effect
- A brief screen flash simulates a snapshot, providing immediate visual feedback to the user.

### Custom Styling
- Background utilizes a diagonal Sprite-can-inspired gradient, offering a modern and visually appealing aesthetic.

## 3. Technology Stack

| Component | Technology |
|----------|------------|
| Framework | React (Create React App) |
| Video Input | react-webcam |
| Color Analysis | color-thief-browser |
| Styling | Custom CSS |
| Deployment | Vercel |

## 4. Installation and Setup

Clone the repository:
```
git clone https://github.com/YOUR_USERNAME/color-trouble.git
cd color-trouble
```

Install dependencies:
```
npm install
```

Start the development server:
```
npm start
```

## 5. Deployment Instructions

This project is optimized for deployment on Vercel, which provides:
- Automatic HTTPS  
- CI/CD integration with GitHub  
- Global CDN performance  

Deploy:
1. Push the project to GitHub.
2. Visit https://vercel.com/new
3. Select the repository.
4. Deploy.

## 6. Application Architecture

```
src/
│
├── App.js
├── WebcamImage.js
├── App.css
└── index.js
```

## 7. How Color Extraction Works

1. The user selects Capture Colors.
2. react-webcam returns a base64 JPEG frame.
3. The frame is assigned to a hidden <img> element.
4. color-thief-browser processes the image.
5. A palette of six RGB values is returned.
6. Values are formatted and displayed interactivity.

## 8. Future Enhancements

- Tooltip-based feedback
- Continuous real-time sampling
- Color naming dictionaries
- Palette export
- Accessibility improvements
- Automated testing

## 9. License

MIT License.

## 10. Author
Bryan Alarcon
Christian Hernandez

Bryan Alarcon  
Christian Hernandez
