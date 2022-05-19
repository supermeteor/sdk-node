curl --request POST \\
  --url https://api.supermeteor.com/whatsapp/send \\
  --header 'content-type: application/json' \\
  --data '{
    "fromPhone": "+852 yyyy yyyy",
    "secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "phone": "+852 xxxx xxxx",
    "message": "test message",
}'