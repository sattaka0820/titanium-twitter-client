var win = Ti.UI.currentWindow;
var textArea = Ti.UI.createTextArea({
    height:150,
    width:300,
    top:10,
    font:{fontSize:20},
    borderWidth:2,
    borderColor:'#bbb',
    borderRadius:5
});

win.add(textArea);
var postButton = Ti.UI.createButton({
    top: 170,
    right: 10,
    width: 100,
    height: 44,
    title: 'POST'
});
win.add(postButton);

Ti.include("lib/twitter_api.js");
//initialization
var twitterApi = new TwitterApi({
    consumerKey:'VVXyB058XzC0XTpYnOcAw',
    consumerSecret:'ydB6sZRKgFYMoQ2fej2aTggC5qlksIS3W2LJPNqa84'
});
twitterApi.init(); 

function tweet(message) {
    var params = {status: message};
    //status update
    twitterApi.statuses_update({
        onSuccess: function(responce){
            var row = Titanium.UI.createTableViewRow({
                className: "tweet",
                height: 'auto'
            });

            
            row.add(Titanium.UI.createLabel({
                text: responce.user.screen_name,
                top: 8,
                left: 64,
                height: 16
            }));
            

            row.add(Titanium.UI.createLabel({
                text: message,
                top: 32,
                left: 64,
                right: 8,
                height: 'auto',
                bottom: 8
                
            }));

            row.add(Titanium.UI.createImageView({
                image: responce.user.profile_image_url,
                top: 8,
                left: 8,
                width: 48,
                height: 48
            }));
            
            win.tableView.insertRowBefore(0, row, {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
        },
        onError: function(error){
            Ti.API.error(error);
        },
        parameters:params
    });
}

postButton.addEventListener(
    'click',
    function () {
        if (textArea.value) {
            tweet(textArea.value);
            win.close({animated:true});
        }
    }
);
