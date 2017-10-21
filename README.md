# lambda-upload-to-s3
Upload a file to S3 from Lambda using Serverless Framework + Node.js + Go

Step 1:
Create the serverless project:

npm install -g serverless

serverless create -t aws-nodejs


Step 2:
Create the Go program for upload a file to S3.
The Go program will run on linux x64.

Get the libraries for the program:

go get github.com/aws/aws-sdk-go/aws

Compile after setting environments variables:

GOOS=linux

GOARCH=amd64

go install

Copy upload_s3 to the serverless project


Step 3:
Put the s3 credentials of IAM user with permissions for upload to the bucket,
on the file serverless.yml in environments.
Put the name and region of bucket in the file handler.js.


Step 4:
Deploy to Lambda.

serverless deploy


Step 5:
Run the endpoint. If it reply: result 0 means success, the file test.png was success uploaded to S3.
