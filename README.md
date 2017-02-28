## Fusion API

##### Current Endpoints
 **/test** (GET) Returns a simple JSON object to verify connection to API
 **/database/test** (GET) Returns a simple JSON object to verify connection to Database

**/staff/directory** (GET) Returns a the staff directory as a JSON object.
**/staff/directory2** (GET) Returns a diffrently formatted staff direcrory, for IOS

**/user** (POST) adds a user to the system, needs Basic Auth header, name header, course header. Returns new student ID
**/user** (DELETE) removes a user from the system. Requires Basic auth header for validation.
**/user/login** (GET) if user passes authentication it reuturns some details about the user
**/user** (GET) Returns user profile /user/timetable (GET) Pass url for timetable in headers for a JSON return of all timetabled sessions for the user

**/staff/availability/:id** (GET) pass an id to endpoint for it to reurn the sessions that this member appears in
**/staff/search/:tag** (GET) Use the search enpoint such as /staff/search/name?q=searchterm avalible tags are (Skill, Language, name, speaks)
**/staff/profile/:id** (GET) Pass a lec_id to see the staff profile

**/favourites/:id** (GET) Returns favourites for given student id
**/favourites** (PUT) pass a stud_id and lec_id in headers to add a favourite
##### Developers Please Read

Currently the Api is very basic and only has a few endpoints. At this point it would be good to make sure that your development environments are set up to work with node. This is currently being developed in the latest version of node (7.5.0).

When working on the Api, just a few quick notes to help improve collaboration:

- Please save all dependencies that you end up using (using the --save flag) this adds them to the package.json file. This will save lots of headaches when trying to deploy the code

- 'npm install' please run this after pulling from the git repo to make sure that you have all the dependencies installed to be able to work on the Api.

- Although test driven development would be ideal please ensure that at the minumum you write tests for a unit as soon as it is finished.

- To run the api it is 'npm start' or alternatly node index.js
- All tests are to be stored in the spec folder with the following naming convention of <uni-name>-spec.js such as database-spec.js. To carry out tests'npm test'

- You will notice that when working on the API it is not possible to commit any changes unless all tests pass, this is Continuous Integration, it is possible to get around this and commit broken code, but please dont

- To deploy the changes to the API I have configured a heroku like environment allowing deployment by just git push deploy. Drop me a PM for me to help you set it up as it is fiddly. Alternatly here are the steps if you wish to do it yourself. Note these steps are for UNIX based environments, there are ways to do it on windows but they are not fun :/
    - Ensure that you can SSH into the API server.
    - Run the following command in terminal
        - `cat /path/to/public_key | ssh -i PATHTOKEY.ppk ubuntu@34.248.146.65 "sudo sshcommand acl-add dokku <yourname>"`
     - Apparently this is the command for windows athough I couldnt get it working
        - `"C:\path\to\public_key"| ssh -i PATHTOKEY.ppk ubuntu@34.248.146.65 "sudo sshcommand acl-add dokku <yourname>"`
    - Once that is done then It should echo a bunch of random digits back to you (this is the fingerprint of the SSH connection)
    - Add the Git remote
        - `git remote add deploy dokku@34.248.146.65:api`
        - `git remote add testenv dokku@34.248.146.65:apitestenv`
    - Now you can push to the new remote and dokku should build and deploy the application. You will see a load of feedback in the terminal, but dont worry about it. If something goes wrong when building the application then Dokku will refuse the pudh and keep the old version of the code
        -  `git push deoploy master`  to push to the main application. Runs on default port.
        -  `git push testenv <currentbranch>:master` to push to the test enviroment, you will recive a port number in the terminal back. normally the same
48.146.65:apitestenv`
    - Now you can push to the new remote and dokku should build and deploy the application. You will see a load of feedback in the terminal, but dont worry about it. If something goes wrong when building the application then Dokku will refuse the pudh and keep the old version of the code
        -  `git push deoploy master`  to push to the main application. Runs on default port.
        -  `git push testenv <currentbranch>:master` to push to the test enviroment, you will recive a port number in the terminal back. normally the same
