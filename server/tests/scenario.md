1. Testing `api/v1/proposer-sets`
   1.1. Generate 3 proposerSets.
   2.1. Get request to api/v1/proposer-sets to get all the proposer sets

2. Testing `api/v1/addresses/:walletAddress/proposer-sets/generated`
   2.1. Get request to api/v1/addresses/:walletAddress/proposer-sets/generated with addresses that are owners of the proposer sets from 1.
   2.2. Get request to api/v1/addresses/:walletAddress/proposer-sets/generated with addresses that never initiated any proposer set.

3. Testing `api/v1/addresses/:walletAddress/proposer-sets/joined`
   3.1. Get request to api/v1/addresses/:walletAddress/proposer-sets/joined with addresses that are owners of the proposer sets from 1.
   3.2. Get request to api/v1/addresses/:walletAddress/proposer-sets/joined with addresses that never initiated any proposer set.
   3.3. Register an address into three proposerSets
   3.4. Get request to api/v1/addresses/:walletAddress/proposer-sets/joined with address that has registered.
   3.5. Deregister the address from the second of the three proposerSets
   3.6. Get request to api/v1/addresses/:walletAddress/proposer-sets/joined with address that has deregistered.

4. Testing `api/proposer-sets/:proposerSetId/sequencers`,
   4.1. Register three addresses into a proposerSet
   4.2. Get request to `api/proposer-sets/:proposerSetId/sequencers`
   4.3. Deregister the middle address from the proposerSet
   4.4. Get request to `api/proposer-sets/:proposerSetId/sequencers`
   4.5. Register another address to the proposerSet
   4.6. Get request to `api/proposer-sets/:proposerSetId/sequencers`
