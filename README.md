# thumbor aws example

![thumbor](http://i.imgur.com/X7GxWQH.png)

## Creating an AMI

Amazon Machine Image is a virtual machine image used to start up new EC2 instances.

`packer build thumbor.packer.json`

## CloudFormation

All resources will be created via CloudFormation. Well use a template to describe the resources we need and how to
configure them. Please see `thumbor.cloudformation.yml`. Don't be alarmed! I know it's long and looks scary. Just go
ahead and use the carets on the left to collapse the YAML blocks so only the top level resouces names are visible.

### Create stack

```
aws cloudformation create-stack \
	--stack-name thumbor \
	--template-body=file://thumbor.cloudformation.yml \
	--capabilities CAPABILITY_IAM
```

`--capabilities CAPABILITY_IAM` flag is used to acknowledge the creation of IAM (Identity and Access Management) resouces.
**Never create stacks with this flag from templates that you haven't reviewed! This could be used
to compromise your entire AWS account!**

### Update stack

```
aws cloudformation update-stack \
	--stack-name thumbor \
	--template-body=file://thumbor.cloudformation.yml \
	--capabilities CAPABILITY_IAM
```

## Test

The template defines our Thumbor load balancer url and newly created image bucket as outputs. You can obtain stack outputs
from either the CloudFormation panel or with `aws-cli`.

```
aws cloudformation describe-stacks \
	--stack-name thumbor \
	--query 'Stacks[0].Outputs'
```

Now that we know what our image bucket is called we can upload a test image to it with `aws s3 cp trump.jpg s3://BUCKET`.
Replace `BUCKET` with the actual bucket that you got from the command above.

Note the optional query parameter. This is for running a [JMESPath](http://jmespath.org) query against the returned JSON output.
This can be used to implement very powerful things in scripts.


## Acknowledgements

Thanks go out to [Grano](https://www.grano.fi/) for sharing the original template.
