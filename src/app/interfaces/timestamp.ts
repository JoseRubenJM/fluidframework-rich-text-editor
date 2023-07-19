export interface ITimestampDataModel {
	time?: string;
}

// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
//   <title>Change your password</title>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

//   <style type="text/css">
//     body,html{
//       padding:0;
//       margin:0;
//     }
//     .table{
//       display:table;
//       position:absolute;
//       height:100%;
//       width:100%;
//       {% unless tenant.colors.page_background %}
//         background:linear-gradient(rgba(255,255,255,.3),rgba(255,255,255,0));
//       {% endunless %}
//       background-color: {{tenant.colors.page_background | default: '#e8ebef'}};
//     }
//     .cell{
//       display:table-cell;
//       vertical-align:middle;
//     }
//     .content{
//       padding:25px 0;
//       margin-left:auto;
//       margin-right:auto;
//       width:280px;
//     }
//   </style>


// </head>
// <body>
//   <div class="table">
//     <div class="cell">
//       <div class="content">
//         <!-- WIDGET -->
//         <div id="change-password-widget-container"></div>
//         <!-- END WIDGET -->
//       </div>
//     </div>
//   </div>

//   <script src="https://cdn.auth0.com/js/change-password-1.5.min.js"></script>

//   <script>
//     new Auth0ChangePassword({
//       container:         "change-password-widget-container",                // required
//       email:             "{{email | escape}}",                              // DO NOT CHANGE THIS
//       csrf_token:        "{{csrf_token}}",                                  // DO NOT CHANGE THIS
//       ticket:            "{{ticket}}",                                      // DO NOT CHANGE THIS
//       password_policy:   "{{password_policy}}",                             // DO NOT CHANGE THIS
//       password_complexity_options:  {{password_complexity_options}},        // DO NOT CHANGE THIS
//       theme: {
//         icon: "{{tenant.picture_url | default: '//cdn.auth0.com/styleguide/1.0.0/img/badge.png'}}",
//         primaryColor: "{{tenant.colors.primary | default: '#ea5323'}}"
//       },
//       dict: {
//         // passwordPlaceholder: "your new password",
//         // passwordConfirmationPlaceholder: "confirm your new password",
//         // passwordConfirmationMatchError: "Please ensure the password and the confirmation are the same.",
//         // passwordStrength: {
//         //   containsAtLeast: "Contain at least %d of the following %d types of characters:",
//         //   identicalChars: "No more than %d identical characters in a row (e.g., "%s" not allowed)",
//         //   nonEmpty: "Non-empty password required",
//         //   numbers: "Numbers (i.e. 0-9)",
//         //   lengthAtLeast: "At least %d characters in length",
//         //   lowerCase: "Lower case letters (a-z)",
//         //   shouldContain: "Should contain:",
//         //   specialCharacters: "Special characters (e.g. !@#$%^&*)",
//         //   upperCase: "Upper case letters (A-Z)"
//         // },
//         // successMessage: "Your password has been reset successfully.",
//         // configurationError: "An error ocurred. There appears to be a misconfiguration in the form.",
//         // networkError: "The server cannot be reached, there is a problem with the network.",
//         // timeoutError: "The server cannot be reached, please try again.",
//         // serverError: "There was an error processing the password reset.",
//         // headerText: "Enter a new password for<br />{email}",
//         // title: "Change Password",
//         // weakPasswordError: "Password is too weak."
//         // passwordHistoryError: "Password has previously been used."
//       }
//     });
//   </script>
// </body>
// </html>
