# SmartParkU App
Purpose of this project is to display parking lot status via image recognition and object localization powered by YOLO. 
	- Languages used: GO, JavaScript, and Bash
	
## Front End
The User Interface is written in React-Native, a Javascript Framework and is run using the expo CLI. refer to the [Expo CLI Quickstart](https://facebook.github.io/react-native/docs/getting-started) to get an initial React-Native project started. Once the project has been created on your system you should have a folder with the name of the project with an App.js file in it. Put all .png files located in the UI folder above, in the root folder of the project (where App.js is). Next, in your shell navigate to to the newly created project folder and type
```
npm install --save react-navigation
```
This will install the react-navigation dependency needed to run the application. Finally, replace default App.js with the App.js located in the UI folder above. When prompted to replace the file select yes/replace.

## Back End

### AWS Instance

### YOLO Instance
*Our project we had to seperate out where the GO server was running and where YOLO was running due to system constraints*

For installing, running and training YOLO, please refer to the YOLO website or visit AlexyAB's repository for darknet.
	YOLO Website: https://pjreddie.com/darknet/yolo/ 
	AlexyAB's Repo: https://github.com/AlexeyAB/darknet

#### System Requirements 	

##### After set up and installation we have a cron instance to check for updates to files which triggers the bash script to process all the images.

Crontab Entry 
	`*/1 * * * * test -f /tmp/darknetLock.txt && /home/smartparku/processBatch.sh`
