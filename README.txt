Creates an abstraction layer in front of AWS. First goals:
	- Create a bucket with given name and region.
	- Create a role for a lambda function from description file.
	- Create a Lambda function with a name, code (ZIP file), handler, role (create one optionally), runtime, etc.
	- Update Lambda role to give access to an S3.
