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

### Components
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

this component handles 