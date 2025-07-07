# Test Task for RN Internship

## Getting Started

To start the project, follow these steps:

1. Clone the Repository
   git clone https://github.com/KatsuboDmytro/stormotion.git

2. Install Dependencies
   Navigate to the project directory and run:
   npm install

3. Set Up Environment Variables
   To enable AI functionality, you need to obtain an API key from Gemini. Follow these steps:
   - Go to Gemini AI Studio (https://aistudio.google.com/app/apikey) and get your API key
   - Create a .env file in the root directory (outside the src folder) and add:
     VITE_GEMINI_API_KEY=YOUR_API_KEY

4. Run the Development Server
   Start the development server with:
   npm run dev

## Available Games

The project includes two games:

1. Matches
   - A strategic game where players take turns picking matches from a pile

2. Even or Odd
   - Inspired by Squid Game's fourth challenge about guessing matches count parity

## Testing

Access the games via: https://katsubodmytro.github.io/stormotion/

## ESLint Configuration

The project uses ESLint for code quality. Refer to ESLint docs for extending configuration.

## Contributing

Contributions welcome! Fork the repo and submit pull requests.
