# Video Game Data Management App

This is a basic full-stack application built with ASP.NET Core for the backend, Entity Framework for data management, and Angular for the frontend. The application provides functionalities to store and list data for video games, which can be manipulated by users on different sites.

## Prerequisites

Before running the project, ensure you have the following:

- Microsoft LocalDB installed

## How to Run the Project

1. **Navigate to the Client Folder**: 

cd your-repository/clients

markdown


2. **Install Dependencies**: 

npm install

markdown


3. **Update Database**: 
- Open the Package Manager Console in Visual Studio.
- Execute the following command to generate the database tables:
  ```
  Update-Database
  ```

4. **Run the Application**: 
- Start the ASP.NET Core backend.
- Navigate to the client folder and run the Angular frontend.
