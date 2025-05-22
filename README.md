# Google Calendar API Proxy

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4%2B-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green)](https://nodejs.org/)

A RESTful API that provides access to Google Calendar events using Google Apps Script. It offers a simple API without requiring the OAuth-based Google Calendar API.

## Features

- RESTful API for retrieving Google Calendar events
- Authentication with API key (optional)
- Retrieve events for specified time periods
- Available without complex OAuth configuration

## Development Environment

This project uses Devcontainers. When used with VS Code, it provides a consistent development environment.

### Tech Stack

- Node.js 22 or higher
- Google Apps Script
- clasp 3.x
- TypeScript

### Requirements

- Docker
- Visual Studio Code
- VS Code Dev Containers extension

### Setup Procedure

1. Clone the repository
2. Open in VS Code
3. Select "Reopen in Container"
4. The Google Apps Script development environment will be automatically set up in the container

### Development Commands

```bash
# Login to Google account
npm run login

# Create a new Google Apps Script project
npm run create

# Build TypeScript
npm run build

# Watch for changes and build
npm run watch

# Build and push (useful during development)
npm run dev

# Push local files to Google Apps Script
npm run push

# Pull files from Google Apps Script
npm run pull

# Open Google Apps Script editor
npm run open

# Deploy
npm run deploy
```

## Usage

### Steps from Initial Setup to Deployment

Follow these steps to deploy and use the Google Calendar API from scratch:

1. **Prerequisites**
   - Install Docker
   - Install Visual Studio Code and the "Dev Containers" extension

2. **Clone the Project and Prepare the Development Environment**
   ```bash
   # Clone the repository
   git clone https://github.com/kunikada/google-calendar-proxy.git
   cd google-calendar-proxy
   
   # Open in VS Code
   code .
   ```
   
3. **Launch the Development Container**
   - Click the "><" icon in the bottom-left corner of VS Code and select "Reopen in Container"
   - Wait for the container to build and the environment to be set up

4. **Authenticate with Google Account**
   ```bash
   npm run login
   ```
   - A browser will open, prompting you to log in with your Google account
   - After authentication is complete, a success message will appear in the terminal

5. **Create a Google Apps Script Project**
   ```bash
   npm run create
   ```
   - You will be prompted to enter a project name
   - A script ID will be generated; it's useful to make note of this

6. **Build and Push the Source Code**
   ```bash
   # Build TypeScript code
   npm run build
   
   # Push to Google Apps Script
   npm run push
   ```

7. **Deploy as a Web Application**
   ```bash
   # Open Google Apps Script editor
   npm run open
   ```
   - The Google Apps Script editor will open
   - Select "Deploy" → "New deployment" → "Web app"
   - Execute as: "Me (your email address)"
   - Who has access: Set as needed (e.g., "Anyone can access")
   - Click "Deploy"
   - After deployment, the Web application URL will be displayed
   - Copy this URL (it will be your API endpoint)
   
   Alternatively, to deploy from the command line:
   ```bash
   # Deploy (note: URL will not be displayed)
   npm run create-deployment
   
   # Check deployment information
   npx clasp list-deployments
   ```
   - The `list-deployments` command will display the deployment ID
   - The Web application URL will be in this format:
     `https://script.google.com/macros/s/<deployment-ID>/exec`

8. **Using the API**
   - You can access the API using the URL obtained in the previous step
   - Example: `https://script.google.com/macros/s/<deployment-ID>/exec?startDate=2025-05-01&endDate=2025-05-31`
   - If an API key is configured, you'll need to include it in API requests
   - For detailed API usage, refer to `docs/api-usage.md`

### API Documentation

For API documentation, please refer to `docs/api-usage.md`.
For a list and description of clasp commands, see `docs/clasp-commands.md`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Apps Script](https://developers.google.com/apps-script) - Provides the backend for this project
- [clasp](https://github.com/google/clasp) - Local development tool for Google Apps Script
