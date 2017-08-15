# thumbor aws example

![thumbor](http://i.imgur.com/X7GxWQH.png)

## create ami

Amazon Machine Image is a virtual machine image used to start up new EC2 instances.

`packer build thumbor.packer.json`

## create stack

`aws cloudformation create-stack --stack-name thumbor --template-body=file://thumbor.cloudformation.yml --capabilities CAPABILITY_IAM`

## update stack

`aws cloudformation update-stack --stack-name thumbor --template-body=file://thumbor.cloudformation.yml --capabilities CAPABILITY_IAM`

## trumpify (upload images)

`aws s3 cp trump.jpg s3://BUCKET`

## generate hashed urls

```
cd hasher
npm install
node hash.js --key THUMBOR_SECURITY_KEY IMAGE_KEY
```

- THUMBOR_SECURITY_KEY can be found in LastPass.
- IMAGE_KEY is key for image in images bucket.
