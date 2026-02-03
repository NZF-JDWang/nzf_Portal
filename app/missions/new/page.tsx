import { getOperations } from "@/data/operations";

import { NewMissionClient } from "./NewMissionClient";

export default async function NewMissionPage() {
  const operations = await getOperations();

  return <NewMissionClient operations={operations} />;
}
