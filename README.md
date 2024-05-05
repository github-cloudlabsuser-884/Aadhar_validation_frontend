# Document_validation_frontend
Aadhar_validation_frontend

This ReactJS application serves as the frontend for a document validation system in the banking sector. It allows users to interact with a chatbot interface to upload documents, communicate with the system, and receive Verification results.

## Technologies Used

- ReactJS: Frontend framework for building the user interface.
- FontAwesome: Provides icons for various UI elements.
- Webkit Speech Recognition: Utilized for voice input functionality.
- CSS: Styling the components and layout of the application.

## Features

### Chat Interface

- Users can interact with the chatbot to upload documents, send messages and receive responses.
- Messages are displayed in a conversation-style format, with user and bot messages differentiated by icons.

### Document Upload

- Users can upload documents in various formats such as PDF, DOC, DOCX, PNG and JPG.
- Upon successful upload, the system processes the document for validation.

### Text Input and Voice Recognition

- Users can type messages or use voice input for convenience.
- Voice input utilizes Webkit Speech Recognition to transcribe spoken words into text.

### Data Preview

- After document validation, users receive a preview of the uploaded document if validation is successful.
- The preview includes masked Aadhar number (if present) and other extracted data.

## Usage

To run the application locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm start`.
4. Access the application in your web browser at `http://localhost:3000`.

## API Endpoints

- `POST /api/send-message`: Endpoint for sending messages to the chatbot.
- `POST /api/upload-document`: Endpoint for uploading documents to initiate validation.

## Note

- Make sure the backend server is running and accessible at the specified endpoints (`sendMessageUrl` and `uploadDocumentUrl`) for the frontend to function correctly.

