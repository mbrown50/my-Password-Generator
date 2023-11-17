
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// object to hold pw criteria
// using same object throughout 
var PWcriteria = {
  PWlength: 0
  , isPWlowercase: false
  , isPWuppercase: false
  , isPWnumeric: false
  , isPWspecialChar: false
  , PWcharSet: 0
};

// password criteria arrays 
// nice to have here for visibility 
// easy to update if adding a new character set with asosciated object var
// could also declare locally in generatePassword()
var PWlowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
var PWuppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var PWnumeric = '0123456789'.split('');
// special characters: https://owasp.org/www-community/password-special-characters
var PWspecialChar = ' !"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'.split('');

// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector("#password");
  // get criteria from user
  if (setPWcriteria()) {
    // generate the password
    var password = generatePassword();
    // show password on screen
    passwordText.value = password;
  }
  else {
    passwordText.value = "Generate a Password:\nCancelled by user."
  }
}

// clear password criteria each time before setting it
function clearPWcriteria() {
  PWcriteria.PWlength = 0;
  PWcriteria.isPWlowercase = false;
  PWcriteria.isPWuppercase = false;
  PWcriteria.isPWnumeric = false;
  PWcriteria.isPWspecialChar = false;
  // boolean could be used 
  // used int count for future functionaithy expansion
  PWcriteria.PWcharSet = 0;
}


function setPWcriteria() {
  clearPWcriteria();
  // get password length
  var errorMsg = "";
  var PWcheck = true;
  while (PWcheck) {
    var PWinput = prompt(errorMsg + "Enter password length: 8 to 128 charcaters");
    if (PWinput == null) { // for cancel button
      return false
    } else if ((PWinput >= 8) && (PWinput <= 128)) {
      PWcriteria.PWlength = PWinput;
      PWcheck = false;
    } else {
      errorMsg = "Invalid answer.\n"
    }
  }
  // get lowercase criteria
  errorMsg = "";
  PWcheck = true;
  while (PWcheck) {
    // promts "Yes \ No"
    // allows valid Yes, Y, NO, N
    // not case sensitive
    var PWinput = prompt(errorMsg + "Yes \\ No\nInclude lowercase letters?");
    if (PWinput == null) { // for cancel button
      return false
    } else if ((PWinput.toUpperCase() === "YES") || (PWinput.toUpperCase() === "Y")) {
      PWcriteria.isPWlowercase = true;
      PWcriteria.PWcharSet++;
      PWcheck = false;
    } else if ((PWinput.toUpperCase() === "NO") || (PWinput.toUpperCase() === "N")) {
      PWcriteria.isPWlowercase = false;
      PWcheck = false;
    } else {
      errorMsg = "Invalid answer.\n"
    }
  }
  // get uppercase criteria
  errorMsg = "";
  PWcheck = true;
  while (PWcheck) {
    var PWinput = prompt(errorMsg + "Yes \\ No\nInclude uppercase letters?");
    if (PWinput == null) { // for cancel button
      return false
    } else if ((PWinput.toUpperCase() === "YES") || (PWinput.toUpperCase() === "Y")) {
      PWcriteria.isPWuppercase = true;
      PWcheck = false;
      PWcriteria.PWcharSets++;
    } else if ((PWinput.toUpperCase() === "NO") || (PWinput.toUpperCase() === "N")) {
      PWcriteria.isPWuppercase = false;
      PWcheck = false;
    } else {
      errorMsg = "Invalid answer.\n"
    }
  }
  // get numeric criteria
  errorMsg = "";
  PWcheck = true;
  while (PWcheck) {
    var PWinput = prompt(errorMsg + "Yes \\ No\nInclude numbers?");
    if (PWinput == null) { // for cancel button
      return false;
    } else if ((PWinput.toUpperCase() === "YES") || (PWinput.toUpperCase() === "Y")) {
      PWcriteria.isPWnumeric = true;
      PWcheck = false;
      PWcriteria.PWcharSet++;
    } else if ((PWinput.toUpperCase() === "NO") || (PWinput.toUpperCase() === "N")) {
      PWcriteria.isPWnumeric = false;
      PWcheck = false;
    } else {
      errorMsg = "Invalid answer.\n"
    }
  }
  // get special character criteria
  errorMsg = "";
  PWcheck = true;
  while (PWcheck) {
    var PWinput = prompt(errorMsg + "Yes \\ No\nInclude special characters?");
    if (PWinput == null) { // for cancel button
      return false;
    } else if ((PWinput.toUpperCase() === "YES") || (PWinput.toUpperCase() === "Y")) {
      PWcriteria.isPWspecialChar = true;
      PWcheck = false;
      PWcriteria.PWcharSet++;
    } else if ((PWinput.toUpperCase() === "NO") || (PWinput.toUpperCase() === "N")) {
      PWcriteria.isPWspecialChar = false;
      PWcheck = false;
    } else {
      errorMsg = "Invalid answer.\n"
    }
  }
  // check at least one character set criteria selected
  if (PWcriteria.PWcharSet < 1) {
    var PWinput = confirm("Error: No character set included.\n");
  }
  return true;
}


function generatePassword() {
  var PWgenerated = "";
  var charList = [];
  // if lowercase add lowever array
  if (PWcriteria.isPWlowercase) {
    var tempCharList = charList.concat(PWlowercase);
    charList = tempCharList;
  }
  // if uppercase add uppercase array
  if (PWcriteria.isPWuppercase) {
    var tempCharList = charList.concat(PWuppercase);
    charList = tempCharList;
  }
  // if numeric add numeric array
  if (PWcriteria.isPWnumeric) {
    var tempCharList = charList.concat(PWnumeric);
    charList = tempCharList;
  }
  // if special characters add special character array
  if (PWcriteria.isPWspecialChar) {
    var tempCharList = charList.concat(PWspecialChar);
    charList = tempCharList;
  }
  // confirm at least one characer set selected
  if (charList.length > 0) {
    // generate pw based on character set array
    // for each character up to the pw length selected,
    // get random character from charcater set selected
    for (i = 0; i < PWcriteria.PWlength; i++) {
      var randomChar = charList[Math.floor(Math.random() * charList.length)];
      PWgenerated = PWgenerated + randomChar;
    };
  } else {
    // control flow should not get here
    // catching errors if control flow here with no character set selected
    PWgenerated = "Error: No character set included.";
  }
  return PWgenerated;
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);