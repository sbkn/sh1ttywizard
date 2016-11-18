
Sh1ttyWizard
===================

 - Uploads a configuration file to S3 after validating it.
 - Retrieves a configuration file from S3.

----------


Workflow:
-------------

 - There should be a git repo holding configuration files for each service and their respective JSON schemas.
 	The schemas are there so you don't crash everything with every single typo.
 - Trigger a Jenkins build on repo push.
 - Jenkins should call a Lambda service which will use this npm module to create a new file / update
 	an existing one after validating it.
 - Each lambda function uses this npm module to get its own configuration file from S3.


Todo:
-------------

 - Mock AWS S3.
 - Make getConfig return the complete config file from S3.
 - How to implement staging/deployment .. ??
 - How to mock the config files in development process? Do we want to mock them?
