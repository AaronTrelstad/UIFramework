Making a UI Framework from scratch: Inspired by React's Architecture (Work in Progress).

**Key Features**

*1. Virtual DOM*
The DOM (Document Object Model) is a tree of objects describing the structure of the UI, where each node corresponds to a element or component. Directly editing the DOM is very slow since it recalculates the elements positions, styles, and redraws affected portions of the screen. This process happens synchronously meaning direct DOM updates trigger immediate recalculations which can become a bottleneck in larger applications. To combat this we can create the "Virtual DOM" which is a lightweight JavaScript object that mirrors the structure of the real DOM. Each element in the Virtual DOM is a JavaScript object with properties such as type (div, h1, etc.), props(id, class, etc.) and children (nested nodes). Then in a later step (Reconsiliation) we can use this Virtual DOM to efficiently apply batch updates to the real DOM.

*2. Reconsiliation*
We want to be able to efficiently update the DOM using the changes in our Virtual DOM. We can do this by using a diffing algorithm to compare the models and calculate the minimum set of changes that are needed, meaning only the affected parts of the DOM are changed. The diffing algorithm has several steps, first React compares the old and new Virtual DOM trees. If the type or key is different it is assumed that the node has been changed entirely thus the entire node is replaced. If they match the algorithm then checks the props and children. If an attribute is changed only that specific attribute is updated, the entire mode is not rerendered. If there are specfic text updates (<p>Hello</p> becomes <p>Goodbye</p>) then only the text is updated the node will not be replaced since the <p> remains unchanged. Each component is managed individually and will only be rerendered if a change in props or state is detected, if no changes the entire subtree is skipped. Once all of the changes have been identified, React applies the updates in a batch to the real DOM, this minimizes the direct DOM operations thus improving the performance.

*3. Components*
We want to be able to use modular, reusable pieces of UI logic and structure. There are two main types: Functional and Class components. Functional components are stateless they accept props and return Virtual DOM elements. Class components contain state and must have a render() method that gets called whenever the state or props change making sure the UI is up-to-date. This render() method can be customized for conditional rendering. Generally components are necessary for code reusability and provide a heirarchy of nested components.
 
*4. State Management*
Data is dyanmic and changes over time, state represents the data of a component. We need reactive rendering to ensure the UI reflects the latest changes in the data. Props are immutable, external data passed into the component from its parent whereas State is mutable data that is internal and managed by the component. Some implementations have state as imutable data where instead of updating state directly a new state object is created this ensures predictability. Also since state changes trigger rerenders, state changes are queued and batched together to avoid redundant renders.

*5. Event Handling*
The user needs to be able to interact with the UI, so we need to handle interactions (clicks, typing, scrolling, etc.) in a declaritve and consistent way. The naive solution of attaching an event listener to each individual DOM element will increase memory usage and degrade performance. To solve this, we use event delegation. Instead of adding event listeners to each element, we attach a single root event listener at the highest level (usually the root element of the UI) and allow events to bubble up through the DOM. Then once am event reaches the root, we can check it to find the target and route to the correct handling logic. This reduces the number of event listeners in memory and can greatly improve performance. 




