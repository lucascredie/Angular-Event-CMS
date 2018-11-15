# Event Management System

Content Management System made with Angular and Firebase and allows the user to Create, Update and Delete events. Some Features:
- CRUD Operations for events
- Automatic hidding of finished events
- Featured, Published and Date Dysplay hiding customizations

## Preview

![ezgif com-crop](https://user-images.githubusercontent.com/25356024/46219525-340c1b80-c30d-11e8-87c5-b6b37a6c2616.gif)

## Requirements

The Angular Development Environment runs on node.js and yarn as a node package manager. If you don't have them installed you can run these commands in your terminal. If you are on windows I recomend using Git Bash so you can execute the commands.

Using Homebrew:
``` 
brew install yarn 
```
Using Port:
```
sudo port install yarn
```
Using NPM:
```
npm install -g yarn
```

Installing Yarn should also install node.js automatically.


## Opening the Project for Development

To open the project for further development or bugfixes, you can start by cloning the repository. Once that is done you need to create the node modules folder based on the package.json file.

On your terminal, cd into the folder of your project and run:
```
yarn
```
or
```
yarn install
```

That will create the node modules folder and should take a while. The next step is to install the Angular CLI (Command Line Interface).
```
yarn global add @angular/cli 
```

Once that is done you can run your application by running:
```
ng serve
```

The app should open by default on http://localhost:4200/

## Project Organization

This section deals with file structure and components.

### Models
Models here represent the structure of the data (like a class) that is stored in the database. We have 3 main models: event, report and staff and each of them have properties and their respective data types.


### Components
Each component is composed of an HTML Template, CSS, and Typescript file. They are organized this way:

```

Components         
└── add-event   
└── dashboard       (hidden)             
└── edit-event   
└── eventpanel
└── login
└── navbar
└── newsfeedpanel   (hidden)     
└── reportpanel
└── sidebar
└── staff

```
#### add-event

Handles the form that adds a new event. Includes picture selection and input checking.

#### dashboard

Is hidden from the sidebar but could be used to display data about the website.

#### edit-event

Handles the form that edits the event once its created. Grabs the information of the database and displays on the form so they can be changed. Pictures can be changed here too.

#### eventpanel

Contains all the events in a list or card view. It deals with the featured (called pinned in the code), publish and date display features. 

#### login

Uses the auth service to log in users.

#### navbar

In this app it serves stylistic purposes and also gives the user the ability to log off. 

#### newsfeedpanel

Is also hidden from the sidebar. This component could handle a news feed subscription system in the future. 

#### reportpanel

Handles the upload and deletion of pdf documents.

#### sidebar

Takes care of the main rounting of the app. Note that the newsfeed and dashboard could be added there (they are commented at the moment)

#### staff

Allows user to upload one picture and also change text about staff page.