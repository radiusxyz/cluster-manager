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

## Future Improvements

- **Enhanced Filtering:** Expand the filtering options in the `Explorer` component to allow more granular control over displayed clusters.
- **Error Handling:** Improve error handling in API requests to provide better feedback to users.
- **Documentation:** Include inline documentation and comments in the codebase for better maintainability.

---
