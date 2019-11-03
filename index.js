const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {

  const params = {
    TableName: 'COMMENTS',
    KeyConditionExpression: "#comment= :comment",
    ExpressionAttributeNames: {
      "#comment": "comment"
    },

  };

  docClient.query(params, function (err, data) {

    let recordReturned = data.Items[0];

    if (err) {

      data = {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {
          message: JSON.stringify('ERROR, comment not found.')
        }
      };
      callback(null, data);

    } else {

      data = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {

          message: JSON.stringify('Successful get.'),
          event: recordReturned
        }

      };

      callback(null, data);

    }
  })
};
