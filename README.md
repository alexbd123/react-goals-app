# react-goals-app

This is my goals application that I made in React. I wanted to complete a full stack dev project, and I have learned a lot through creating this. Detailed below are my project outline and general musings.

# The Frontend:

On the frontend side of things, I have been able to remind myself about, or outright learn, then put into practice the following React priniciples:

- Components

*I created a range of components for this application. At the top level, I have Home.jsx and Deleted.jsx, which house the relevant goal components to be displayed to the user. GoalCard is the MVP component-wise, and I found myself applying newly-learnt principles here in the form of the 'if (x) && <Component />' to render the different icons (different square icons depending on goal completion, and then the trash can and reset icons for Completed and Deleted goals). I also got to grips with the map function. I now understand why every tutorial says to get comfortable with the map function.* 

- useState()

*In the early stages of the project, I had const [goals, setGoals] = useState([{hardcodedGoalsObject}]), with the application rendering those same goals every time it was rendered. It was satisfying to eventually learn about and then migrate to Express.js and SQLite, with the result of a GET request being the parameter of setGoals().*

- useEffect()

*Used for fetching the goals data from the Express GET endpoint. I have read about a lot of React hooks, useEffect() included, that people say will be used a lot in a project. Maybe this application isn't big enough, but I have noted how I only really used useState(). I would be interested in building a project that has the need for more of the well-used hooks, like useRef(), so that I can learn about them properly.*

- Props

*As the project matured and I refactored the whole architecture of the application, my naming and then passing down of props became a particularly common bug. Thankfully, probably more by luck than design, I greatly reduced the number of variables and hooks being passed into components, which in turn reduced the chance of forgetting to pass down props.*

- Conditional rendering of components

*As noted above, under components.*

- Custom hooks ( useGoals() )

*I knew that the initial way I wrote all my goals functions in the Home component itself was probably not an industry standard way of doing things. I made a custom useGoals hooks class and rehomed all goal-related functions. useGoals() returns an object with all the state declarations and functions, and this is then destructured in Home (at least at first, it was eventually changed to be called during context creation). Very nice.*

- Which components should own state

*This was a really interesting and valuable learning from this project, and the cause of many a head scratch. Early on I came to a point where, having declared my goal state variables low down in the GoalCard component, I realised that the information in the goals object was relevant elsewhere. I eventually came to learn that state should be declared at the lowest possible level that owns all the components that need it, and I therefore ended up declaring the state in Home (which was not the fully correct solution, as noted below).*

- React context, so that global state can be accessed by different components (GoalsContext)

*Closely tied with my journey learning more about where state should live, I realised that just moving where state was called to Home wasn't the way to do things. I noticed that, when clicking from Home to Deleted, where all the deleted goals should have been listed (based on the isDeleted property), nothing was there. A bit of investigation showed me that I was calling my custom hook class useGoals at the top of both the Home and Deleted components, meaning that two completely separate versions of state were being used. This led me to learn about using createContext() and useContext(), and I made a new context directory and .js file, and added the contents of useGoals() into the new GoalsContext.provider wrapper. After wrapping the Home and Deleted components with this context, I now had both pages following the same source of truth. Side note - the context setup was the cause of many bugs (human error), in that I would frequently forget to edit the context to include any new goal hooks. I think it was quite a finiccky setup in that, if any new functions were added to useGoals(), many things had to cascade down from there (the context file, all components and then components rendered within those components).*

- Crucial JavaScript functions for React, like .map and .filter

*The theory I read online and watched in tutorials, that talked about how the map and filter functions are part of the bread and butter of a dev's toolkit when using React, turned out to align with reality. Lots of mapping in order to list as many goals as can be retrieved, lots of filtering to isolate goals by ID.*

- Event handling

*onClick, for example.*

- Using fetch() with state to dynamically display data from an API

*A genuinely satisfying element of this project was the transition from the hardcoded goals object to the application displaying goals grabbed from a database via Express.js.*

- React router for page navigation

*One of the few sections, if not the only section, of this project that I took from a YouTube video of someone making a React project. It made me research a tiny bit about Next.js as I had seen that page routing is an inherent part of that framework. I think this project is too small for Next.js from what I can gather, but I would be interested in learning it and building with it anyway.*

- Toast notifications

*I managed to implement Toast notifications in my app through reading the docs alone, as opposed to finding a tutorial and shoehorning someone else's implementation into my use case. This was a useful exercise as it allowed me to better understand the library, and sets me up to do the same with other React libraries.*

I have had contact with React before, however, I really had not built anything as complete as this up until now. 

# The Backend:

Building out a backend for an application, however simplistically, was something I had never done before and it's been a lot of fun learning some of these tools and principles for this project. The backend for this application is an embedded SQLite database connected to my React app through Express.js. I put a lot of time into writing Express routes that are as robust as possible, with as much relevant error handling as I could think of. This is, after all, a project whose secondary use will be that of 'Playwright project guinea pig'. What use is API testing through Playwright if these Express API routes don't have the expected error handling?

It really surprised me how easy it was to use Express.js. I had a fairly good understanding of APIs beforehand, but setting up Express.js for this project has given me a much fuller grasp of the topic. Likewise, researching and then using SQLite really filled a gap in my technical understanding that I hadn't really known was there. How do you start a database? Where does the database live? How can the application talk to it? Again, I unknowingly had a vague understanding of these things, and I had so much fun learning about this stuff by actually doing it.