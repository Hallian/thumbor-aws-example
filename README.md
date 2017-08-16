# Thumbor AWS Example

This repo includes a template to setup [Thumbor](http://thumbor.org) on an EC2 Auto Scaling Group and create an S3 bucket for source images.

Note that this setup isn't secure! Unless url parameter hashing is used Thumbor is susceptible to denial of service attack by simply
requesting images with arbitrary sizes. Set `ALLOW_UNSAFE_URL` to `False` and change `SECURITY_KEY` in `thumbor.conf`.
See [Thumbor documentation](http://thumbor.readthedocs.io/en/latest/security.html) for more details.

Also it's recommended to use a CDN (CloudFront) to cache the images and ensure high speed delivery. This repo will get to that later.

![thumbor](http://i.imgur.com/hQnTR9r.png)

## EC2

The EC2 service is used for running virtual machines in AWS. We're gonna run our Thumbor on an EC2 instance. For this
we're going to need an AMI that has Thumbor preinstalled. We could simply install Thumbor during boot but that would slow
down boot times and make new instances less reliable since something could go wrong during provisioning (a required 
package repository might be offline for example). 

An Amazon Machine Image is a virtual machine image used to start up new EC2 instances.

### Creating an AMI

AMIs are created by starting up an instance, installing a bunch of software on it and then creating a "snapshot" of it's
disk. The next time you start up an instance from that AMI all of the software you installed will be there!

We'll use [Packer](https://www.packer.io/) to create our AMI in an automated fashion. It will spin up an instance in AWS,
run our provisioning scripts (the scripts will install the software we want), stop the instance and package it into an AMI.
All with a single command. Nifty.

```
packer build thumbor.packer.json
```

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

With your `ThumborUrl` at hand you can try fetching our image from Thumbor.

```
http://PUT_THUMBOR_URL_HERE/unsafe/trump.jpg
```

Wow that's one big Trump! Let's make it a bit smaller.

```
http://PUT_THUMBOR_URL_HERE/unsafe/600x0/trump.jpg
```

Check network tab on devtools to see the difference in size.

## Acknowledgements

Thanks go out to [Grano](https://www.grano.fi/) for sharing the original template.

Author Nikolas Lahtinen
