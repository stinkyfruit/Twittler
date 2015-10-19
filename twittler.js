$(document).ready(function() {
    var $body = $('body');
    //        $body.html('');
    var index = streams.home.length - 1;

    var receivedTweets = [];

    while (index >= 0) {
        var tweet = streams.home[index];
        $('.tweets', '.all-tweets').prepend(createTweet(tweet));
        receivedTweets.push(tweet);
        index -= 1;
    }

    // get timestamp of latest recieved tweet
    // get all tweets from stream that were created after that timestamp
    function getLatestTweets() {
        var previousTimeStamp = receivedTweets[receivedTweets.length - 1].created_at;
        return streams.home.filter(function(tweet) {
            return tweet.created_at > previousTimeStamp;
        });
    }

    // add a single tweet to the page
    function createTweet(tweet) {
        var $tweet = $(document.createElement('div')).addClass("tweet");

        var $userName = $(document.createElement('span'))
            .addClass('username')
            .text('@' + tweet.user + ': ')
            .attr('data-username', tweet.user)
            .on('click', getUserTweets);

        var $message = $(document.createElement('span'))
            .addClass('message')
            .text(tweet.message);

        var $createdAt = $(document.createElement('span'))
            .addClass('created-at')
            .text(tweet.created_at);

        $tweet
            .append($userName)
            .append($message)
            .append($createdAt);

        return $tweet;
    }

    function updateTweets() {
        var latest = getLatestTweets();
        latest.forEach(function(t) {
            $('.tweets', '.all-tweets').prepend(createTweet(t));
        })
    };

    $('button.update-tweets').on('click', updateTweets);

    //on click of div, show that username's tweets only
    function getUserTweets(event) {
        var $userTweets = $('.tweets', '.user-tweets');
        $userTweets.empty();
        var userName = $(event.target).attr('data-username');
        var userTweets = streams.home.filter(function (tweet) {
            return tweet.user === userName;
        });
        userTweets.forEach(function (t) {
          $('.tweets' ,'.user-tweets').prepend(createTweet(t));
        });
        $('.user-tweets').fadeIn(200);
        $('.all-tweets').fadeOut(200);
    };

    function returnToAllTweets () {

    }

    $().on()    

    $('.user-tweets').hide();

});