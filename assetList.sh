#! /bin/bash

load_files() {
  yourfilenames=`ls $(echo "./public/assets/${1}")`
  filesCount=`ls $(echo "./public/assets/${1}") | wc -l`
  listFile="./src/${1}List.json"

  rm -rf $listFile
  touch $listFile
  echo "[" >> $listFile

  i=0
  echo 
  for eachfile in $yourfilenames
  do
      if (("$i" < "$filesCount - 1")); then
        echo \"$eachfile\",  >> $listFile;
      else
        echo \"$eachfile\"  >> $listFile;
      fi
    i=$i+1;
  done

  echo "]" >> $listFile
  return 0
}

load_Fonts() {
  yourfilenames=`ls ./public/assets/fonts`
  filesCount=`ls ./public/assets/fonts | wc -l`

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
  return 0
}

load_files images
load_files fonts
