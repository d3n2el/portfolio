# Daniel Lialin - Portfolio Website

A modern, interactive portfolio website showcasing Daniel Lialin's skills, experiences, and interests across multiple domains including languages, business, computer science, psychology, sports, social media, and travel.

## 🚀 Project Overview

This portfolio website features a unique multi-modal interface that allows visitors to explore content in three different viewing modes:

- **Horizontal Mode**: Traditional slide-based navigation with detailed information
- **Fun Mode**: Visual-rich slides with colorful themes and imagery
- **Vertical Mode**: Deep-dive into specific categories with detailed descriptions

## ✨ Features

### Interactive Navigation
- **Three Viewing Modes**: Switch between horizontal, fun, and vertical slide presentations
- **Smooth Animations**: CSS-powered transitions with customizable animation speeds
- **Responsive Design**: Optimized for different screen sizes and devices
- **Dynamic Button States**: Context-aware navigation controls

### Content Areas
- **About Me**: Personal introduction and overview
- **Languages**: Multilingual skills (Italian, Russian, English, Spanish, French, Chinese)
- **Business**: Entrepreneurship experience and certifications
- **Computer Science**: Programming education and community involvement
- **Psychology**: Academic coursework and personal interest
- **Sports**: Fitness activities and athletic experience
- **Social Media**: Digital marketing certifications
- **Travel**: Cultural experiences and personal growth

### Visual Elements
- **Custom Animations**: Animated background and interactive elements
- **Color-Coded Themes**: Each category has its unique color scheme
- **High-Quality Images**: Professional photography for visual appeal
- **Typography**: Custom font combinations (Jost, JetBrains Mono, TIMMONSNY)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Advanced animations, flexbox, grid, and custom properties
- **JavaScript ES6+**: Interactive functionality and state management
- **Custom Fonts**: Google Fonts and custom typography
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
portfolio-git/
├── index.html          # Main portfolio page
├── alt.css            # Primary stylesheet
├── altscreen.js       # Interactive functionality
├── credits.html       # Attribution page
├── Stylesheet.css     # Additional styles
├── images/            # Visual assets
│   ├── fun-business.jpg
│   ├── fun-cs.jpg
│   ├── fun-languages.jpg
│   ├── fun-psychology.jpg
│   ├── fun-social-media.jpg
│   ├── fun-sport.jpg
│   └── fun-traveling.jpg
└── README.md          # Project documentation
```

## 🚀 How to Run

### Method 1: Local File
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Navigate through the portfolio using the interactive buttons

### Method 2: Local Server (Recommended)
1. Clone the repository:
   ```bash
   git clone https://github.com/d3n2el/portfolio.git
   cd portfolio
   ```

2. Start a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

### Method 3: Live Preview (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎮 How to Navigate

### Main Page
- **Explore Button**: Enter horizontal mode to browse through all categories
- **Star Button**: Enter fun mode for a visual, colorful experience
- **Fun Toggle**: Switch between normal and fun modes while browsing

### Slide Navigation
- **Arrow Keys**: Navigate between slides (horizontal mode)
- **Mouse/Touch**: Click on navigation dots to jump to specific slides
- **Vertical Mode**: Use up/down arrows when in vertical viewing mode
- **Mode Switch**: Toggle between viewing modes using the mode switch button

### Special Features
- **Color Adaptation**: Fixed buttons change colors based on the active slide theme
- **Smooth Transitions**: All mode switches include smooth animations
- **Keyboard Support**: Full keyboard navigation support

## 📱 Browser Compatibility

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties in `alt.css`:
```css
:root {
    --accent-color: #your-color;
    --fun-color: #your-fun-color;
    /* Add more custom properties */
}
```

### Adding New Slides
1. Add HTML structure in `index.html`
2. Update the JavaScript navigation in `altscreen.js`
3. Add corresponding styles in `alt.css`

### Animation Timing
Modify the transition speed:
```css
:root {
    --slide-transition-speed: 0.5s; /* Adjust timing */
}
```

## 📸 Screenshots

*Note: Screenshots show the website in action with its three different viewing modes*

### Home Page
![home page](https://hc-cdn.hel1.your-objectstorage.com/s/v3/0754d40a6eb1a9a327e0e6f790b1daaa206d6d57_capture.png)

### Horizontal Mode
![normal mode](https://hc-cdn.hel1.your-objectstorage.com/s/v3/d6da8a2b2c78f71fe8db0755dd69ff67dab6edc2_cap4.png)

### Fun Mode
![fun mode](https://hc-cdn.hel1.your-objectstorage.com/s/v3/e418b7e2283d51721103f5afe6a77663824de1a2_cap3.png)

## 📝 Credits

This project uses images from Unsplash and fonts from Google Fonts. Full attribution can be found in the [credits.html](credits.html) file.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **GitHub**: [@d3n2el](https://github.com/d3n2el)
- **Portfolio**: [Live Demo](https://d3n2el.github.io/portfolio)

---

*Built with ❤️ by Daniel Lialin*
