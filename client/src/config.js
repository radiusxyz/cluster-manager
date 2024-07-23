import { http, createConfig, injected } from "@wagmi/core";
import { holesky } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [holesky],
  transports: {
    [holesky.id]: http(),
  },
  connectors: [injected()],
});
