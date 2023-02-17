import { GlueClient } from "@aws-sdk/client-glue";

const REGION = "eu-central-1";
const glueClient = new GlueClient({ region: REGION });
export { glueClient };
