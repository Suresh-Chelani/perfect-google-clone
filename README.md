# Google Homepage Clone

A pixel-perfect clone of the Google homepage built with modern web technologies. This project demonstrates attention to detail, responsive design, and best practices in web development.

## 🚀 Features

- Exact replica of Google's homepage design
- Fully responsive layout
- Search functionality
- Google logo with hover effects
- Navigation bar with Google apps menu
- Footer with multiple sections
- Dark/Light mode support
- Mobile-friendly design
- Chrome Dinosaur Game (appears when offline)
  - Jump over obstacles using the spacebar
  - Score tracking
  - Game over screen with restart option
  - Smooth animations and physics

## 🛠️ Technologies Used

- **React.js** - Frontend library for building user interfaces
- **TypeScript** - For type-safe code
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Re-usable components built with Radix UI
- **React Router** - For navigation
- **React Query** - For data fetching and state management
- **ESLint** - For code linting
- **PostCSS** - For CSS processing

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd perfect-google-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🏗️ Project Structure

```
perfect-google-clone/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── styles/        # Global styles and Tailwind config
│   ├── utils/         # Utility functions
│   └── App.tsx        # Main application component
├── public/            # Static assets
├── index.html         # Entry HTML file
└── package.json       # Project dependencies and scripts
```

## 🚀 Deployment

The project is built using Vite and can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
# or
yarn build
# or
bun build
```

2. The build output will be in the `dist` directory, which can be deployed to services like:
   - Vercel
   - Netlify
   - GitHub Pages
   - Firebase Hosting

## 🎯 Project Goals

- Create a pixel-perfect clone of Google's homepage
- Implement responsive design for all screen sizes
- Follow best practices in code organization and structure
- Ensure accessibility and performance
- Demonstrate attention to detail in UI implementation

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](your-issues-page-url).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

[Your Name]
- GitHub: [@Suresh-Chelani](https://github.com/Suresh-Chelani)
- LinkedIn: [Suresh Chelani](https://www.linkedin.com/in/suresh-chelani-a34b6a248/)

## 🙏 Acknowledgments

- Google for the original design inspiration
- All the open-source libraries and tools used in this project
- The React and TypeScript communities for their excellent documentation

## 🎮 Dinosaur Game

The project includes a recreation of Chrome's famous dinosaur game that appears when you're offline. Features include:

- Automatic detection of offline status
- Smooth jumping mechanics
- Obstacle generation
- Score tracking
- Game over screen with restart option
- Responsive canvas-based rendering
- Spacebar controls

To try the game:
1. Disconnect from the internet
2. Refresh the page
3. Press spacebar to start
4. Use spacebar to jump over obstacles
5. Try to achieve the highest score!
