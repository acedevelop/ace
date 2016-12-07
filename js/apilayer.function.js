$("document").ready(function(){
    // set endpoint and your access key
    var endpoint = 'live'
    var access_key = '60f71ca5e0b18f7b90c9fb2271ab3780';

    // get the most recent exchange rates via the "live" endpoint:
    $.ajax({
        url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key,   
        dataType: 'jsonp',
        success: function(json) {

            // exchange rata data is stored in json.quotes
            console.log(json.quotes.USDCAD);

            // source currency is stored in json.source
            console.log(json.source);

            // timestamp can be accessed in json.timestamp
            console.log(json.timestamp);

        }
    });
});
