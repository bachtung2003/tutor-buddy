# TutorBuddy

TutorBuddy is a web-based tutoring platform designed to enhance learning experiences for students and simplify content delivery for teachers. Built with modern web technologies, TutorBuddy ensures usability, scalability, and security.

## Features

### For Students
- Access to courses and resources.
- Progress tracking with visual indicators.
- Interactive learning tools.

### For Teachers
- Content creation and management tools.
- Student progress tracking.
- Secure role-based access to functionalities.

### For Admins
- Manage users (students and teachers).
- Oversee platform activities.

## Tech Stack

### Frontend
- **Next.js**: React-based framework for server-side rendering and routing.
- **TypeScript**: Type-safe development.
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/ui**: Prebuilt UI components.
- **Lucide Icons**: Scalable vector icons.

### Backend
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **MySQL**: Relational database for structured data.
- **Authentication**: JSON Web Tokens (JWT) for secure user sessions.

### Additional Tools
- **Figma**: UI/UX design.
- **Git/GitHub**: Version control and collaboration.
- **Docker**: Containerization for consistent deployment.
- **UploadThing**: Cloud service for image uploads.

## Folder Structure

```
TutorBuddy
├── client
│   ├── app/                 # Pages and routing
│   ├── components/          # Reusable UI components
│   ├── contexts/            # Global state management
│   ├── lib/                 # Utility functions
│   ├── services/            # API integrations
│   ├── public/              # Static assets
│   ├── utils/               # Helper functions
│   └── middleware.ts        # Request handling middleware
├── server
│   ├── config/              # Configuration files
│   ├── middlewares/         # Middleware logic
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   └── index.js             # Server entry point
└── docker-compose.yml       # Docker container orchestration
```

## Installation

1. Clone the repository

2. Navigate to the project directory

4. Create a `.env` file for environment variables in `client` directories:
   ```env
   API_BASE_URL=http://host.docker.internal:8080
   NODE_ENV=development
   UPLOADTHING_TOKEN='Create your own UploadThing token and put it here'
   NEXT_PUBLIC_YOUTUBE_API_KEY="Create your own Youtube API key and put it here"
   ```

5. Start the development servers:
   ```bash
   # For the client
   cd client && npm run dev

   # For the server
   cd server && npm run start
   ```

## Deployment

The project is Dockerized for consistent deployment. Use the following command to build and run the application:

```bash
docker-compose up --build
```

## Future Enhancements

- **Blogging System**: Enable teachers to share educational content.
- **Review System**: Allow students to review and rate tutors.
- **Live Chat**: Real-time messaging between students and tutors.

## License

This project is licensed under the [MIT License](LICENSE).

---
