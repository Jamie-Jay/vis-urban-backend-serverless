# vis-urban-backend-serverless
This is an backend using express js to support data acquiring for [vis-urban](https://github.com/Jamie-Jay/vis-urban/tree/master) app

The serverless AWS [getting started guide](https://www.serverless.com/framework/docs/providers/aws/guide/intro/), and then create serverless backend using nodejs - check out the [express dynamodb example](https://www.serverless.com/examples/aws-node-express-dynamodb-api/)

## Steps to setup serverless
1. `npm i serverless`  
`set AWS_ACCESS_KEY_ID=< get from IAM>`  
`set AWS_SECRET_ACCESS_KEY=< get from IAM>`
2. cd to the folder:  
`cd vis-urban-backend-serverless`
4. install dependencies:  
`npm install`
5. `serverless deploy --verbose`  
(--verbose to see more what is going on)
**need to remember the "endpoints" url**

## serverless offline usage (allow test locally rather than deploy to AWS whenever there are changes):
- `npm install serverless-offline`
- `set AWS_ACCESS_KEY_ID=< get from IAM>`  
- `set AWS_SECRET_ACCESS_KEY=< get from IAM>`
- add plugins to yml
```
plugins:
  - serverless-offline
```
- `serverless offline` or
- `serverless offline --httpPort 4000`