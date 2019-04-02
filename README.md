# SmartParkU App
Purpose of this project is to display parking lot status via image recognition and object localization powered by YOLO. 
	- Languages used: GO, JavaScript, and Bash
	
## Front End

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
