# thumbor


## create stack

`aws cloudformation create-stack --stack-name thumbor --template-body=file://thumbor.cloudformation.yml`

## update stack

`aws cloudformation update-stack --stack-name thumbor --template-body=file://thumbor.cloudformation.yml`

## upload config to s3

```
aws s3 cp thumbor.conf s3://ecom-api-secrets/thumbor.conf --sse
```

Please don't commit thumbor.conf with THUMBOR_SECURITY_KEY!


## generate hashed urls

```
cd hasher
npm install
node hash.js --key THUMBOR_SECURITY_KEY IMAGE_KEY
```

- THUMBOR_SECURITY_KEY can be found in LastPass.
- IMAGE_KEY is key for image in images bucket.
