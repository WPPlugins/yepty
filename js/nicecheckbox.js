jQuery(document).ready(function () {
  jQuery("span.niceCheck").each(function () {
      defineCheck(jQuery(this));
  });
  jQuery("span.niceCheck").unbind('click').click(function () {
    changeCheck(jQuery(this));
  });
});

function changeCheck(el) {
  if (el.hasClass("disabledCheck") || el.hasClass("disabled")) { return false; }
  var input = el.find("input");
  if (!input.attr("checked")) {
    el.css("background-position", "0 -16px");
    input.attr("checked", true);
    input.attr("value","1");
    jQuery("#label_"+input.attr("id")).addClass("hover");
  } else {
    el.css("background-position", "0 0");
    input.attr("checked", false);
    input.attr("value","0");
    jQuery("#label_"+input.attr("id")).removeClass("hover");

  }
  return true;
}

function defineCheck(el) {
  var input = el.find("input");
  if (!input.attr("checked")) {
    el.css("background-position", "0 0");
    input.attr("checked", false);
    jQuery("#label_"+input.attr("id")).removeClass("hover");
    input.attr("value","0");
  } else {
    el.css("background-position", "0 -16px");
    input.attr("checked", true);
    jQuery("#label_"+input.attr("id")).addClass("hover");
    input.attr("value","1");
  }
  return true;
}

function setChecked(element, checked) {
  if (element.attr('checked') === checked) {
    return;
  }
  if (checked) {
    element.parent().css('background-position', '0 -16px');
    element.attr('checked', true);
    element.attr('value', 1);
    if (jQuery("#label_" + element.attr("id"))) {
      jQuery("#label_" + element.attr("id")).addClass("hover");
    }
  } else {
    element.parent().css('background-position', '0 0');
    element.attr('checked', false);
    element.attr('value', 0);
    if (jQuery("#label_" + element.attr("id"))) {
      jQuery("#label_" + element.attr("id")).removeClass("hover");
    }
  }
}