#! /bin/bash

load_files() {
  yourfilenames=`ls $(echo "./public/assets/${1}")`
  filesCount=`ls $(echo "./public/assets/${1}") | wc -l`
  listFile="./src/presentation/${1}List.ts"

  rm -rf $listFile
  touch $listFile
  echo "export const ${1} = [" >> $listFile

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

  echo "] as const" >> $listFile
  return 0
}

load_Fonts() {
  yourfilenames=`ls ./public/assets/fonts`
  filesCount=`ls ./public/assets/fonts | wc -l`

  rm -rf ./src/filesList.ts
  touch ./src/filesList.ts
  echo "export const fonts = [" >> ./src/filesList.ts

  i=0
  echo 
  for eachfile in $yourfilenames
  do
      if (("$i" < "$filesCount - 1")); then
        echo \"$eachfile\",  >> ./src/filesList.ts;
      else
        echo \"$eachfile\"  >> ./src/filesList.ts;
      fi
    i=$i+1;
  done

  echo "] as const" >> ./src/filesList.ts
  return 0
}

load_files images
load_files fonts
