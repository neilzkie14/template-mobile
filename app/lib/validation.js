export function validate(type, input) {
    switch (type) {
      case 'required':
        return input?.length > 0 ? true : false;
      case 'text':
        var re = /^([a-zA-Z])/;
        return re.test(input) ? true : false;
      case 'number':
        var re = /^(\d+\.?\d*$)/;
        return re.test(input) ? true : false;
      case 'name':
        var re = /^([A-Z\p{L}]{1,}[a-z\p{L}]{1,})+(([', -][a-zA-Z\p{L} ])?[a-zA-Z\p{L}]*)*$/giu;
        return re.test(input) ? true : false;
      case 'carname':
        var re = /^([a-zA-Z0-9 ]*)$/;
        return re.test(input) ? true : false;
      case 'phone':
        var re = /^(09|\+639)\d{9}$/;
        return re.test(input) ? true : false;
      case 'email':
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(input) ? true : false;
      case 'password':
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{7,50}/;
        return re.test(input) ? true : false;
      case 'username':
        var re = /^([a-zA-Z0-9]{4,}[$@$!%*.?&]{0,})+([a-zA-Z0-9]{0,})$/;
        return re.test(input) ? true : false;
      case 'plate':
        // var re = /^([a-zA-Z]{2}\s?\d{4}|[a-zA-Z]{3}\s?\d{3,4})$/;
        // return (re.test(input)) ? true : false;
        // dont ask me why, client's request
        return input.length <= 8;
      case 'rfid':
        var re = /^(\d{12})$/;
        return re.test(input) ? true : false;
      case 'color':
        return input != '' && input != 'Select Color' ? true : false;
      default:
        return 0;
    }
  }
  