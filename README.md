# thumbor


## create stack

`aws cloudformation create-stack --stack-name thumbor --template-body=file://thumbor.cloudformation.yml`

## update stack

`aws cloudformation update-stack --stack-name thumbor --template-body=file://thumbor.cloudformation.yml`

## upload config to s3

`aws s3 cp thumbor.conf s3://ecom-api-secrets/thumbor.conf --sse`
