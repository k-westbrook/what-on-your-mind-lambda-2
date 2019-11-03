const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {

  const params = {
    TableName: 'COMMENT',
    Select: "ALL_ATTRIBUTES"
  };

  docClient.scan(params, function (err, data) {


    let recordsReturned = data.Items;

    if (err) {

      data = {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {
          message: JSON.stringify('ERROR, comments not found.')
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
          comments: recordsReturned
        }

      };

      callback(null, data);

    }
  })
};
