### Prerequisites
1. **Node.js and yarn**: Ensure that you have Node.js (version 14 or higher) and yarn installed on your machine.
   - Check by running:
     ```bash
     node -v
     yarn -v
     ```
2. **Git**: You'll need Git to clone the repository.
   - Check by running:
     ```bash
     git --version
     ```

3. **Docker** You'll need Docker to run the backend.
   - Check by running:
      ```bash
     docker -v
     ```

### Steps to Set Up

1. **Clone the Repository**:
   - Open a terminal and run the following command to clone the repository to your local machine:
     ```bash
     git clone https://github.com/LeonaIstrefi/uek335-CarDetailsChecker-Leo-Cyr-Luk.git
     ```
   - Navigate to the project directory:
     ```bash
     cd uek335-CarDetailsChecker-Leo-Cyr-Luk
     ```

2. **Install Dependencies**:
   - Inside the project directory, install the necessary packages by running:
     ```bash
     yarn install
     ```
   - This will install all dependencies as specified in the `package.json` file.

3. **Start a docker container**
   - In a terminal run:
      ```bash
     docker run -p 3000:3000 --name restdb -d devnyzh/rest-jsondb
     ```

5. **Run the Project**:
   - Once the build is complete, you can start the application with:
     ```bash
     yarn start
     ```
6. **Now you can choose how to run it**
   - Press: - a for Android   
           - i for ios   
  or download the Expo Go app and scan the Qr code with your mobile phone   

8. **Now it should work :)**
