# **LinkUs: A Real-time Chat Application**  

## **Description**  
LinkUs is a powerful, web-based chat application designed to revolutionize digital communication. It provides a fast, secure, and user-friendly platform for real-time messaging, whether you're engaging in private conversations, collaborating in groups, or sharing multimedia files. By prioritizing simplicity and security, LinkUs ensures an effortless experience for all users, from casual chatters to professional teams.  

### **Why Choose LinkUs?**  
LinkUs goes beyond basic chat functionality by integrating modern security measures and intuitive features. Its unique OTP-based sign-up process ensures that only legitimate users gain access to the platform, providing an added layer of safety.  

Whether you're 10 years old or 100, LinkUs is designed to make communication easy and enjoyable.  

---

## **Features**  

### **For End Users:**  
1. **Secure and Easy Login**:  
   - No phone numbers required! Users log in using their email and a password.  
   - The app ensures secure access by using OTP (One-Time Password) verification during the sign-up process.  

2. **Private Chatting**:  
   - One-on-one chats are secure, ensuring your conversations stay private.  
   - Messages are encrypted for safety and confidentiality.  

3. **Group Messaging**:  
   - Create groups for friends, family, or teams to chat and collaborate seamlessly.  
   - Group admins can manage the group by adding or removing members and customizing group settings.  

4. **Real-Time Communication**:  
   - Messages are delivered instantly, without any delays.  
   - Push notifications ensure you never miss a message.  


5. **OTP Verification for Sign-Up**:  
   - Enhances security by verifying users through a One-Time Password sent to their email during the registration process.  
   - Prevents unauthorized access and ensures genuine users.  

6. **User-Friendly Design**:  
   - The app is designed to be intuitive and accessible to users of all ages.  
   - The clean interface makes navigation and usage effortless, even for first-time users.  

7. **Cross-Device Compatibility**:  
   - Accessible across desktops, laptops, and mobile devices with the same seamless experience.  

---

### **Added Security Features**  
- OTP-based registration ensures no fake users can access the platform.  
- End-to-end encryption for messages guarantees private conversations.  
- Advanced privacy settings allow users to control their visibility and interactions.  


---


## **Technical Overview (For Developers)**

### **Tech Stack**
- **Frontend**:
  - **React.js**: Component-based architecture for creating a dynamic UI.
  - **Chakra UI**: Provides consistent, responsive, and modern designs.

- **Backend**:
  - **Node.js**: An event-driven runtime environment for scalable operations.
  - **Express.js**: Handles API endpoints and backend logic efficiently.

- **Database**:
  - **MongoDB**: A NoSQL database used for storing user and message data.

- **Real-Time Messaging**:
  - **Socket.IO**: Facilitates bidirectional communication for real-time updates.

---

### **Modules and Functionalities**

#### **Authentication Module**
1. **OTP Service**:
   - Built with `nodemailer` for sending OTPs to user email addresses.
   - Validates users during registration and includes error handling for retries.

2. **Password Management**:
   - Uses `bcrypt` to hash passwords, ensuring secure storage.

#### **Chat System**
1. **Private Chats**:
   - Provides APIs like `GET /api/chats/:id` to fetch individual conversations between users.

2. **Group Chats**:
   - Admin-controlled functionality with APIs for:
     - Adding/removing participants.
     - Renaming groups via `PUT /api/groups/update`.

3. **Real-Time Messaging**:
   - Powered by `Socket.IO`, using events like:
     - `message`: To deliver real-time messages.
     - `join-room`: To manage user presence dynamically.


#### **Notification System**
- Uses `push.js` to send desktop notifications.
- Keeps users updated about new messages and group activities.

#### **Data Security**
- End-to-end encryption for all messages.
- Secures environment variables with `dotenv`, protecting sensitive information such as database credentials and API keys.

---

Here’s the **Getting Started** section formatted for your **README.md** file:

---

## **Getting Started**

### **Run Locally**
Follow these steps to set up the project locally:

1. **Clone the Repository**  
   Clone the project repository to your local machine.  
   ```bash  
   git clone https://github.com/devgupta0513/LinkUs-minor-1.git  
   ```

2. **Navigate to the Main Project Directory**  
   Change to the main project folder:  
   ```bash  
   cd LinkUs-minor-1  
   ```

3. **Install Dependencies**  
   Install all necessary dependencies for the backend:  
   ```bash  
   npm install  
   ```

4. **Navigate to the Frontend Folder**  
   After installing backend dependencies, move to the `frontend` folder:  
   ```bash  
   cd frontend  
   ```

5. **Install Frontend Dependencies**  
   Install the dependencies required for the frontend:  
   ```bash  
   npm install  
   ```

6. **Set Up Frontend Environment Variables**  
   Inside the `frontend` folder, create a `.env` file and add the following variables:  
   ```plaintext  
   REACT_APP_TITLE=Your_App_Title  
   REACT_APP_BASE_URL=Your_Backend_Base_URL  
   ```  
   Replace `Your_App_Title` with the name of your application and `Your_Backend_Base_URL` with the backend API base URL (e.g., `http://localhost:4000`).

7. **Return to the Main Project Directory**  
   After setting up the frontend, navigate back to the main folder:  
   ```bash  
   cd ..  
   ```

8. **Set Backend Environment Variables**  
   In the main directory, create a `.env` file and add the following keys:  
   ```plaintext  
   MONGO_URI=your_mongo_connection_string  
   JWT_SECRET=your_jwt_secret  
   EMAIL_SERVICE=your_email_service  
   EMAIL_USER=your_email@example.com  
   EMAIL_PASS=your_email_password  
   ```

9. **Start the Development Server**  
   Start the server, and it will automatically serve the frontend and backend:  
   ```bash  
   npm run dev  
   ```

10. **Open the App in a Browser**  
    Access the app in your browser at:  
    [http://localhost:3000](http://localhost:3000)  

---
