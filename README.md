# Frontend
This repository contains the frontend of our application, DollarPlanner.

`master` is the stable branch, and should work with the corresponding `master`
branch of the backend.

`dev` is the main development branch, which may be unstable and buggy.
It is not guaranteed to work with the backend, especially if backend changes have
not been merged.

`x-<feature name>` branches are topic branches for specific feature development.

## Developer Setup

### System requirements
1. [Node.js](https://nodejs.dev/download/) 18.0.0 or higher

### Setting up your local environment
1. Clone the repository to your local machine.

    ```
    cd <clone location>
    git clone https://github.com/project-orbital/frontend
    ```

2. Install all the dependencies.

    ```
    cd backend
    npm install
    ```

3. Start the server on your local machine.

    ```
    npm start
    ```

4. Open a new tab in your browser and navigate to http://localhost:3000.
   If the [backend](https://github.com/project-orbital/backend) is up and running, you should be able to sign up at http://localhost:3000/sign-up 
   and sign in at http://localhost:3000/sign-in.
