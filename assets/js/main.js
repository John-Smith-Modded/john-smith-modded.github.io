window.onload = function(){
  InstantClick.init();

  // Google analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  // Register
  ga('create', 'UA-50893232-1', 'js-legacy.net');
  // Send default pageview
  ga('send', 'pageview');

  // Special Instant Click for page change
  InstantClick.on('change', function() {
    ga('send', 'pageview', location.pathname + location.search);
  });
};

// Outbound Link Tracking with Google Analytics
$(function() {
  $("a").on('click',function(e){
    var url = $(this).attr("href");
    // If not current domain send event
    if (url != undefined && e.currentTarget.host != window.location.host) {
      // Current target host
      var url_host=e.currentTarget.host.replace(':80','');
      // Get the ending of the url
      var url_file = url;
      url_file = url_file.substring(0, (url.indexOf("#") == -1) ? url_file.length : url_file.indexOf("#"));
      url_file = url_file.substring(0, (url.indexOf("?") == -1) ? url_file.length : url_file.indexOf("?"));
      url_file = url_file.substring(url_file.lastIndexOf("/") + 1, url_file.length);
      // Send Event
      if(url_file.match(/\.zip$/)) {
        ga('send', 'event', 'outbound_file', url_host, url_file)
      }
      else {
        ga('send', 'event', 'outbound_link', url_host, url)
      }
      // Set var if new tab
      if (e.metaKey || e.ctrlKey || e.which === 2) {
        var newtab = true;
      }
      // Send window to new location
      if (!newtab) {
        e.preventDefault();
        setTimeout('document.location = "' + url + '"', 100);
      }
    }
  });
});