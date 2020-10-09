'use strict';
const AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-2'});

exports.handler = async (event, context)=> {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});

    // Create an SQS service object
    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    const { id, email} = JSON.parse(event.body);
    const paramsSQS = {
      QueueUrl: 'https://sqs.eu-west-2.amazonaws.com/980474985817/subscriberQueue',
      MessageBody: email 
    };
    
    const queudata = await sqs.sendMessage(paramsSQS).promise()
    let responseBody = '';
    let statusCode = 0 ;

    const params = {
        TableName: "Subscribers",
        Item:{
            id:id,
            email:email
        }
    };

    try{
      const data = await documentClient.put(params).promise();

      responseBody = JSON.stringify({...data, "message":"Successfully added to DB" })
      statusCode = 201;
      
      const res = {
          body:email,
          statusCode
        };
      context.succeed(res);
    
    }catch(err){
        responseBody = JSON.stringify({err, "message":"Unable to put subscriber email" });
        statusCode = 403;
        const errContex = {
            body:responseBody,
            statusCode
        } 
        context.fail(errContex)
    }
};
