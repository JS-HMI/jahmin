# JaHMIn
A **Ja**vascript framework to build **H**uman **M**achine **In**terfaces for IoT.

- **[Demo of basic elements here](https://js-hmi.github.io/jmn-basic-elements/demo)**.
- **Docs available at: [js-hmi.github.io/jahmin](https://js-hmi.github.io/jahmin/index.html)**


### Installation 

```js
npm install jahmin
```


### Working Principles

Jahmin is a framework that helps with the boiler plate necessary to put in comunication browser UI-elements 
with server-side sensors data. It allows for bi-directional comunications, for monitoring and control.
Jahmin does this by offering an opinionated set of components:

- UI elements are build using web-components inheriting from the, **HMIElement** class. These are **Lit-Element** components
with a few helper functions. 
- An app state managment system (using **ImperaJS**) takes care of holding the state and propagating state changes to all elements.
- A customizable **DataCommsEngine** class is provided for server-client data retrival and communication. 
- An app **ServiceManager** class takes care of initialization and configuration.
- A customizable Error tray notification mechanism is provided to inform the user of any problem.

The basic idea is that once you implement the server-client data exchange protocol of your application within the DataCommsEngine class,
all data points, the variables of your system, are accessible by name from the HMIElements. The framework takes care of connecting, 
populating and subscribing HMIElements to your data stream automatically. This decoupling between data comunication and UI 
gives the oppurtunity to re-use the components and share them. 
Jahmin comes with a set of basic components, which you can explore [here](https://js-hmi.github.io/jmn-basic-elements/demo).
