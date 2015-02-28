// This program is licensed under the CC-BY-NC license (with clarifications)
// For details, please refer to the file main_js.license.md

function navigate(visualstate) {
  if (visualstate === "#calendar") {
    var o = window.orientation;
    if (o) {
      if (o === 90 || o === -90) {
        $("#calendar_iframe").attr("width", "100%");
      } else {
        if (window.screen.width <= 320) {
          $("#calendar_iframe").attr("width", "275");
        }
      }
    } else {
      $("#calendar_iframe").attr("width", "100%");
    }
  }
  if (visualstate !== "#acasa" && $("#menu").css("display") === "none") {
    $("#tap_target_acasa").show();
  } else {
    $("#tap_target_acasa").hide();
  }
  $(".visualstate").hide();
  var css_selector_to_display = visualstate + "_content";
  $(css_selector_to_display).css({"display": "block", "opacity": 0}).animate({"opacity": 1}, 250);
  if ($("#menu").css("display") === "none") {
    $("#cdl_heading").hide();
    document.getElementById("top_of_content").scrollIntoView();
  } else {
    $("#cdl_heading").show();
    document.body.scrollIntoView();
  }
  var base_url = window.location.href.split("#")[0];
  history.pushState(css_selector_to_display, "/", base_url + visualstate);
}

$(".cdlmenuitem").on("click", function(e) {
  e.preventDefault();
  var target_visualstate = $(this).attr("id");
  navigate(target_visualstate);
});

$("#menu_header").on("click", function(e) {
  e.preventDefault();
  navigate("#acasa");
});

$(window).on("popstate", function(event) {
  if (typeof event.state === "string") {
    $(".visualstate").hide();
    $(event.state).css({"display": "block", "opacity": 0}).animate({"opacity": 1}, 250);
    if ($("#menu").css("display") === "none") {
      $("#cdl_heading").hide();
    } else {
      $("#cdl_heading").show();
    }
  }
});

$(window).on("orientationchange", function(event) {
  var o = window.orientation;
  if (o === 90 || o === -90) {
    $("#calendar_iframe").attr("width", "100%");
  } else {
    if (window.screen.width <= 320) {
      $("#calendar_iframe").attr("width", "275");
    }
  }
});

Zepto(function($) {
  var visualstate = "#" + window.location.href.split("#")[1];
  if ( $(visualstate + "_content")[0] ) {
    navigate(visualstate);
  } else {
    navigate("#acasa");
  }

  var all_images = {
    "#cdl_logo":       "images/cdl.png",
//  "#rosedu_logo":    "images/logos/rosedu.png",
    "#intel_logo":     "images/logos/intel_logo.png",
    "#ixia_logo":      "images/logos/ixia_logo.png",
    "#eaudeweb_logo":  "images/logos/eaudeweb_logo.png",
    "#github_logo":    "images/logos/github_logo.png",
    "#english_logo":   "images/english.png",
    "#arrow_hover":    "images/arrow-hover.png",
    "#green_gradient": "images/green-gradient.png",
    "#blue_gradient":  "images/blue-gradient.png"
  };
  for (var img_id in all_images) {
    $(img_id).attr("src", all_images[img_id]);
  }

  var iframe_url = "http://www.google.com/calendar/embed?src=apve67v2o1l4tp1655sl53nhs8%40group.calendar.google.com&ctz=Europe/Bucharest&bgcolor=%23F3F3F3";
  $("#calendar_iframe").attr("src", iframe_url);
});
