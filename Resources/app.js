// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window
var win1 = Titanium.UI.createWindow({  
    title:'Timeline',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'ツイート',
    window:win1
});

var tableView = Titanium.UI.createTableView({
    data: [
        {title: ""}
    ]
});

var http = Titanium.Network.createHTTPClient();
http.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=shinderumanbot3");
http.onload = function() {
    var json = JSON.parse(http.responseText);
    tableView.data = json.map(function(tweet) {
        return({title: tweet.text});
    });
};
http.send();

http.onload = function() {
    var json = JSON.parse(http.responseText);
    tableView.data = json.map(function(tweet) {
        var row = Titanium.UI.createTableViewRow({
            className: "tweet",
            height: 'auto'
        });

        row.add(Titanium.UI.createLabel({
            text: tweet.user.screen_name,
            top: 8,
            left: 64,
            height: 16
        }));

        row.add(Titanium.UI.createLabel({
            text: tweet.text,
            top: 32,
            left: 64,
            right: 8,
            height: 'auto',
            bottom: 8
        }));

        row.add(Titanium.UI.createImageView({
            image: tweet.user.profile_image_url,
            top: 8,
            left: 8,
            width: 48,
            height: 48
        }));

        return(row);
    });
};

var messageButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.ADD
});
messageButton.addEventListener(
    'click',
    function () {
        var messageWindow = Ti.UI.createWindow({
            url: 'message_window.js',
            title: 'message',
            backgroundColor: '#fff'
        });
        messageWindow.tableView = tableView;
        messageWindow.open();
    }
);
win1.rightNavButton = messageButton;

win1.add(tableView);

//  add tabs
tabGroup.addTab(tab1);

// open tab group
tabGroup.open();
