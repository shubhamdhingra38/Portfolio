function inputKeyUp(event) {
  if (event.keyCode == ENTER_KEY_VALUE) {
    console.log("Enter")
    terminal.createNextLine()
  }
}

/**
 * https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
 */
function getUserIp() {
  const xmlhttp = new XMLHttpRequest()

  xmlhttp.open("GET", "http://api.hostip.info/get_html.php", false)
  xmlhttp.send()

  hostipInfo = xmlhttp.responseText.split("\n")
  
  for (i = 0; hostipInfo.length >= i; i++) {
    ipAddress = hostipInfo[i].split(":")
    if (ipAddress[0] == "IP") return ipAddress[1].trim()
  }
  return null
}
