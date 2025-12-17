(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MK9FWB4L');
// Automatically removes .html from the URL bar without reloading the page
if (window.location.pathname.endsWith(".html")) {
    var cleanUrl = window.location.pathname.replace(".html", "");
    window.history.replaceState(null, null, cleanUrl);
}
