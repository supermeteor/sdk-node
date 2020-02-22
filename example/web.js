sendWhatsapp({phone, message})

var sendWhatsapp = ({phone, message}) => {
    
    var data = JSON.stringify({
      "fromPhone": "+85264445555",
      "secret": "YOUR_SECRET",
      phone,
      message,
    });

    jQuery.ajax({
        url: 'https://api.supermeteor.com/whatsapp/send',
        type: 'post',
        data,
        headers: {
            'content-type': 'application/json',
        },
        dataType: 'json',
        success: function (data) {
            console.log('sent!')
        },
        error: function(err, data) {
            alert(err.responseJSON.message)
        }
    });
}
