riot.tag2('not-found', '<div class="page-header"> <h2 class="col-md-offset-1">Page not found - 404</h2> </div> <div class="container vert-offset-top-8"> <div class="row"> <h3 class="col-md-offset-2"> <strong style="font-size: 100px;">404</strong>... Please wait I will redirect you in the right way.<img class="img-logo" src="images/home-icon.png"></h3> <div class="progress progress-striped active page-progress-bar"> <div class="progress-bar" style="width: 100%;"></div> </div> </div> </div>', '', '', function(opts) {
    this.on('mount', setTimeout(function () {

      router.navigateTo('//contacts');
    }, 3000))
});

riot.tag2('about', '<div class="page-header"> <h2 class="col-md-offset-1">About</h2> </div> <div>This will be the about page</div>', '', '', function(opts) {
});

riot.tag2('contacts', '<div class="col-md-6 col-md-offset-3 vert-offset-top-8"> <form onsubmit="{search}"> <div class="input-group input-group-lg {errorClass}"> <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span> <input ref="contactInput" type="text" class="form-control" placeholder="Search for a contact..."> </div> </form> <div if="{errorMsg}" class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true" class="contact-close">&times;</span> </button> <strong>Error: </strong>{errorMsg} </div> <div ref="divContactBadge" class="col-md-offset-2 contact-badge "> <ul class="list-group "> <li each="{contactList}" class="list-group-item contact-custom {errorNoResFound}"> <span if="{number}" class="badge badge-size">{number}</span> <strong>{name} {surname}</strong> </li> </ul> </div> <div if="{isLoading}" class="col-md-offset-5"> <img src="images/loading.gif"> </div> </div>', '', '', function(opts) {
    var errorMsg = "";
    var contactList = [];
    var lastSearch = null;
    var errorClass = "";
    var errorNoResFound = "";

      reset = function () {
        this.contactList = [];
        this.errorMsg = "";
        this.errorClass = "";
        this.errorNoResFound = "";
      }.bind(this)

    doApiRequest = debounce(function (searchWord) {
      fetch(SERVER_ADDRESS + "/contacts/search/" + searchWord).then(function (res) {
        return res.json();
      }).then(function (data) {
        reset();
        if (this.refs.contactInput.value) {
          if (data) {
            if(data.contacts.length > 0){
              this.contactList = data.contacts
            }else{

              this.contactList = [{"name": 'No result found'}]
                this.errorNoResFound = "errorNoResFound";
              }
          } else {
            this.errorMsg = data.error;
            this.errorClass = "has-error";
            console.error("error: " + data.error);
          }
        }
        this.isLoading = false
        this.update()
      }.bind(this))
    }.bind(this), 300, false)

    this.search = function(e) {
      var search = this.refs.contactInput.value

      search = inputCleaner(search);

      search = search.replace(" ","_");

      e.preventDefault();

      if (!search || search.length == 0) {
        reset();
        this.errorMsg = "Insert a value. Don't cheat!";
        this.errorClass = "has-error";
      }

      else if (search.length < 3) {
        reset();
        this.errorMsg = "Insert more than 3 char";
        this.errorClass = "has-error";
      }

      else if (lastSearch != search) {
        reset();
        this.isLoading = true
        doApiRequest(search);
      }
      lastSearch = search
    }.bind(this)

});

riot.tag2('feedback', '<div class="page-header"> <h2 class="col-md-offset-1">Feedback</h2> </div> <div>This will be the feedback page</div>', '', '', function(opts) {
});

riot.tag2('headertag', '<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li class="{item: true,active: menu.url.substring(1) == router.current.uri}" each="{menu in this.createLeftMenus()}"> <a href="{menu.url}">{menu.text}<span class="sr-only">(current)</span></a> </li> </ul> </div> </div> </nav>', '', '', function(opts) {

    this.on('*', function(eventName) {
      console.info(eventName)
    })

  router.on('route:updated', function() {
    this.update();
  }.bind(this));

    this.createLeftMenus = function() {
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
    }.bind(this)

    this.updateNavBar = function(){
      this.update();
    }.bind(this)
});
