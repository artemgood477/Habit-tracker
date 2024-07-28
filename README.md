# Habit Tracker Application

## Section 1: Project Description
The Habit Tracker Application is designed to help users manage and track their daily habits. Users can create, update, and delete habits, mark them as complete, and view their progress over time. The app also provides reminders to help users stay on track with their habits.

## Section 2: Overview
This web application includes both client-side and server-side components. The frontend is built using React, providing a responsive and user-friendly interface. The backend is developed with Node.js and Express, and MongoDB is used for data storage. User authentication is implemented to ensure that each user's habits are securely managed.

## Section 3: System Architecture
The system architecture follows a typical three-tier structure:

1. **Presentation Layer (Frontend):**
   - Developed using React.
   - Handles user interactions and displays data.

2. **Application Layer (Backend):**
   - Built with Node.js and Express.
   - Handles API requests and business logic.

3. **Data Layer:**
   - Uses MongoDB to store user data and habit information.

## Section 4: Data Dictionary
The Data Dictionary provides a detailed description of the data elements used in the application.

- **User:**
  - `userId` (String): Unique identifier for the user.
  - `username` (String): User's name.
  - `email` (String): User's email address.
  - `password` (String): User's password (hashed).

- **Habit:**
  - `habitId` (String): Unique identifier for the habit.
  - `userId` (String): Identifier of the user who owns the habit.
  - `name` (String): Name of the habit.
  - `description` (String): Description of the habit.
  - `startDate` (Date): Date when the habit was started.
  - `frequency` (String): Frequency of the habit (daily, weekly, etc.).
  - `progress` (Array): Array of dates when the habit was marked as complete.

## Section 5: Data Design
The Data Design outlines the structure of the database and how data is stored.

### MongoDB Collections:
1. **Users Collection:**
   - Stores user information.
   - Schema:
     ```json
     {
       "userId": "string",
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```

2. **Habits Collection:**
   - Stores habit information.
   - Schema:
     ```json
     {
       "habitId": "string",
       "userId": "string",
       "name": "string",
       "description": "string",
       "startDate": "date",
       "frequency": "string",
       "progress": ["date"]
     }
     ```

## Section 6: User Interface Design
The User Interface Design section includes mockups and descriptions of the main screens in the application.

1. **Login/Signup Screen:**
   - Allows users to log in or create a new account.

2. **Dashboard:**
   - Displays an overview of the user's habits and progress.

3. **Habit Management Screen:**
   - Allows users to add, update, and delete habits.

4. **Progress Tracking Screen:**
   - Shows the user's progress for each habit over time.

## Implementation: Add a New Habit Feature
For the initial implementation, the "Add a New Habit" feature will be developed.
