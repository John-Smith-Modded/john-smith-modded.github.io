window.onload = function(){
  InstantClick.init();

  // Google analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  // Register
  ga('create', 'UA-50893232-1', 'js-legacy.net');
  // Special Instant Click for page change
  InstantClick.on('change', function() {
    ga('send', 'pageview', location.pathname + location.search);
  });
  // Outbound Link Tracking with Google Analytics
  $(function() {
    $("a").on('click',function(e){
      var url = $(this).attr("href");
      // If not current domain send event
      if (url != undefined && e.currentTarget.host != window.location.host) {
        // Send event
        ga('send', 'event', 'Outbound Links', e.currentTarget.host.replace(':80',''), url)
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
};