import { GetSchemaVersionCommand } from "@aws-sdk/client-glue";
import { Validator } from '@cfworker/json-schema';

import { glueClient } from "./libs/glueClient.js";

const params = {
    SchemaId: {
        RegistryName: "schema-registry-poc",
        SchemaName: "driver"
    },
    SchemaVersionNumber: {
        LatestVersion: true
    }
};

const command = new GetSchemaVersionCommand(params);
const response = await glueClient.send(command);

const schema = JSON.parse(response['SchemaDefinition']);

//console.log(schema);

const validator = new Validator(schema);

const invalid_object = {
          age: 110,
          name: "ravi",
          email: "rab4u@engineer.com",
          created_on: "2018-11-13T20:20:39+00:00",
          mobile_number: "12345678"
};

const result1 = validator.validate(invalid_object);

console.log("Invalid Payload: ")
console.log(result1);

const valid_object = {
          age: 100,
          name: "ravi",
          email: "rab4u@engineer.com",
          created_on: "2018-11-13T20:20:39+00:00",
          mobile_number: "123456789"
};


const result2 = validator.validate(valid_object);

console.log("Valid Payload: ")
console.log(result2);