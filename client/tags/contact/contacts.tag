<contacts>
  <div class="col-md-6 col-md-offset-3 vert-offset-top-8">
    <form onsubmit={ search }>

      <div class="input-group input-group-lg { errorClass }">
        <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
        <input ref="contactInput" type="text" class="form-control" placeholder="Search for a contact...">
      </div>
      <!-- /input-group -->
      <!-- /.col-lg-6 -->
    </form>
    <!-- SHOW ERROR -->
    <div if={ errorMsg } class="alert alert-danger alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" class="contact-close">&times;</span>
      </button>
      <strong>Error:
      </strong>{ errorMsg }
    </div>
    <!-- CONTACT LIST -->
    <div ref="divContactBadge" class="col-md-offset-2 contact-badge ">
      <ul class="list-group ">
        <li each={ contactList } class="list-group-item contact-custom { errorNoResFound }">
          <span if={ number } class="badge badge-size">{ number }</span>
          <strong>{ name } { surname }</strong>
        </li>
      </ul>
    </div>

    <div if={ isLoading } class="col-md-offset-5">
      <img src="images/loading.gif">
    </div>
  </div>
  <script>
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
              /*Data found are empty*/
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

    /**
     * Search callback
     */
    search(e) {
      var search = this.refs.contactInput.value
      /*
      Cleaning input from some html tags
      */
      search = inputCleaner(search);
      /*Create the search key*/
      search = search.replace(" ","_");
      /*prevent submit default*/
      e.preventDefault();
      /* if try to submit nothing*/
      if (!search || search.length == 0) {
        reset();
        this.errorMsg = "Insert a value. Don't cheat!";
        this.errorClass = "has-error";
      }
      /* if try to submit something less than 3 char*/
      else if (search.length < 3) {
        reset();
        this.errorMsg = "Insert more than 3 char";
        this.errorClass = "has-error";
      }
      /* optimization: if different from the last word searched*/
      else if (lastSearch != search) {
        reset();
        this.isLoading = true
        doApiRequest(search);
      }
      lastSearch = search
    }

  </script>

</contacts>
