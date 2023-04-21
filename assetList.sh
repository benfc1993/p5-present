#! /bin/bash

yourfilenames=`ls ./public/assets/images`
filesCount=`ls ./public/assets/images | wc -l`

rm -rf ./src/filesList.json
touch ./src/filesList.json
echo "[" >> ./src/filesList.json

i=0
echo 
for eachfile in $yourfilenames
do
    if (("$i" < "$filesCount - 1")); then
      echo \"$eachfile\",  >> ./src/filesList.json;
    else
      echo \"$eachfile\"  >> ./src/filesList.json;
    fi
   i=$i+1;
done

echo "]" >> ./src/filesList.json
