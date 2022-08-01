## Todo List
Tech assessment project implementing a todo list in React and Redux.

## Running the App
Just the standard...
```
npm install
npm start
```

## Technologies
- create-react-app
- Redux-toolkit (immer, devtool, etc.)
- Tailwind
- events (for worker middleware)

## Features
- Create multiple lists and organize by topic.
- Lists may be archived
- Tasks are reorderable
- All state persists in local storage
- Deletion of topics and lists remove all descendents
- Reducers are unit tested
- Worker "sagas" handle dependencies between features, thereby reducing complexity of reducers
- Mobile-first (nothing fancy though)
- Normalized state

## Features started but cut for time
- Error handling!
- Setup as a Progressive Web App, would be easy to allow the app to work offline
- Search: Began adding logic to build keyword lists for search feature
- Tailwind/Flowbite modules can be themed for dark more
- Notifications toaster/alerts
- Tooltips (would be useful where strings are being truncated)

## Nice-to-haves
- Cypress for unit and automation testing
- Containerized app
- Backend Express service
- Error reporting to backend
- Data migrations
- Github Actions


