const core = require('@actions/core');
const mupp =
  'Breaking changes found between the two specifications: { "breakingDifferences": [ { "type": "breaking", "action": "remove", "code": "path.remove", "destinationSpecEntityDetails": [], "entity": "path", "source": "openapi-diff", "sourceSpecEntityDetails": [ { "location": "paths./{retailUnit}/business-customers/{businessId}/invite/", "value": { "post": { "responses": { "200": { "content": { "application/json": { "schema": { "type": "object", "description": "Invitation token", "additionalProperties": false, "properties": { "token": { "type": "string" } } } } }, "description": "Invitation token" }, "4XX": { "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "description": "Error Response Schema", "properties": { "requestId": { "type": "string" }, "statusCode": { "type": "string" }, "errors": { "type": "array", "items": { "type": "object", "properties": { "message": { "type": "string" }, "errorCode": { "type": "string" }, "field": { "type": "string", "nullable": true } } } } } } } }, "description": "Error Response Schema" } }, "description": "Invite a contact person to the business", "tags": [ "business-customers" ], "security": [ { "JWT": [] } ], "requestBody": { "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "firstName": { "type": "string", "maxLength": 255 }, "lastName": { "type": "string", "maxLength": 255 }, "middleName": { "type": "string", "nullable": true, "maxLength": 255 }, "title": { "type": "string", "enum": [ "MS", "MRS", "MR", "DR", "MISS", "PROF", "PROF DR", "REV", "SIR", "SISTER", "FATHER", "LADY", "LORD", "RH", "ING", "BA", "MA", "BSC", "MSC", "MAG", "MAG (FH)", "BED", "BAKK", "MBA", "DR MED", "DR DR", "DIPL ING", "DIPL ING (FH)" ] }, "email": { "type": "string", "maxLength": 255 }, "role": { "type": "string", "enum": [ "OWNER", "USER", "ANY", "NONE" ] } }, "required": [ "firstName", "lastName", "middleName", "title", "email", "role" ] } } }, "required": true }, "parameters": [ { "name": "retailUnit", "in": "path", "required": true, "description": "The market code with two characters", "schema": { "type": "string", "enum": [ "AT", "AU", "BE", "CA", "CH", "CZ", "DE", "DK", "ES", "FI", "FR", "GB", "HU", "IE", "IN", "IT", "JP", "NL", "NO", "PL", "PT", "RS", "SE", "SK", "US" ], "description": "The market code with two characters" } }, { "name": "businessId", "in": "path", "required": true, "schema": { "type": "number" } } ] } } } ] } ], "breakingDifferencesFound": true, "nonBreakingDifferences": [ { "type": "non-breaking", "action": "add", "code": "path.add", "destinationSpecEntityDetails": [ { "location": "paths./{retailUnit}/business-customers/{businessId}/invitation/", "value": { "post": { "responses": { "200": { "content": { "application/json": { "schema": { "type": "object", "description": "Invitation token", "additionalProperties": false, "properties": { "token": { "type": "string" } } } } }, "description": "Invitation token" }, "4XX": { "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "description": "Error Response Schema", "properties": { "requestId": { "type": "string" }, "statusCode": { "type": "string" }, "errors": { "type": "array", "items": { "type": "object", "properties": { "message": { "type": "string" }, "errorCode": { "type": "string" }, "field": { "type": "string", "nullable": true } } } } } } } }, "description": "Error Response Schema" } }, "description": "Invite a contact person to the business", "tags": [ "business-customers" ], "security": [ { "JWT": [] } ], "requestBody": { "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "firstName": { "type": "string", "maxLength": 255 }, "lastName": { "type": "string", "maxLength": 255 }, "middleName": { "type": "string", "nullable": true, "maxLength": 255 }, "title": { "type": "string", "enum": [ "MS", "MRS", "MR", "DR", "MISS", "PROF", "PROF DR", "REV", "SIR", "SISTER", "FATHER", "LADY", "LORD", "RH", "ING", "BA", "MA", "BSC", "MSC", "MAG", "MAG (FH)", "BED", "BAKK", "MBA", "DR MED", "DR DR", "DIPL ING", "DIPL ING (FH)" ] }, "email": { "type": "string", "maxLength": 255 }, "role": { "type": "string", "enum": [ "OWNER", "USER", "ANY", "NONE" ] } }, "required": [ "firstName", "lastName", "middleName", "title", "email", "role" ] } } }, "required": true }, "parameters": [ { "name": "retailUnit", "in": "path", "required": true, "description": "The market code with two characters", "schema": { "type": "string", "enum": [ "AT", "AU", "BE", "CA", "CH", "CZ", "DE", "DK", "ES", "FI", "FR", "GB", "HU", "IE", "IN", "IT", "JP", "NL", "NO", "PL", "PT", "RS", "SE", "SK", "US" ], "description": "The market code with two characters" } }, { "name": "businessId", "in": "path", "required": true, "schema": { "type": "number" } } ] } } } ], "entity": "path", "source": "openapi-diff", "sourceSpecEntityDetails": [] } ], "unclassifiedDifferences": [] }';
try {
  let openapidiff = mupp; //core.getInput('openapidiff');
  if (openapidiff && openapidiff.length > 0) {
    openapidiff = openapidiff.replace(
      'Breaking changes found between the two specifications:',
      ''
    );

    const asJson = JSON.parse(openapidiff);
    let breakingChanges = '';
    if (asJson.breakingDifferences) {
      asJson.breakingDifferences.forEach(breakingChange => {
        if (breakingChange.sourceSpecEntityDetails) {
          breakingChange.sourceSpecEntityDetails.forEach(
            sourceSpecEntityDetail => {
              if (sourceSpecEntityDetail.location) {
                let location = sourceSpecEntityDetail.location;
                location = location.replace('paths', '');
                breakingChanges += JSON.stringify(location, null, 4) + '\n';
              }
            }
          );
        }
      });
    }
    core.setOutput('endpoints', breakingChanges);
  } else {
    throw 'Invalid input please send JSON!';
  }
} catch (error) {
  console.log(error);
  core.setFailed(error.message);
}
