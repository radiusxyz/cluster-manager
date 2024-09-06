1. Testing `api/v1/clusters`
   1.1. Generate 3 clusters.
   2.1. Get request to api/v1/clusters to get all the clusters

2. Testing `api/v1/addresses/:walletAddress/clusters/generated`
   2.1. Get request to api/v1/addresses/:walletAddress/clusters/generated with addresses that are owners of the clusters from 1.
   2.2. Get request to api/v1/addresses/:walletAddress/clusters/generated with addresses that never initiated any cluster.

3. Testing `api/v1/addresses/:walletAddress/clusters/joined`
   3.1. Get request to api/v1/addresses/:walletAddress/clusters/joined with addresses that are owners of the clusters from 1.
   3.2. Get request to api/v1/addresses/:walletAddress/clusters/joined with addresses that never initiated any cluster.
   3.3. Register an address into three clusters
   3.4. Get request to api/v1/addresses/:walletAddress/clusters/joined with address that has registered.
   3.5. Deregister the address from the second of the three clusters
   3.6. Get request to api/v1/addresses/:walletAddress/clusters/joined with address that has deregistered.

4. Testing `api/clusters/:clusterId/sequencers`,
   4.1. Register three addresses into a cluster
   4.2. Get request to `api/clusters/:clusterId/sequencers`
   4.3. Deregister the middle address from the cluster
   4.4. Get request to `api/clusters/:clusterId/sequencers`
   4.5. Register another address to the cluster
   4.6. Get request to `api/clusters/:clusterId/sequencers`
