# thumbor aws example

![thumbor](http://i.imgur.com/X7GxWQH.png)

## create stack

`aws cloudformation create-stack --stack-name thumbor --template-body=file://thumbor.cloudformation.yml`

## update stack

`aws cloudformation update-stack --stack-name thumbor --template-body=file://thumbor.cloudformation.yml`

## generate hashed urls

```
cd hasher
npm install
node hash.js --key THUMBOR_SECURITY_KEY IMAGE_KEY
```

- THUMBOR_SECURITY_KEY can be found in LastPass.
- IMAGE_KEY is key for image in images bucket.
