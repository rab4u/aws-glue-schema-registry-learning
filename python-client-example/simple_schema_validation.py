import boto3

import fastjsonschema
import json

from fastjsonschema import JsonSchemaValueException

client = boto3.client('glue')

res = client.get_schema_version(
    SchemaId={
        "RegistryName": "schema-registry-poc",
        "SchemaName": "driver"
    },
    SchemaVersionNumber={
        'LatestVersion': True
    }
)

print(res['SchemaDefinition'])
schema_def = json.loads(res['SchemaDefinition'])
validate = fastjsonschema.compile(schema_def)

valid_object = {
    "age": 99,
    "name": "ravi",
    "email": "rab4@engineer.com",
    "created_on": "2018-11-13T20:20:39+00:00",
    "mobile_number": "123456789"
}

invalid_object = {
    "age": 110,
    "name": "ravi",
    "email": "rab4u@engineer.com",
    "created_on": "2018-11-13T20:20:39+00:00",
    "mobile_number": "12345678"
}

try:
    msg = validate(valid_object)
    print("Valid: ", msg)
except JsonSchemaValueException as e:
    print("Invalid: ", e)

try:
    msg = validate(invalid_object)
    print("Valid: ", msg)
except JsonSchemaValueException as e:
    print("Invalid: ", e)
