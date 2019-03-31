#!/bin/ksh

#This bash script is run on a different server due to the constraints of our AWS instance. Currently being run on one of the team members 
#personal pc. After the Lock file has been touched in the /tmp directory the crontab checks every 5 minutes for it and makes sure that the
#process isn't already running. It processes all the cropped images for each of the lots in our test set and creates a POST request to 
#send back to the AWS instance, which will then trigger a SQL update and push out the update to all the clients using our app.

#Make sure and instance isn't already running.
if  test -f /tmp/processing.txt
then
        exit 0

else
        touch /tmp/processing.txt
#Make sure we are in the correct directory.
        cd /home/smartparku/darknet

#Loop through all the images in the lots to create the in-file for YOLO to process.
        for x in $(ls /home/smartparku/darknet/spImages/*/*)
                do echo $x >> test.txt
                done

#Run image detection on the image file we created in the for loop. threshold set to 45% to eliminate multiple detections on the same vehicle. However, this isn't quite perfect due to using
# a pre-trained weight and cfg files.
        ./darknet detector test cfg/coco.data cfg/yolov3.cfg yolov3.weights -thresh 0.45 < test.txt >> /home/smartparku/darknet/results.txt

#variables to keep track of how many vehicles were detected during the image processing.
        greenhouseCount=0
        west_linhfieldCount=0
        south_gattonCount=0

        while read x
        #Here we check to see which lot the vehicle needs to be added to for total count by looking at the file path which is above the objects detected.
        do if [[ $x == *"Enter"* ]]
                then Lot=$(echo "$x" | grep -o "s/greenhouse\|s/west-linhfield\|s/south-gatton");
                fi

                #check to see if the line contains car, truck, or bus which are all options for vehicles in our lots
                if [[ $x == *"car"*  || $x == *"truck"* || $x == *"bus"* ]]
                then
                        #Based on the sting match in the first if we add to the count of each variable of how many vehicles we see in each lot
                        case $Lot in
                        s/greenhouse) ((greenhouseCount++));;
                        s/west-linhfield) ((west_linhfieldCount++));;
                        s/south-gatton) ((south_gattonCount++));;
                        esac;
                fi
        #the while loop reads in from the file we created from the YOLO output.
        done < /home/smartparku/darknet/results.txt

#create the post request to send back to the server and echo that into the terminal to send the update.
        echo 'curl -H "Content-Type: application/json" --request POST --data {"lotUpdates":[ {"lotName":"greenhouse", "spotsOccupied":'$greenhouseCount'},{"lotName":"west-linhfield", "spotsOccupied": '$west_linhfieldCount'},{"lotName":"south-gatton", "spotsOccupied": '$south_gattonCount'}} http://18.222.24.171:12547/update-lots' >> POST.request

#clean up batch files fo next run
        rm /home/smartparku/darknet/test.txt /home/smartparku/darknet/results.txt
        rm /tmp/darknetLock.txt /tmp/processing.txt
        exit 0
fi




#@article{yolov3,
#  title={YOLOv3: An Incremental Improvement},
#  author={Redmon, Joseph and Farhadi, Ali},
#  journal = {arXiv},
#  year={2018}
#}

