const projectId = import.meta.env.REACT_APP_PROJECT_ID;
const projectSecretKey = import.meta.env.REACT_APP_PROJECT_KEY;
export const authorization =
  "Basic " + btoa(projectId + ":" + projectSecretKey);
