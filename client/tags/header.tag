<headerTag>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class={item: true,active: menu.url.substring(1) == router.current.uri} each={menu in this.createLeftMenus()}>
            <a  href="{menu.url}">{menu.text}<span class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>

<script>
  // curious about all events ?
    this.on('*', function(eventName) {
      console.info(eventName)
    })

    // On route update, update this fragment.
  router.on('route:updated', function() {
    this.update();
  }.bind(this));

    createLeftMenus() {
      return [
        {
          url: '#/contacts',
          text: 'Contacts'
        },{
          url: '#/feedback',
          text: 'Feedback'
        },{
          url: '#/about',
          text: 'About'
        }
      ];
    }

    updateNavBar(){
      this.update();
    }
  </script>

</headerTag>
