# Setup

#### 1. **Client Setup**
   Navigate to the `client` directory and install the necessary dependencies. Once installed, start the development server:

   ```bash
   cd client
   npm install
   npm run dev
   ```

   - To change the **contract address** and **ABI**, edit the file located at `cluster-manager/common.js`.
   - For changing **chain-related configurations** on the client side, edit the file located at `client/src/config.js`.

#### 2. **Blockchain Setup**
   Move to the `chain` directory to install dependencies, compile the contracts, and deploy them using Hardhat:

   ```bash
   cd chain
   npm install
   npx hardhat compile
   npx hardhat ignition deploy ignition/modules/ProxyModule.ts --network localhost
   ```

#### 3. **Server Setup**
   Navigate to the `server` directory, set up your environment variables, install MongoDB, and then start the server:

   1. **Add the `.env` file** with the following content:
      ```env
      DATABASE=mongodb://localhost:27017/proposer-set-manager
      ```

   2. **Install MongoDB** using Homebrew:
      ```bash
      brew tap mongodb/brew
      brew update
      brew install mongodb-community@7.0
      brew services start mongodb-community@7.0
      ```

   3. **Install dependencies and start the server:**
      ```bash
      cd server
      npm install
      npm run dev
      ```

   - For changing **chain-related configurations** on the server side, edit the file located at `server/config.js`.

---

# Client

## Overview

This project is a client-side application developed using React, providing an interface for interacting with various clusters, exploring their details, and managing cluster configurations. The application is structured around a router that directs users to different components like the `Explorer`, `Dashboard`, and `ClusterDetails` based on the current URL path.

## Features

### 1. **Explorer**
   - **Cluster Listing:** The `Explorer` component displays a list of all available clusters fetched from an API. Each cluster can be filtered by type, status (active/inactive), and whether it uses an encrypted mempool.
   - **Cluster Actions:**
     - **Filter Clusters:** Users can filter clusters by selecting different types (e.g., zk Stack, Polygon CDK, Madara, Arbitrum Orbit).
     - **Search:** A search input allows users to search for specific clusters.
     - **Generate Cluster:** Users can open a modal to generate a new cluster.
   - **Cluster Details:** Each cluster in the list is clickable, allowing the user to navigate to a detailed view of that cluster.

### 2. **Dashboard**
   - **Tab Navigation:** The `Dashboard` component includes tabs to switch between "Generated" and "Joined" clusters, providing different views based on the user's interaction with the clusters.
   - **Address Cycling:** Users can cycle through different Ethereum addresses associated with the application, dynamically updating the dashboard content based on the selected address.
   - **Connect Wallet:** A button is provided for users to connect their wallet, allowing them to interact with the blockchain directly from the dashboard.

### 3. **Modal**
   - The modal component is used for initializing clusters, adding rollups, and storing server data. It guides the user through a three-step process:
     1. **Cluster Initialization:** Users specify the cluster ID and the maximum number of sequencers.
     2. **Rollup Addition:** Users add a rollup to the cluster, specifying details like rollup ID, chain type, order commitment type, platform, and service provider.
     3. **Server Data Submission:** Users input and store URLs for the RPC, WebSocket, and block explorer related to the cluster.

## Routing Structure

The application uses a `createBrowserRouter` from React Router to manage navigation between different pages:

- **`/` (Root)**
  - Renders the `Root` component which acts as a wrapper for child components.
  - **`/` (Index)**
    - Renders the `Explorer` component, showing the list of clusters.
  - **`/dashboard`**
    - Renders the `Dashboard` component, providing a tabbed interface for managing generated and joined clusters.
  - **`/:clusterId/details`**
    - Renders the `ClusterDetails` component, showing detailed information for the selected cluster.

## State Management and API Interaction

- **State Management:** The application primarily uses React's `useState` for local state management within components.
- **API Interaction:** Data is fetched from a backend API using custom hooks like `useGET` and `usePATCH`, which handle GET and PATCH requests respectively.
  - Clusters are fetched from `http://localhost:3333/api/v1/clusters`.
  - Cluster details and rollup configurations are updated via PATCH requests to the corresponding endpoints.

## Dependencies

- **React:** The core framework used for building the user interface.
- **React Router:** For handling client-side routing.
- **Custom Hooks:** `useGET`, `usePATCH`, and `useWrite` are custom hooks used for interacting with the API and managing data.

## Usage

1. **Exploring Clusters:** Navigate to the home page to view and filter the list of clusters.
2. **Managing Clusters:** Use the dashboard to manage clusters associated with different Ethereum addresses.
3. **Cluster Creation and Configuration:** Open the modal to generate new clusters, add rollups, and configure server URLs.

## Notes

- The application assumes that the backend API is running locally on `http://localhost:3333`.
- It is recommended to connect your Ethereum wallet to interact with the blockchain features effectively.

---

# Server

## Overview

This project provides a backend API for managing clusters, handling blockchain events, and synchronizing block data. It is built using Express and Mongoose, integrating with a blockchain client to listen for specific contract events and update cluster data accordingly.

## Features

