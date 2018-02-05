var fullName;
var id;
var latLong;
var name;
var parkCode;
var url;
var weatherInfo;

$(document).ready(function(){
  onPageLoad();
});

function onPageLoad(){

// https://developer.nps.gov/api/v1/parks?parkCode=wrst&fields=images&api_key=dR9liF6s3ztufwHduTKv4mfNqrtq3iGWp8dxjzcr


// https://developer.nps.gov/api/v1/alerts?parkCode=wrst&api_key=dR9liF6s3ztufwHduTKv4mfNqrtq3iGWp8dxjzcr

  $.ajax({
    url: 'https://developer.nps.gov/api/v1/alerts',
    dataType: 'json',
    data: { 
      parkCode : 'yose',  //enter variable from URL 
      fields: "images",
      api_key:'dR9liF6s3ztufwHduTKv4mfNqrtq3iGWp8dxjzcr'}
  }).done(function(alertResponse) {
    console.log("Finished alerts ajax call");

    var alertResults = alertResponse.data;
    console.log(alertResults);
    $("#alerts-div").empty();

    for (var i = 0; i < alertResults.length; i++) {

      if ((alertResults[i]["category"] === "Danger") || (alertResults[i]["category"] === "Caution") || (alertResults[i]["category"] === "Park Closure")) {
        var alertTitle = alertResults[i]["title"];
        var alertDescription = alertResults[i]["description"];
        console.log(alertTitle, alertDescription);

        var alertDiv = $('<li><strong style="color: red;">' + alertTitle + '</strong>: ' + alertDescription + '</li>');
        $("#alerts-div").append(alertDiv);
      }
      else {
        console.log("No important alerts atm.");
      }
    }                       
  });

  $.ajax({
    url: 'https://developer.nps.gov/api/v1/parks',
    dataType: 'json',
    data: { 
      parkCode : 'yose',  //enter variable from URL
      fields: "images",
      api_key:'dR9liF6s3ztufwHduTKv4mfNqrtq3iGWp8dxjzcr'}
  }).done(function(dataResponse) {
    console.log("Finished data ajax call");

    var dataResults = dataResponse.data;
    console.log(dataResults);
    
    var title = dataResults[0]["fullName"];
    var directions = dataResults[0]["directionsInfo"];
    $("#park-title").text(title);
    $("#directions-div").text(directions);
  });
}


function getLatLngFromString(ll) {
  var newstr = ll.replace(/lat/, '"lat"').replace(/long/i, '"lng"');
  return JSON.parse("{"+newstr+"}"); 
}