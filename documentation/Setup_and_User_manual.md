> **<u>Fit-O-Fine User Manual</u>**

Install Node on your machine if not present (First check if node is
present by running the command “node -v” in cmd).

> [<u>https://nodejs.org/en/download/</u>](https://nodejs.org/en/download/)

Download windows .exe to install node js in your windows system. Else
you can choose distribution for your operating system.

Follow this video tutorials if you need any additional help for windows:
[<u>https://youtu.be/\_\_7eOCxJyow</u>](https://youtu.be/__7eOCxJyow)

NOTE: The downloaded version must be greater or equal to **LTS**
**Version:** **20.11.1** (includes npm 10.2.4)

**Install** **Truffle** **Suite** **in** **System:**

To install truffle suite in the system follow the below steps:

> 1\. In a terminal, use NPM to install Truffle : npm install -g truffle
>
> 2\. You may receive a list of warnings during installation. To confirm
> that Truffle was installed correctly, run : truffle version
>
> Follow the below steps to run the application,

**Steps** **to** **Install** **and** **Create** **wallet** **on**
**Metamask** **:**

> <img src="./assets/images/setup_manual/5ibuui1l.png"
> style="width:6.27083in;height:3.19792in" />1. Install Metamask wallet,
> [<u>https://metamask.io/</u>](https://metamask.io/) click on install
> for chrome. After installation click on the extension, this page will
> open.

<img src="./assets/images/setup_manual/wsytwhqc.png"
style="width:6.27083in;height:4.04167in" />

> Figure 1:Metamask Create wallet Page
>
> 2\. Create an ‘Import wallet’. Then copy this ‘seed phrase for
> Metamask account to be used’ and paste it into the first cell.
>
> Figure 2: Metamask Create wallet Page

**Install** **and** **Setup** **Ganache:**

> 1\. Install Ganache. Go to
> [<u>https://trufflesuite.com/ganache/</u>](https://trufflesuite.com/ganache/)
> 2. Click on “Download Windows”.
>
> 3\. Open the downloaded file and install Ganache. After installation
> it will look like this:

<img src="./assets/images/setup_manual/spwzk2le.png"
style="width:6.27083in;height:4.17708in" /><img src="./assets/images/setup_manual/4nssf5fl.png"
style="width:6.27083in;height:4.16667in" />

> Figure 3: Ganache Workspace creation
>
> 4\. Create a New Workspace and give it a Name. Then click Save
> Workspace.
>
> Figure 4: Ganache Workspace

<img src="./assets/images/setup_manual/zpxonknj.png"
style="width:6.27083in;height:4.01042in" /><img src="./assets/images/setup_manual/1ixucfu1.png"
style="width:4.08333in;height:3.3125in" />

> 5\. Click on Show Key on the rightmost side of every account in the
> workspace that is the “KEY” symbol. Copy the “Private Key”.
>
> Figure 5: Private Key of an Account
>
> 6\. Now go to Metamask in the browser and click on “My accounts” and
> “Import account”. Paste the copied private key there and import.
> Repeat the process at least for the first 3 accounts from the
> workspace.
>
> Figure 6: Import Account

<img src="./assets/images/setup_manual/icccoskf.png"
style="width:6.27083in;height:3.55208in" />

> 7\. Keep the workspace open in ganache. Also stay logged in to the
> metamask account before starting the project.

**Follow** **the** **below** **given** **steps** **to** **run** **the**
**Application:**

> 1\. Download the source code from
> [<u>Link</u>](https://github.com/A-Little-Hat/fit-o-fine) .
>
> 2\. Now select the downloaded zip file and then right click on it and
> then Extract All. This will create a Directory where all the files
> required to run the application are present.
>
> 3\. Go to [<u>Google AI studio</u>](https://aistudio.google.com/app/)
>
> 4\. Check the checkboxes
>
> Figure 7: Google AI Studio

<img src="./assets/images/setup_manual/hsajd30x.png"
style="width:6.27083in;height:3.54167in" />

> 5\. Click get API key
>
> Figure 8: Get API Key
>
> 6\. Click Create api key
>
> <img src="./assets/images/setup_manual/0rhuci10.png"
> style="width:6.27083in;height:3.07536in" />Figure 9: Create API Key
>
> 7\. Click Create api key in new project
>
> <img src="./assets/images/setup_manual/qtev0wie.png"
> style="width:6.27083in;height:3.02887in" />Figure 10: Create API in
> new project
>
> 8\. Copy the API key and go to the server folder and create a file
> named .env and create a variable in the file named GEMINI_API_KEY and
> paste the API key that is already copied in the last step.
>
> Here is a small example of the
> variable:-GEMINI_API_KEY=paste_your_api_key
>
> 9\. Go to the server folder and in the .env and paste this
> ``` MONGO_DB_URL=mongodb+srv://root:root@cluster0.7yhmbar.mongodb.net/?retryWrites=true&w=majority ```
>
> NOTE: we have to navigate to the root first. Then go to the server and
> create a text document. Paste your above two keys in the document and
> then save as the file and change the extension to All files and then
> give the file name as .env
>
> 10.Now open terminal and navigate into the root folder that is
> fit-o-fine-main/fit-o-fine
>
> 11.Then type command npm run setup and then run npm start
>
> 12.In chrome open
> “[<u>http://localhost:3000</u>](http://localhost:3000)” and you will
> see the home page of the application.

**Working** **of** **the** **Application:**

> 1\. Open the URL of the application ( <u><http://localhost:3000>)</u>
> in your Chrome browser where we have installed metamask.

<img src="./assets/images/setup_manual/2b0lbp32.png"
style="width:6.27083in;height:3.07292in" /><img src="./assets/images/setup_manual/c5y4eqjl.png"
style="width:6.27083in;height:3.21875in" />

> Figure 11: Organization/Admin Login Page
>
> 2\. Click on the “Org Login/ADMIN” then Metamask popup will open,
> asking you to connect your metamask wallet to our application. If your
> metamask is locked it may ask you to enter your password first, Enter
> your password and you are ready to use.
>
> Figure 12: Connect to Metamask page
>
> 3\. After entering the password then click on “Connect to Metamask”
> button it will popup and then import the admin account and connect.

<img src="./assets/images/setup_manual/bptoqlp2.png"
style="width:6.27083in;height:3.03125in" /><img src="./assets/images/setup_manual/4myvremp.png"
style="width:6.27083in;height:2.875in" />

> Figure 13: Admin Dashboard
>
> 4\. Now for new Organisation Registration you can choose from the
> previously imported Accounts or you can import another Account using
> the private key.
>
> Figure 14: Copying the Private Key of an Account

<img src="./assets/images/setup_manual/si5rnaah.png"
style="width:4.64583in;height:7.84375in" />

> Figure 15: Click on The Add Account or select another imported Account

<img src="./assets/images/setup_manual/acyx4s15.png"
style="width:3.45833in;height:3.9375in" /><img src="./assets/images/setup_manual/4f1mzxdk.png"
style="width:3.44792in;height:3.73958in" />

> Figure 16: Click import account
>
> Figure 17: Paste Private Key and import

<img src="./assets/images/setup_manual/b34dk0nh.png"
style="width:3.55208in;height:5.98958in" /><img src="./assets/images/setup_manual/4invjx4y.png"
style="width:6.27083in;height:2.40625in" />

> Figure 18: New Account is ready
>
> 5\. Now connect the new Account then refresh the page. Then the new
> organisation registration page will open.
>
> Figure 19: New Organization Registration Page

<img src="./assets/images/setup_manual/kk1mrv2x.png"
style="width:6.27083in;height:3.21875in" /><img src="./assets/images/setup_manual/4gvsqao0.png"
style="width:6.27083in;height:1.66667in" />

> 6\. Click on Register and then fill the details and then confirm the
> transaction to send the request to the admin.
>
> Figure 20: Confirm transaction to send approval request
>
> 7\. Now connect with the ADMIN account to approve or reject the
> request through the Approvals option and confirm the transaction.
>
> Figure 21: Approvals Page
>
> 8\. Admin can see all the registered Organisations through the View
> Organisations option.

<img src="./assets/images/setup_manual/e2z1lcmg.png"
style="width:6.27083in;height:2.69792in" /><img src="./assets/images/setup_manual/vuhgzzq0.png"
style="width:6.27083in;height:2.76042in" /><img src="./assets/images/setup_manual/0tna4njv.png"
style="width:6.27083in;height:1.55208in" />

> Figure 22: View Organisations Page
>
> 9\. After getting approved by the Admin the Organisation dashboard is
> now available for that account.
>
> Figure 23: Organisation Dashboard
>
> 10.In the Add Patient option new patients can be added for a
> particular test by selecting the test and filling the details.
>
> Figure 24: Add Patient Page

<img src="./assets/images/setup_manual/x1wkwimb.png"
style="width:6.27083in;height:3.15625in" /><img src="./assets/images/setup_manual/tb1nt3dp.png"
style="width:6.27083in;height:2.71875in" />

> 11.For existing patients you can check by patient id or can add new
> patient by “click here”
>
> 12.Then we have to fill the details of the new patient and select the
> test suppose “HAEMOGLOBIN” and enter the value of the haemoglobin then
> click the given below add button to create the transaction and then
> confirm the transaction.
>
> Figure 25: Patient details for particular test
>
> 13.After confirming the transaction a popup will arise that the
> patient is added successfully.
>
> 14.In the View Patient option it will show the test details of all
> patients.
>
> Figure 26: View Patient Page

<img src="./assets/images/setup_manual/0stxenxy.png" style="width:6.27083in;height:1.5in" /><img src="./assets/images/setup_manual/nxan24rx.png"
style="width:6.27083in;height:2.98958in" />

> 15.In the “Search” page on the basis of 4 criterias you can search
> existing patients medical reports.
>
> Figure 27: Search Page
>
> 16.By clicking on “Report Date” you can easily fetch the reports of
> the tests that are held between a specific date range.
>
> Figure 28: Search by Report Date
>
> And search by “Test Name” or any particular parameter will show all
> the tests containing that parameter or having that “test Name”.

<img src="./assets/images/setup_manual/gc5ycz0k.png"
style="width:6.27083in;height:2.98958in" /><img src="./assets/images/setup_manual/lgl0ziyj.png"
style="width:6.27083in;height:2.69792in" />

> Figure 29: Search by Test Name
>
> 17.The Patient-Login option leads to the Patient login page where the
> patient id and his/her corresponding gmail is required as the
> credentials.
>
> Figure 30: Patient-Login Page
>
> 18.The patient dashboard contains the test information of any
> particular patient.

<img src="./assets/images/setup_manual/s0fem0fj.png"
style="width:6.27083in;height:2.95833in" /><img src="./assets/images/setup_manual/pqskx1qu.png"
style="width:6.27083in;height:2.34375in" />

> Figure 31: Patient Dashboard
>
> 19.The “View” button shows the report of the patient of that
> particular test.
>
> Figure 32: Report Generated
>
> 20.By clicking the download button the report can be downloaded.
>
> 21.There is also a Chatbot facility at the bottom right corner of the
> Patient Dashboard.

<img src="./assets/images/setup_manual/ma4hmoah.png"
style="width:6.27083in;height:2.82292in" />

> Figure 33: Chatbot