### 1. **API Endpoints**
   The API offers several endpoints to manage clusters and related data:
   - **Get All Clusters:**  
     `GET /clusters`  
     Retrieves a list of all clusters from the database.
   - **Get Generated Clusters:**  
     `GET /addresses/:walletAddress/clusters/generated`  
     Retrieves clusters generated by a specific wallet address.
   - **Get Joined Clusters:**  
     `GET /addresses/:walletAddress/clusters/joined`  
     Retrieves clusters that a specific wallet address has joined.
   - **Get Cluster by ID:**  
     `GET /clusters/:clusterId`  
     Retrieves details of a specific cluster by its ID.
   - **Update Cluster:**  
     `PATCH /clusters/:clusterId`  
     Updates details of a specific cluster using the provided data.

### 2. **Database Models**
   The project defines several Mongoose schemas to model the cluster data:
   - **Cluster Schema:**  
     Represents a cluster with fields for `clusterId`, `owner`, `sequencers`, `rollups`, `maxSequencerNumber`, and `active` status.
   - **Rollup Schema:**  
     Represents a rollup within a cluster, including fields for `rollupId`, `owner`, `type`, `orderCommitmentType`, `validationInfo`, and a list of `executors`.
   - **Executor Schema:**  
     Represents an executor within a rollup, with fields for `address`, `rpcUrl`, `websocketUrl`, and `blockExplorerUrl`.
   - **Validation Info Schema:**  
     Represents validation information within a rollup, with fields for `platform` and `serviceProvider`.
   - **Block Sync Schema:**  
     Represents block synchronization data, tracking the last processed block number for specific blockchain events.

### 3. **Blockchain Event Handling**
   The project integrates with the blockchain to watch for specific contract events and handles them accordingly:
   - **Event Watching Functionality:**
     - `watchContractEventFromBlock`: Watches for a specific event from a given block number, processes the event logs, and updates the last processed block number.
   - **Event Handling Services:**
     - **Handle InitializeCluster:** Processes "InitializeCluster" events and initializes clusters in the database.
     - **Handle AddRollup:** Processes "AddRollup" events and adds rollups to the corresponding clusters.
     - **Handle RegisterSequencer:** Processes "RegisterSequencer" events and registers sequencers in the clusters.
     - **Handle DeregisterSequencer:** Processes "DeregisterSequencer" events and removes sequencers from clusters.

### 4. **Event Listener Startup**
   - **startEventListeners:** Initializes all event watchers to start listening for the defined blockchain events.

### 5. **Cluster Service Functions**
   The `clusterService` module provides several functions for interacting with the cluster data:
   - **getAllClusters:** Retrieves all clusters from the database.
   - **getGeneratedClusters:** Retrieves clusters generated by a specific owner.
   - **getJoinedClusters:** Retrieves clusters joined by a specific wallet address.
   - **getCluster:** Retrieves a specific cluster by its ID.
   - **initializeCluster:** Initializes a new cluster based on blockchain logs.
   - **addRollup:** Adds a rollup to a cluster based on blockchain logs.
   - **registerSequencer:** Registers a sequencer to a cluster based on blockchain logs.
   - **deregisterSequencer:** Deregisters a sequencer from a cluster based on blockchain logs.
   - **updateCluster:** Updates specific details of a cluster, including rollup executors' URLs.

### 6. **Block Synchronization**
   - The `blockSyncService` module handles storing and updating the last processed block number for specific events to ensure that the application processes events starting from the correct block number:
     - **getLastProcessedBlock:** Retrieves the last processed block number for a specific event.
     - **updateLastProcessedBlock:** Updates the last processed block number for a specific event.

## Architecture

### 1. **Express Router**
   - The `router` is defined using Express, routing HTTP requests to the appropriate controller functions for handling cluster-related data.

### 2. **Mongoose Models**
   - Mongoose is used to define the schemas and models, which interact with the MongoDB database to store and retrieve cluster data, rollup configurations, executor information, and block sync data.

### 3. **Blockchain Integration**
   - The project uses the `viem` library to create a public client connected to the specified blockchain network (`localhost` in this setup). This client listens for specific events emitted by the blockchain contract and processes them.

### 4. **Controller Logic**
   - The controller (`clusterController`) manages the API's business logic, including fetching and updating cluster data, and handling HTTP requests and responses.

### 5. **Service Layer**
   - Services like `clusterService`, `eventService`, and `blockSyncService` encapsulate the core logic for interacting with the database and processing events, keeping the controller functions clean and focused on request handling.

## Usage

1. **API Requests:**
   - Clients can make HTTP requests to the defined endpoints to manage cluster data. For example, to fetch all clusters, send a `GET` request to `/clusters`.

2. **Event Listening:**
   - When the application starts, it begins listening for specified blockchain events and processes them to update the cluster data accordingly.

3. **Database Management:**
   - The application uses MongoDB to store and manage cluster, rollup, executor, and block sync data, with schemas defined using Mongoose.

## Environment Setup

- **Environment Variables:**
  - The project uses environment variables to configure settings like the blockchain connection. Ensure that `.env` is correctly set up with necessary variables.

- **Dependencies:**
  - The project relies on Node.js, Express, Mongoose, and `viem` for blockchain interactions. Ensure these dependencies are installed via `npm install`.

---
