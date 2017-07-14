(function (window) {
  if (!window.jQuery) {
    return;
  }

  var $ = window.jQuery, ad_zones_error = $("#ad_zones_error"), errShowTime = 4000;

  $(window.document).ready(function () {
    loadAdZones();
    initSubmitter();
    onUserIdChange();
    getShortCode();
  });

  function initSubmitter() {
    $('#yepty_plugin_main_form').unbind('submit').submit(function () {
      var webmasterId = isValidWebmaster();
      if (webmasterId) {
        onWebmasterFormSubmit(webmasterId);
        onMainFormSubmit();
      }
      return false;
    });

    $('#yepty_plugin_adzones_form').unbind('submit').submit(function () {
      var webmasterId = isValidWebmaster();
      if (webmasterId) {
        onWebmasterFormSubmit(webmasterId);
        onMultiPlaceFormSubmit();
      }
      return false;
    });


  }

  function onWebmasterFormSubmit(webmasterId) {
    $.post('admin-ajax.php?action=yepty_on_form_request', {
      "sel": 'webmaster',
      "webmasterId": webmasterId
    }, function () {

    });
  }

  function onMainFormSubmit() {
    var styleData = {"sel" : "blocks_style"},
      submitBtn = $('.yepty_plugin_constructor_form_submit_button'),
      submitText = submitBtn.val();
    $("#yepty_plugin_main_form").find('input').each(function (n, element) {
      var name = $(element).attr('name'),
        val = $(element).attr("value");
      if (name && $(element).attr('type') === 'checkbox') {
        styleData[name] = $(element).attr('checked') ? true : false;
      } else if (name && $(element).attr('type') === 'radio') {
        if ($(element).parent().hasClass("radioChecked")) {
          styleData[name] = val;
        }
      } else if (name && typeof val !== 'undefined') {
        styleData[name] = val;
      }
    });

    submitBtn.attr('value', 'Please wait...');
    $.post('admin-ajax.php?action=yepty_on_form_request', styleData, function (data) {
      var res;
      try {
        res = JSON.parse(data);
      } catch (error) {}
      if (res && res.ok !== true) {
        if (res.err === 'limit') {
          ad_zones_error.text('Limit exceeded: ' + res.dsc);
          ad_zones_error.show();
          setTimeout(function(){ ad_zones_error.hide();},errShowTime);
        }
        return;
      }
      submitBtn.attr('value', 'Saved!');
      setTimeout(function () {
        submitBtn.attr('value', submitText);
      }, 1000);
    });
  }

  function getMultiBlockParams() {
    var styleData = {},
      dataObject;

    if ($('#textads_display').val() == 1) {
      styleData.blockName = 'textAds';
      dataObject = $('#textads_format');
    } else if ($('#tagcloud_display').val() == 1) {
      styleData.blockName = 'tagCloud';
      dataObject = $('#tagcloud_format');
    } else if ($('#relatedtags_display').val() == 1) {
      styleData.blockName = 'relatedTags';
      dataObject = $('#relatedtags_format');
    } else {
      ad_zones_error.text('Activate format please');
      ad_zones_error.show();
      setTimeout(function(){ ad_zones_error.hide();},errShowTime);
      return false;
    }

    dataObject.find('input').each(function (n, element) {
      var name = $(element).attr('name'),
        val = $(element).attr("value");
      if (name && $(element).attr('type') === 'checkbox') {
        styleData[name] = $(element).attr('checked') ? true : false;
      } else if (name && $(element).attr('type') === 'radio') {
        if ($(element).parent().hasClass("radioChecked")) {
          styleData[name] = val;
        }
      } else if (name && typeof val !== 'undefined') {
        styleData[name] = val;
      }
    });
    return styleData;
  }

  function onMultiPlaceFormSubmit() {
    var styleData = getMultiBlockParams(),
      submitBtn = $('#yepty_plugin_multi_form_submit_button'),
      submitText = submitBtn.val(),
      placementsValid = false;

    if (!styleData) {
      return;
    }
    styleData.sel = "multi_block_style";

    $('#ad_zones_placements_settings').find('input').each(function (n, element) {
      var name = $(element).attr('name'),
        val = $(element).attr("value");
      if (name && $(element).attr('type') === 'checkbox' && name !== '_self_placements') {
        styleData[name] = $(element).attr('checked') ? true : false;
        if(styleData[name]) {
          placementsValid = true;
        }
      }
    });

    if (!placementsValid) {
      ad_zones_error.text('Empty placement settings');
      ad_zones_error.show();
      setTimeout(function(){ ad_zones_error.hide();},errShowTime);
      return;
    }
    placementsValid = false;

    $('#ad_zones_positions_settings').find('input').each(function (n, element) {
      var name = $(element).attr('name'),
        val = $(element).attr("value");
      if (name && $(element).attr('type') === 'checkbox') {
        styleData[name] = $(element).attr('checked') ? true : false;
        if (styleData[name]) {
          placementsValid = true;
        }
      }
    });

    if (!placementsValid) {
      ad_zones_error.text('Empty position of posts');
      ad_zones_error.show();
      setTimeout(function(){ ad_zones_error.hide();},errShowTime);
      return;
    }

    submitBtn.attr('value', 'Please wait...');
    $.post('admin-ajax.php?action=yepty_on_form_request', styleData, function (data) {
      var res;
      try {
        res = JSON.parse(data);
      } catch (error) {}
      if (res && res.ok !== true) {
        if (res.err === 'limit') {
          ad_zones_error.text('Limit exceeded: ' + res.dsc);
          ad_zones_error.show();
          setTimeout(function(){ ad_zones_error.hide();},errShowTime);
        }
        return;
      }
      loadAdZones();
      submitBtn.attr('value', 'Saved!');
      setTimeout(function () {
        submitBtn.attr('value', submitText);
      }, 1000);
    });
  }

  function loadAdZones() {
    $('#adZonesList').html('<div align="center" id="ad_zones_loading" style="margin-top: -20px;"></div>');
    try {
            var cl = new CanvasLoader("ad_zones_loading", {});
            cl.setColor('#CFDEE6');
            cl.setShape('spiral');
            cl.setDensity(50);
            cl.setDiameter(40);
            cl.setRange(0.8);
            cl.show();
        }
        catch(e) {
    }
   $.post('admin-ajax.php?action=yepty_on_form_request', {
      "sel": 'load_adZones_list'
    }, function (html) {
      $('#adZonesList').html(html);
      if ($(".float_formats").hasClass("get_the_code_for_hover")) {
        $('.scrollable').css("height", 1020);
      } else {
            var h = $(".static_div:first").height();
            if (h > 1020) {
              $('.scrollable').css("height", h);
            } else {
              $('.scrollable').css("height", 1020);
            }
      }
      initAdZoneView();
      initAdZoneRemove();
    });
  }

  function initAdZoneRemove() {
    $('.ad_zone_remove').unbind('click').click(function () {
      var blockId = $(this).parent().parent().parent().attr('id');
      if (!blockId) {
        return false;
      }
      $.post('admin-ajax.php?action=yepty_on_form_request', {
        "sel": 'remove_ad_zone',
        "id": blockId
      }, function () {
        $('#' + blockId).remove();
        var h = $(".static_div:visible").height();
        if (h > 1020) {
          $('.scrollable').css("height", h);
        } else {
          $('.scrollable').css("height", 1020);
        }
      });
      return false;
    });
  }

  function initAdZoneView() {
    $('.ad_zone_edit').unbind('click').click(function () {
      $("#yepty_plugin_multi_form_submit_button").attr("value","Save settings");
      var blockId = $(this).closest("tr").attr('id'), item;
      $.post('admin-ajax.php?action=yepty_on_form_request', {
        "sel": 'get_block_params',
        "id": blockId
      }, function (data) {
        var params, blockName, element, selectElement, selectValue;
        try {
          params = JSON.parse(data);
        } catch (error) {
          return;
        }
        blockName = params.name.toLowerCase();
        for (item in params.style) {
          if (!params.style.hasOwnProperty(item)) {
            continue;
          }
          element = $('#' + blockName + '_' + item);
          if (element.attr('type') === 'checkbox') {
            setChecked(element, params.style[item]);
          } else {
            $('#' + blockName + '_' + item).attr('value', params.style[item]);
          }
          selectElement = element.parent().parent().find('.cuselText');
          if (selectElement.attr('class')) {
            selectValue = $('#cusel-scroll-' + blockName + '_' + item).find('span[value="' + params.style[item] + '"]').html();
            selectElement.html(selectValue);
          }
        }
        if (window.yeptyPluginAdminScript.viewStyle[params.name]) {
          window.yeptyPluginAdminScript.viewStyle[params.name](params.style);
        }
        for (item in params.placement) {
          if (!params.placement.hasOwnProperty(item)) {
            continue;
          }
          element = $('#_' + item + '_placements');
          setChecked(element, params.placement[item]);
        }
        for (item in params.position) {
          if (!params.position.hasOwnProperty(item)) {
            continue;
          }
          element = $('#_position_' + item);
          setChecked(element, params.position[item]);
        }
      });
    });
    var OneCheckSelected = function(div, check){
      var c = 0, el;
      div.find("input").each(function(){
        if ($(this).attr("checked")) { c++; }
      });
      if (c == 0) {
        div.find("input").each(function(){
          if ($(this).attr("name") !== check.attr("name") && c == 0) {
            el = $(this);
            el.attr("checked", true);
            el.attr("value", 1);
            el.parent().css("background-position","0px -16px");
            c++;
          }

        });
      }
    }
    $("#ad_zones_placements_settings .placements .niceCheck").click(function(){
      OneCheckSelected($("#ad_zones_placements_settings"), $(this).find("input"));
    });
    $("#ad_zones_positions_settings .placements .niceCheck").click(function(){
      OneCheckSelected($("#ad_zones_positions_settings"), $(this).find("input"));
    });

  }

  function isValidWebmaster() {
    var exp = new RegExp('^\\w{3}-\\d{5}$'),
      webmasterId = $('#yepty_plugin_webmaster_form [name="webmasterId"]').val();
    $('#fail_user_id').hide();
    if (exp.test(webmasterId)) {
      return webmasterId;
    } else if (webmasterId.length === 0) {
      $('#fail_user_id').text("Please enter your Yepty publisher key");
    } else {
      $('#fail_user_id').text("Incorrect publisher key");
    }
    $('#fail_user_id').show();
    return false;
  }

  function onUserIdChange() {
    $('#yepty_plugin_webmaster_form [name="webmasterId"]').unbind('change').change(function () {
      isValidWebmaster();
    });
  }

  window.getShortCode = function() {
    //$("#_self_placements").parent().click(function () {
      var params;
      //if ($("#_self_placements").attr("checked")) {
        $(".ad_zones input[type='checkbox']").each(function () {
          if ($(this).attr("id") == "_self_placements") { return; }
          setChecked($(this), false);
        });
        params = getMultiBlockParams();
        if (!params) {
          return setChecked($("#_self_placements"), false);
        }
        params.sel = "get_code";
        $.post('admin-ajax.php?action=yepty_on_form_request', params, function (data) {
          $("#shortCode").attr('value', data);
          $("#shortCode").fadeIn("fast");
        });
     /* } else {
        $("#shortCode").fadeOut("fast");
      }*/
    //});
  }

})(window);
