import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  /**
   * Enable auto-updates for studios so the Studio stays current.
   */
  autoUpdates: true,
});
