## Setting Up and Running the Backend

### Prerequisites

1. **Node.js and npm**: Ensure Node.js and npm are installed on your machine.
   - [Download Node.js](https://nodejs.org/)

2. **MongoDB**: Make sure you have a MongoDB database instance running locally or on a cloud service (e.g., MongoDB Atlas).
   - [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)

---

### Steps to Run the Backend Locally

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>/backend
   ```

2. **Install Dependencies**:
   Run the following command to install the necessary packages:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   - Create a `.env` file in the root of the backend directory.
   - Add the following variables to the `.env` file:
     ```env
     PORT=3000                      # Port where the server will run
     MONGODB_URI=<your-mongodb-uri> # MongoDB connection string
     CORS_ORIGIN=*                  # Origin(s) allowed by CORS (adjust for production)
     ACCESS_TOKEN_SECRET=<your-secret-key>   # Secret key for access tokens
     REFRESH_TOKEN_SECRET=<your-secret-key>  # Secret key for refresh tokens
     ACCESS_TOKEN_EXPIRY=3h         # Expiry time for access tokens
     REFRESH_TOKEN_EXPIRY=1d       # Expiry time for refresh tokens
     ```

   - Replace placeholders like `<your-mongodb-uri>` and `<your-secret-key>` with actual values.

4. **Start the Development Server**:
   Run the following command to start the backend server:
   ```bash
   npm run dev
   ```
   By default, the server will run at `http://localhost:3000`.

5. **Test the API**:
   Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints.

---

### Scripts

- **Start the Development Server**:
  ```bash
  npm run dev
  ```
- **Run in Production**:
  ```bash
  npm start
  ```

---

### Common Issues and Solutions

1. **MongoDB Connection Fails**:
   - Ensure the `MONGODB_URI` in the `.env` file is correct and your MongoDB instance is running.

2. **CORS Errors**:
   - If you encounter CORS errors, update the `CORS_ORIGIN` value in the `.env` file to specify allowed origins or use `*` for all origins during development.

3. **Missing `.env` File**:
   - Ensure the `.env` file exists and contains all required environment variables.

4. **Port Conflict**:
   - If port `3000` is already in use, change the `PORT` variable in the `.env` file to another port (e.g., `4000`).

---

Let me know if you need more details or specific sections added to the guide! 😊
