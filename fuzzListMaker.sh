lines=$(cat $1) 
echo "[" >> $2
for line in $lines
do
   echo "{" >> $2
   echo "\"fuzzVal\": \"$line@mail.com\"" >> $2
   echo "}," >> $2
   echo "{" >> $2
   echo "\"fuzzVal\": \"$line@gmail.com\"" >> $2
   echo "}," >> $2
done
echo "{" >> $2
echo "\"fuzzVal\": \"lastOne@mail.com\"" >> $2
echo "}" >> $2
echo "]" >> $2
