# react-goals-app

This is my goals application I have made in React. I wanted to complete a full stack dev project, and I have learned a lot through creating this. 

On the frontend side of things, I have been able to remind myself about, or outright learn, and then put into practice the following React priniciples:

- Components
*I created a range of components for this application. At the top level, I have Home.jsx and Deleted.jsx, which house the relevant goal components to be displayed to the user. GoalCard is the MVP component-wise, and I found myself applying newly-learnt principles here in the form of the 'if (x) && <Component />' to render the different icons (different square icons depending on goal completion, and then the trash can and reset icons for Completed and Deleted goals). I also got to grips somewhat with the map functions. I now understand why every tutorial says to get comfortable with the map function.* 

- useState()
*In the early stages of the project, I had const [goals, setGoals] = useState([{hardcodedGoalsObject}]), with the application rendering those same goals every time it was rendered. It was satisfying to eventually learn about and then migrate to Express.js and SQLite, with the result of a GET request being the paramter of setGoals().*

- useEffect()
*Used for updating the new goal and edit goal submission inputs.*

- Props
*As the project matured and I refactored the whole architecture of the application, my naming and then passing down of props became a particularly common bug. Thankfully, probably more by luck than design, I greatly reduced the number of variables and hooks being passed into components, which in turn reduced the chance of forgetting to pass down props.*

- Conditional rendering of components
*As noted above, under components.*

- Custom hooks ( useGoals() )
*I knew that the initial way I wrote all my goals functions in the Home component itself was probably not an industry standard way of doing things. I made a custom useGoals hooks class and rehomed all goal-related functions. useGoals() returns an object with all the state declarations and functions, and this is then destructured in Home. Very nice.*

- Which components should own state
*This was a really interesting and valuable learning from this project, and the cause of many a head scratch. Early on I came to a point where, having declared my goal state variables low down in the GoalCard component, I realised that the information in the goals object was relevant elsewhere. I eventually came to learn that state should be declared at the lowest possible level that owns all the components that need it, and I therefore ended up declaring the state in Home (which was the fully correct solution, as noted below).*

- React context, so that global state can be accessed by different components (GoalsContext)
*Closely tied with my journey learning more about where state should live, I realised that just moving where state was called to Home wasn't the way to do things. I noticed that, when clicking from Home to Deleted, where all the deleted goals should have been listed (based on the isDeleted property), nothing was there. A bit of investigation showed me that I was calling my custom hook class useGoals at the top of both the Home and Deleted components, meaning that two completely separate versions of state were being used. This led me to learn about using createContext() and useContext(), and I made a new context directory and .js file, and added the contents of useGoals() into the new GoalsContext.provider wrapper. After wrapping the Home and Deleted components with this context, I now had both pages following the same source of truth. Side note - the context setup was the cause of many bugs (human error), in that I would frequently forget to edit the context to include any new goal hooks. I think it was quite a finiccky setup in that, if any new functions were added to useGoals(), many things had to cascade down from there (the context file, all components and then components rendered within those components).*

- Crucial JavaScript functions for React, like .map and .filter
*What's to be said, lots of mapping in order to list as many goals as can be retrieved, lots of filtering to isolate goals by ID.*

- Event handling
*onClick, for exmaple.*

- Using fetch() with state to dynamically display data from an API
*A genuinely satisfying element of this project was the transition from the hardcoded goals object to the application displaying goals grabbed from a database via Express.js.*

- React router for page navigation
*Not particularyl interesting, and I think Next.js incorporates some way of allowing you to do page routing, but useful nonetheless.*

I have had contact with React before, however, I really had not built anything as complete as this up until now. 

Building out a backend for an application, however simplistically, was something I had never done before and it's been a lot of fun learning some of these tools and principles for this project. The backend for this application is an embedded SQLite database connected to my React app through Express.js. I put a lot of time into writing Express routes that are as robust as possible, with as much relevant error handling as I could think of. This is, after all, a project whose secondary use will be that of 'Playwright project guinea pig'. What use is API testing through Playwright if these Express API routes don't have the expected error handling?