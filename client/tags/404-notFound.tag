<not-found>
  <div class="page-header">
    <h2 class="col-md-offset-1">Page not found - 404</h2>
  </div>
  <div class="container vert-offset-top-8">
    <div class="row">
      <h3 class="col-md-offset-2">
        <strong style="font-size: 100px;">404</strong>... Please wait I will redirect you in the right way.<img class="img-logo" src="images/home-icon.png"></h3>
      <div class="progress progress-striped active page-progress-bar">
        <div class="progress-bar" style="width: 100%;"></div>
      </div>
    </div>
  </div>

  <script>
    this.on('mount', setTimeout(function () {
      // triggering the redirect after three seconds
      //
      /*
        the double // skip the first /
        'cause if not set // the url will be #contacts instead of #/contacts
      */
      router.navigateTo('//contacts');
    }, 3000))
  </script>
</not-found>
