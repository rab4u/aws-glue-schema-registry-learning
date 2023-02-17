# AWS GLUE SCHEMA REGISTRY SIMPLE CLIENT EXAMPLES 
This repository helps to understand how to access the glue schema registry and perform basic schema validations.

## Client examples 
1. [nodejs-client-example](nodejs-client-example)
2. [python-client-example](python-client-example)

## Prerequisites 
1. Make sure that you have configured AWS CLI credentials with profiles
2. set the environmental variables 
   ```shell
   export AWS_PROFILE="ravi.kumar"
   export AWS_DEFAULT_REGION="eu-central-1" 
   ```
   
## Create a registry and sample schema for testing the clients 
1. Create a registry
    ```shell
   aws glue create-registry \
   --registry-name "schema-registry-poc" \
   --description "This registry is create to test / understand the capabilities of aws schema registry" \
   --tags team=data
    ```
2. Create a sample schema
    ```shell
   aws glue create-schema \
   --registry-id RegistryName="schema-registry-poc" \
   --schema-name "driver" \
   --data-format "JSON" \
   --compatibility "NONE" \
   --schema-definition '{"properties":{"age":{"maximum":100,"minimum":0,"type":"number"},"created_on":{"format":"date-time","type":"string"},"email":{"format":"email","type":"string"},"mobile_number":{"minLength":9,"pattern":"^[0-9]*$","type":"string"},"name":{"maxLength":50,"minLength":2,"type":"string"}},"required":["age","name","email","mobile_number"],"type":"object"}'
   ```
3. Get schema
    ```shell
   aws glue get-schema-version \
   --schema-id SchemaName="driver",RegistryName="schema-registry-poc" \
   --schema-version-number LatestVersion=true
    ```
   
4. To run the client examples please go to the respective client folders and follow the readme instructions
