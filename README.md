# API Enhancer

A Node.js application with MongoDB integration for managing API enhancements and configurations.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Docker (optional)

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with your MongoDB URI:

```bash
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/Manager

# Server Configuration
PORT=8000
NODE_ENV=development
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Running the Application

#### Option A: Direct Node.js
```bash
npm start
```

#### Option B: With Docker (using external MongoDB)
```bash
# Set your MongoDB URI in .env file
MONGO_URI=your-mongodb-connection-string

# Run with Docker Compose
npm run docker:compose
```

#### Option C: With Docker (using local MongoDB)
```bash
# Run with local MongoDB container
npm run docker:compose:local
```

## API Endpoints

- `GET /` - Server status and MongoDB connection info
- `GET /health` - Health check endpoint
- `GET /api/collections` - List all MongoDB collections

## MongoDB Integration

The application connects to MongoDB using the `MONGO_URI` environment variable and uses the "Manager" database. Your existing backend scripts (`node-modules.js` and `docker.js`) will continue to work with this setup.

## Docker Configuration

The `docker-compose.yml` file includes:

- **app**: Your Node.js application
- **mongo**: Local MongoDB instance (optional, use `--profile local-mongo`)
- **mongo-express**: Web-based MongoDB admin interface

### Using External MongoDB

If you're using an external MongoDB service (like MongoDB Atlas), you can run just the application:

```bash
docker-compose up app
```

### Using Local MongoDB

To run with a local MongoDB container:

```bash
docker-compose --profile local-mongo up -d
```

## Backend Scripts

The application includes backend scripts for managing node modules and Docker operations:

- `npm run runner <action>` - Run node-modules.js script
- `npm run dockerrun <action>` - Run docker.js script

These scripts connect to your MongoDB instance and execute commands stored in the database.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/Manager` |
| `PORT` | Server port | `8000` |
| `NODE_ENV` | Environment mode | `development` |

## Troubleshooting

1. **MongoDB Connection Issues**: Ensure your `MONGO_URI` is correct and accessible
2. **Port Conflicts**: Change the `PORT` in your `.env` file if 8000 is already in use
3. **Docker Issues**: Make sure Docker is running and you have sufficient permissions

## Development

For development, you can run the server in watch mode:

```bash
npm run dev
```

The server will automatically restart when you make changes to the code.