#!/bin/bash

outfile=$1
if [ $# -eq 0 ]; then
    outfile="out.gif"
fi

files=""
while read file;
do
  files="$files $file";
done

convert -delay 20 -dispose Background $files -loop 0 $outfile
rm $files
