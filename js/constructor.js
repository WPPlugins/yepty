(function (window) {
  if (!window.jQuery) {
    return;
  }
  if (!window.yeptyPluginAdminScript) {
    window.yeptyPluginAdminScript = {};
  }

  var $ = window.jQuery,jQuery = window.jQuery, w = window, timer, delay = 250;
  $(window.document).ready(function () {
    initNiceRadio();
    PublisherKey();
    tipsy();
    GeneralSettings();
    IntextForm();
    InImageForm();
    SliderForm();
    AdlineForm();
    TextAdsForm();
    TagCloudForm();
    RelatedTagsForm();
  });
  $(window).resize(function() {
    if ($("#slider_preview .tips").css("display") !== "none") {
      SliderPreview();
    }
    if ($("#adline_preview .tips").css("display") !== "none") {
      var left = ($(window).width()-$("#adline_preview .tips").width())/2;
      left = (left<0)?0:left;
      $("#adline_preview .tips").css({left: left});
      AdlineCutAd();
    }
  });

  function initNiceRadio() {
    $("input.niceRadio").each(function() {
      changeRadioStart($(this));
    });
  }

  function PublisherKey() {
    $("#publisher_key").unbind("hover").hover(function() {
      $("#publisher_key_img").stop(true, true).fadeIn("normal");
    }, function() {
      $("#publisher_key_img").stop(true, true).fadeOut("normal");
    });
    $(".boxes").next().each(function() {
      $(this).css("position", "relative");
    });
  }

  function ExampleAds(i) {
      var ads = [
          {"keyword":"online advertising", "title":"Sony VAIO Series Notebook", "desc":"Supreme <b>3D notebook</b> with Quad Core processor.", "url":"store.sony.com", "clickUrl":"http://store.sony.com", "long_description":"The <b>Sony VAIO</b> comes loaded with a suite of amazing features that include the new Intel Core i5-520M Processor and Windows 7 Home Premium operating system. Rediscover your favorite music, photos and more with Media Gallery software. Developed with design in mind.", "price":"$1449.99", "button":"Buy now", "small_img":"small_notebook.gif", "img":"notebook.gif", "big_img":"big_notebook.gif"},
          {"keyword":"internet promotion", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"internet promotion", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"marketing", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"contextual ads", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"retargeting", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"remarketing", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"behavioral Targeting", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"affiliate program", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"pay per click", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"ppc", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"online promotion", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"internet promotion", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"behavioral Targeting", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"marketing", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"contextual ads", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"retargeting", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"remarketing", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"affiliate program", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"pay per click", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"ppc", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"online promotion", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"internet promotion", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"behavioral Targeting", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"affiliate program", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"pay per click", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"ppc", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
          {"keyword":"online promotion", "title":"Facebook Advertising", "desc":"Reach The Exact Audience You Want With Relevant Targeted Ads.", "url":"www.facebook.com", "clickUrl":"http://facebook.com"},
      ];
    if (typeof(i) != "undefined") {
      return ads[i];
    } else {
      return ads;
    }
  }
  initColorScheme = function(format, callback){
    var picker, color
    picker = $("#"+format+"_tcol_picker"), color = $("#"+format+"_tcol");
    InitFarbtastic(picker, color, callback);
    picker = $("#"+format+"_dcol_picker"), color = $("#"+format+"_dcol");
    InitFarbtastic(picker, color, callback);
    picker = $("#"+format+"_ucol_picker"), color = $("#"+format+"_ucol");
    InitFarbtastic(picker, color, callback);
    picker = $("#"+format+"_pcol_picker"), color = $("#"+format+"_pcol");
    InitFarbtastic(picker, color, callback);
    picker = $("#"+format+"_bgcol_picker"), color = $("#"+format+"_bgcol");
    InitFarbtastic(picker, color, callback);
    picker = $("#"+format+"_bcol_picker"), color = $("#"+format+"_bcol");
    InitFarbtastic(picker, color, callback);
    color = $("#"+format+"_color_scheme");
    picker = $("#"+format+"_color_scheme_popup");
    $("#"+format+"_transparent").click(function () {
      $("#"+format+"_bgcol").css({"background":"url(images/get_the_code/transparent.gif) repeat 0 0"}).attr("value", "");
    });
    color.click(function () {
      var pc = color.position();
      clearTimeout(timer);
      picker.css("left", pc.left);
      picker.show();
    });
    BackgroundClick(picker, color);
  }
  ColorSchemeChange = function(format, params){
    var scheme = $("#"+format+"_color_scheme");
    if (params[format+"_tcol"]) {
      scheme.find(".title").css("background", params[format+"_tcol"]);
      $("#"+format+"_preview .title").css("color", params[format+"_tcol"]);
    }
    if (params[format+"_dcol"]) {
      scheme.find(".desc").css("background", params[format+"_dcol"]);
      $("#"+format+"_preview .desc").css("color", params[format+"_dcol"]);
    }
    if (params[format+"_ucol"]) {
      scheme.find(".url").css("background", params[format+"_ucol"]);
      $("#"+format+"_preview .url").css("color", params[format+"_ucol"]);
    }
    if (params[format+"_pcol"]) {
      scheme.find(".price").css("background", params[format+"_pcol"]);
      $("#"+format+"_preview .price").css("color", params[format+"_pcol"]);
    }
    if (params[format+"_bgcol"] && params[format+"_bcol"]) {
      scheme.css({"background":params[format+"_bgcol"],border: "1px solid "+params[format+"_bcol"]});
      $("#"+format+"_preview .tips").css({"background":params[format+"_bgcol"],border: "1px solid "+params[format+"_bcol"]});
    }

  }
  function rangeSliderFill(id, min, max, value, orientation) {
    var wid, h,fill_h, fill = $("#" + id).find(".ui-slider-fill");
    if (orientation == 'horizontal') {
      wid = $("#" + id).css("width");
      wid = wid.replace("px", "");
      wid = parseFloat(wid);
      fill.css("width", wid * (value - min) / (max - min));
    } else {
      h = $("#" + id).css("height");
      h = h.replace("px", "");
      h = parseFloat(h);
      fill_h = h * (value - min) / (max - min);
      fill.css("height", fill_h);
      fill.css("top", h - fill_h);
      $("#" + id + " .ui-slider-handle").css("top", h - fill_h - 6);
    }
  }
  function initrangeSlider(id, min, max, step, value, max_label, orientation, callback) {
    $("#" + id).slider({
      min: min,
      max: max,
      step: step,
      value: [value],
      animate:1,
      orientation:orientation,
      create: function() {
        $("#" + id).append("<div class='ui-slider-fill'></div>");
        if (orientation == 'vertical') {
          $("#" + id + " .ui-slider-handle").append('<div class="ui-slider-img" > <div style="position: relative; top: -17px; left:6px; text-align: center; width: 138px; z-index: 1"><span class="range_slider_value" id="' + id + '_label">' + value + '</span><span class="range_slider_value" style="padding-left: 0;">%</span></div></div>');
          $("#" + id + "_label").text(value);
          $("#" + id + "_input").attr("value", value);
          rangeSliderFill(id, min, max, max - value, orientation);
        } else {
          rangeSliderFill(id, min, max, value, orientation);
        }
      },
      slide: function(event, ui) {
        var val = ui.value, label;
        if (parseFloat(ui.value) == max) {
          val = max_label;
        }
        if (orientation == 'vertical') {
          val = max - ui.value;
        }
        if (val == 0 && max_label == 0) {
          label = 'Unlimited';
        } else {
          label = val;
        }
        $("#" + id + "_label").text(label);
        $("#" + id + "_input").attr("value", val);
        rangeSliderFill(id, min, max, ui.value, orientation);
        if (callback) callback();
      }
    });
  }

  function GeneralSettings() {
    var preview_popup = $("#preview_popup"), preview_tips = $("#preview_tips"),  page, showcase = $("#showcase"), clickurl, ShowcaseTimer, adZoneButtonTexChange = 0;

    $('a.tips').tipsy({gravity: 's'});
    $("#items_wrap").scrollable({circular: true});
    page = $("#page").val();
    if (page == 'static') {
      $(".get_the_code_for").removeClass("get_the_code_for_hover");
      $(".static_formats").addClass("get_the_code_for_hover");
      $("#items_wrap").data("scrollable").seekTo('1', 1);
      $("#yepty_plugin_multi_form_submit_button").attr("value","Create new ad zone");
    }
    $(".get_the_code_for").unbind("click").click(function() {
      $(".choose_ad_formats .preview").css("display", "none");
      $(".get_the_code_for").removeClass("get_the_code_for_hover");
      $("#slider_preview .tips").hide();
      $("#adline_preview .tips").hide();
      $(".choose_ad_formats_ar").hide();
      var api = $("#items_wrap").data("scrollable");
      if ($(this).hasClass("static_formats")) {
        $('.scrollable').css("height", $(".static_div:visible").height());
        $(".static_formats").addClass("get_the_code_for_hover");
        api.seekTo('1', 400);
        $("#adline_preview .tips .cl").click();
        $("#slider_preview .tips .cl").click();

      } else {
        $(".float_formats").addClass("get_the_code_for_hover");
        api.seekTo('0', 400);
        $('.scrollable').css("height", 1020);

      }
    });
    preview_tips.find(".cl").unbind('click').click(function() {
      preview_tips.fadeOut("normal");
    });
    preview_popup.find(".cl").unbind('click').click(function() {
      preview_popup.fadeOut("normal");
      if (showcase.css("display") !== "none") {
        showcase.fadeOut("normal");
      }
    });
    showcase.find(".cl").click(function () {
      showcase.fadeOut("normal");
    });
    //ShowcaseInit(preview_popup.find(".clickurl"));
    showcase.unbind("mouseleave").mouseleave(function (e) {
      ShowcaseTimer = setTimeout(function(){
        CheckShowcaseVisible(showcase, showcase, e, "fadeOut");
      }, delay);
    });
    showcase.unbind("mouseenter").mouseenter(function (e) {
      clearTimeout(ShowcaseTimer);
    });
    BackgroundClick(preview_popup, preview_popup, "fadeOut");
    $(".ad_format:visible").unbind('click').click(function(e) {
      var el = $(this),checkbox = el.find(".cactive input"), target = e.target, id = el.attr("id");
      adZoneButtonTexChange = (checkbox.val() ==0)?1:0;
      if ($(target).hasClass("niceCheck")) {
        if (!checkbox.attr("checked")) {
          el.find(".cactive label.check").text("Activate!").removeClass("hover");
          checkbox.attr("value", "0");
          if ($(this).attr("id") == 'adline_format') {
            $(".slider_position td").removeClass("no_hov");
          }
          return false;
        } else {
          if ($(this).attr("id") == 'adline_format') {
            $(".inner_div").each(function() {
              if (!$(this).hasClass("cloned")) {
                if ($(this).find("#adline_position_bottom").size() == 0) {
                  return false;
                }
                if ($(this).find("#adline_position_top").parent().hasClass("radioChecked")) {
                  SliderBlockPosition('top');
                } else {
                  SliderBlockPosition('bottom');
                }
              }
            });

          }
        }
      }
      if (id === 'textads_format' || id === 'tagcloud_format' || id === 'relatedtags_format') {
        $(".static_div .cactive label.check").text("Activate!").removeClass("hover");
        $(".static_div .cactive input").attr("value", "0").attr("checked", false);
        $(".static_div .cactive .niceCheck").css("background-position", "0 0");

      }

      el.find(".cactive .niceCheck").css("background-position", "0px -16px");
      el.find(".cactive label.check").addClass("hover");
      el.find(".cactive label.check").text("Active!");
      checkbox.attr("value", "1");
      checkbox.attr("checked", true);
      var AdZonesCheckbox = function(){
        $("#ad_zones_placements_settings input[type=checkbox], #ad_zones_positions_settings input[type=checkbox]").parent().css("background-position", "0px -16px");
        $("#ad_zones_placements_settings input[type=checkbox], #ad_zones_positions_settings input[type=checkbox]").attr("checked",true);
        if (adZoneButtonTexChange == 1) {
          $("#yepty_plugin_multi_form_submit_button").attr("value","Create new ad zone");
        }
      }
      if (id == "intext_format") {
        IntextPreview();
      }
      if (id == "inimage_format") {
        InimagePreview();
      }
      if (id == "textads_format") {
        TextAdsPreview();
        AdZonesCheckbox();
      }
      if (id == "tagcloud_format") {
        TagCloudPreview();
        AdZonesCheckbox();
      }
      if (id == "relatedtags_format") {

        RelatedTagsPreview();
        AdZonesCheckbox();
      }
    });

  }
  function PreviewParams(format) {
    if ($("." + format + "_preview").css("display") == 'none') {
      $(".preview:visible").hide();
      $("." + format + "_preview").stop(false, false).show();
      var left = (format == 'intext' || format == 'textads') ? 140 : 445;
      left = (format == 'relatedtags') ? 870 : left;
      $(".choose_ad_formats_ar").show().animate({"left":left}, 200);
    }
    var params = {};

    $("#" + format + "_format").find("input").each(function() {
      var el = $(this);
      if (el.attr("type") && el.attr("type") == "radio") {
        if (el.parent().hasClass("radioChecked")) {
          params[el.attr("id")] = el.attr("value");
        }
      } else if (el.attr("type") && el.attr("type") == "checkbox") {
        params[el.attr("id")] = el.attr("checked") ? '1' : '0';
      } else {
        params[el.attr("id")] = el.attr("value");
      }
    });


    if (format == 'intext') {
      if ($("#inimage_footnote").css("display") !== "none") {
        $("#inimage_footnote").hide("normal");
      }
    }
    return params;
  }
    function getHexRGBColor(color) {
        color = color.replace(/\s/g,"");
        color = color.replace("#","");
        var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
        if(aRGB) {
            color = '';
            for (var i=1;  i<=3; i++) {color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,'0$1');}
        } else { color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');  }
        return color;
    }
    function InitFarbtastic(picker, color, callback) {
        var id = color.attr("id"), val = color.val();
        picker.farbtastic(function(c){ color.css({"background":c,"color":c}).attr("value",c); callback();});
        if (val.indexOf("rgb") !== -1) {  val= "#"+getHexRGBColor(val); color.attr("value",val).css({"background":val,"color":val}); }
        color.css({"background":val,"color":val});
        if (color.attr("value") == "" || color.attr("value") == "#") {
            color.css({"background": "url(" + $("#yeptyImgPath").val() + "transparent.gif) repeat 0 0"}).attr("value", "");
        }
        color.click(function() {
            var o = color.offset(), col = color.css("color");
            picker.css("top", o.top - 198).css("left", o.left + 2).slideToggle("fast");
            $(this).css("background", col).attr("value", col);
        });
        color.parent().find("#label_color").click(function() {
            color.click();
        });
        BackgroundClick(picker, color);
    }
  function BackgroundClick(picker, color, effect) {
    $("#wpwrap").click(function(e) {
      var el = e.target, id = color.attr("id");
      if ($(el).hasClass("cl") || $(el).closest("table").parent().attr("id") === id || $(el).parent().attr("id") === id || $(el).attr("id") == id || $(el).hasClass("label_color") || $(el).hasClass("tagcloud_link") || $(el).hasClass("relatedtags_link") || $(el).parent().hasClass("cusel-scroll-pane")) {
        return;
      }
      var po = picker.offset(), pw = picker.width(), ph = picker.height();
      if (po == null) {
        return
      }
      if ((e.pageX < po.left) || (e.pageX > po.left + pw) || (e.pageY < po.top) || (e.pageY > po.top + ph)) {
        if (picker.css("display") !== "none") {
          if (effect === "fadeOut") {
            picker.fadeOut("normal");
          } else {
            picker.hide("normal");
          }
        }
      }
    });
  }
  function CheckShowcaseVisible (color, picker, e, effect) {
    if (!effect) {
      effect = "hide";
    }
    var el = e.target, id = color.attr("id"), arShifting, ao = picker.find(".ar").position(), po = picker.offset(), pw = parseFloat(picker.width()), ph = parseFloat(picker.height()), co = color.offset(), cw = parseFloat(color.width()), ch = parseFloat(color.height());
    ph = ao.top > 0 ? ph + 20 : ph;
    arShifting = ao.top > 0 ? 0 : 20;
    if (picker.css("display") !== "none" && !((e.pageX >= po.left) && (e.pageX <= po.left + pw) && (e.pageY >= po.top - arShifting) && (e.pageY <= po.top + ph)) && !((e.pageX >= co.left) && (e.pageX <= co.left + cw) && (e.pageY >= co.top) && (e.pageY <= co.top + ch))) {
      timer = setTimeout(function(){
        if (effect == "fadeOut") {
          picker.fadeOut("fast");
        } else {
          picker.hide("fast");
        }
      },250);
    }
  };
  function IntextForm() {
    var val = $("#intext_range_input").val(), picker = $('#intext_color_picker'), color = $("#intext_color");
    val = (val == 0) ? 55 : val;
    initrangeSlider("intext_range", 5, 55, 5, val, 0, 'horizontal', IntextPreview);
    cuSel({changedEl: "select",visRows: "10",checkZIndex: true,scrollArrows: true});
    $("#cuselFrame-inText_style span").each(function() {
      var html = $(this).html(), val = $(this).attr("value"), line_len = (val == 'double') ? 3 : 1;
      $(this).html('Highlighting style - <span style="border-bottom: ' + line_len + 'px ' + val + ' #859fae" >' + html + '</sapn>');

    });
    $("#cuselFrame-inText_style .cuselText").html($("#cuselFrame-inText_style span.cuselActive").html());
    $("#cuselFrame-inText_style font").live("click", function() {
      $(this).parent().click();
    });
    $("#cuselFrame-inText_style span").live("click", function() {
      setTimeout(function() {
        $("#cuselFrame-inText_style .cuselText").html($("#cuselFrame-inText_style span.cuselActive").html());
        IntextPreview();
      }, 30);
    });
    InitFarbtastic(picker, color, IntextPreview);
    initColorScheme("intext",IntextPreview);
  }

  function IntextPreview() {
    var params = PreviewParams('intext'), l;
    l = (params.inText_style == 'double') ? 3 : 1;
    $('.intext_preview .keyword').css({"border-bottom": l + 'px ' + params.inText_style + ' ' + params.intext_color,"color": params.intext_color});
    ColorSchemeChange("intext", params);
    $(".intext_tips_after, .intext_preview .tips").css({"background":params.intext_bgcol, border: "1px solid "+params.intext_bcol});
    $(".intext_tips_ar").css({"background":params.intext_bgcol});

  }
  function InImageForm() {
    initrangeSlider("inimage_range", 0, 100, 1, $("#inimage_range_input").val(), 100, 'horizontal', InimagePreview);
    $("input[name='inImage_showAds']").parent().click(function() {
      var input = $(this).find("input"), inimage_opacity = $(".inimage_opacity");
      if (input.attr("id") == "show_ads_yes") {
        if (inimage_opacity.css("display") == "none") {
          inimage_opacity.slideToggle("normal");
          $("#inimage_footnote").slideUp("normal");
        }
      } else {
        if (inimage_opacity.css("display") !== "none") {
          inimage_opacity.slideUp("normal");
          $("#inimage_footnote").slideDown("normal");
        }
      }

    });
    $(".inimage_position td").click(function() {
      var el = $(this);
      $(".inimage_position td").removeClass("hover");
      el.addClass("hover");
      $("#inimage_position").attr("value", el.attr("name"));
      InimagePreview();
    });
    $(".inimage_preview .tips .cl").click(function() {
      $(this).parent().parent().fadeOut("normal");
    });
    //ShowcaseInit($(".inimage_preview .clickurl"));
    $("#inimage_format .format_input").blur(function() {
      var err = $("#inimage_format .err"), limit = ($(this).attr("name") == "inimage_minx") ? 300 : 200;
      if (parseFloat($(this).val()) < limit) {
        $(this).attr("value", limit);
        err.show();
        setTimeout(function() {
          if (err.css("display") !== 'none') {
            err.fadeOut("fast")
          }
        }, 1000);
      }
    });

    $("#exampleImg,.inimage_preview .tips").unbind("hover").hover(function() {
      var tips = $(".inimage_preview .tips");
      if (tips.css("opacity") !== "1") {
        tips.stop(true, true).animate({"opacity":1}, 200);
      }
    }, function(e) {
      var opacity = 100 - parseFloat($("#inimage_range_input").val()), img = $("#exampleImg"), ip = img.offset(),iw = parseFloat(img.width()), ih = parseFloat(img.height());
      if (e.pageX <= parseFloat(ip.left) || (e.pageX >= parseFloat(ip.left) + iw) || e.pageY <= parseFloat(ip.top) || (e.pageY >= parseFloat(ip.top) + ih)) {
        if ($('input#show_ads_yes').parent().hasClass("radioChecked")) {
          $(".inimage_preview .tips").stop(true, true).animate({"opacity":opacity / 100}, 200);
        } else {
          $(".inimage_preview .tips").stop(true, true).animate({"opacity":0}, 200);
        }
      }
    });
    initColorScheme("inimage", InimagePreview);
  }
  function InimagePreview() {
    var params = PreviewParams('inimage'), img = $("#exampleImg"), tips = $(".inimage_preview .tips"),iw = parseFloat(img.width()) - 1, ih = parseFloat(img.height()) - 2,ip = img.position(),tw = parseFloat(tips.width()) + 17, th = parseFloat(tips.height()) + 7, l = 0, t = 0, p = params.inimage_position;
    ColorSchemeChange("inimage",params);
    switch (p) {
      case 'bl':l = ip.left;t = parseFloat(ip.top) + ih - th; break;
      case 'cl': l = ip.left;t = parseFloat(ip.top) + (ih - th) / 2; break;
      case 'tl': l = ip.left; t = ip.top; break;
      case 'bc':l = ip.left + (iw - tw) / 2;t = parseFloat(ip.top) + ih - th; break;
      case 'cc': l = ip.left + (iw - tw) / 2;t = parseFloat(ip.top) + (ih - th) / 2; break;
      case 'tc': l = ip.left + (iw - tw) / 2; t = ip.top; break;
      case 'br':l = ip.left + iw - tw; t = parseFloat(ip.top) + ih - th; break;
      case 'cr': l = ip.left + iw - tw;t = parseFloat(ip.top) + (ih - th) / 2; break;
      case 'tr': l = ip.left + iw - tw; t = ip.top; break;
      default: l = 0; t = 0; break;
    }
    tips.css({"left":l + "px","top":t + "px", 'display':'block'});
    var opacity = 100 - parseFloat(params.inimage_range_input);
    if (params.show_ads_yes == '1') {
      tips.css({"opacity": opacity / 100});
    } else {
      tips.css({"opacity":"0"});
    }
    if ($("#show_ads_no").attr("checked") && $("#inimage_footnote").css("display") == "none") {
      $("#inimage_footnote").show("normal");
    }
  }

  function SliderForm() {
    initrangeSlider("slider_range", 0, 100, 25, $("#slider_range_input").val(), 100, 'vertical');
    $(".slider_position td").click(function() {
      if ($(this).hasClass("no_hov")) {
        return false;
      }
      var el = $(this);
      $(".slider_position td").removeClass("hover");
      el.addClass("hover");
      $("#slider_position").attr("value", el.attr("name"));
    });
    //ShowcaseInit($("#slider_preview .clickurl"));
    $("#slider_demo").click(function() {
      SliderPreview();
    });
    $("#slider_preview .tips .cl").click(function() {
      var slider_preview = $("#slider_preview .tips"), o = slider_preview.offset(), p = $(".slider_position .hover").attr("name"), l, t, shifting = 0, pt = shifting, pl = shifting, w = slider_preview.width() + 22,h = slider_preview.height() + 7, wh = parseFloat($(window).height()),ww = parseFloat($(window).width()), koef = 2, sl = $(window).scrollLeft(), st = $(window).scrollTop();
      switch (p) {
        case 'tl': l = -w * koef; t = shifting; break;
        case 'cl': l = -w * koef; t = +wh / 2 - h / 2; break;
        case 'bl': l = -w * koef; t = +wh - h - shifting; break;
        case 'tr': l = ww + w * koef; t = shifting; break;
        case 'cr': l = ww + w * koef; t = wh / 2 - h / 2; break;
        case 'br': l = ww + w * koef; t = wh - h - shifting; break;
        default: l = shifting; t = 0; break;
      }
      slider_preview.stop(true, true).animate({"top":t, "left": l}, 350);
    });
    initColorScheme("slider", function(){ ColorSchemeChange("slider", PreviewParams('slider')); });
  }
  function SliderPreview() {
    var slider_preview = $("#slider_preview .tips"),
      p = $(".slider_position .hover").attr("name"),
      l, t, shifting = 0, pt = shifting, pl = shifting, w = slider_preview.width() + 17,
      h = slider_preview.height() + 7,
      wh = parseFloat($(window).height()),
      ww = parseFloat($(window).width()), koef = 2,params = PreviewParams('slider');
    ColorSchemeChange("slider", params);
    switch (p) {
      case 'tl': l = -w * koef; pl = pt; t = shifting; pt = t;break;
      case 'cl': l = -w * koef; pl = pt; t = +wh / 2 - h / 2; pt = t; break;
      case 'bl': l = -w * koef; pl = pt; t = +wh - h - shifting; pt = t; break;
      case 'tr': l = ww + w * koef; pl = ww - w - shifting; t = shifting; pt = t;break;
      case 'cr': l = ww + w * koef; pl = ww - w - shifting; t = wh / 2 - h / 2; pt = t; break;
      case 'br': l = ww + w * koef; pl = ww - w - shifting; t = wh - h - shifting; pt = t; break;
      default: l = shifting; t = 0; break;
    }
    slider_preview.stop(true, true).css({"display":"block","left":l,"top":t}).animate({"top":pt, "left": pl}, 350);
  }
  function SliderBlockPosition(type) {
    var cl = (type == 'top') ? 't' : 'b';
    $(".slider_position td").removeClass("no_hov");
    $(".slider_position ." + cl).addClass("no_hov");
    $(".slider_position ." + cl).each(function() {
      if ($(this).hasClass("hover") && $(this).hasClass(cl)) {
        var el = $(".slider_position td[name='cl']:visible");
        $(".slider_position td").removeClass("hover");
        el.addClass("hover");
        $("#slider_position").attr("value", el.attr("name"));
        $("#slider_preview .tips").css("display", "none");
      }
    });
  }
  function AdlineForm() {
    var adline_preview = $("#adline_preview .tips");
    $("#adline_demo").click(function() {
      AdlinePreview();
    });
    $("#adline_preview .tips .cl").click(function() {
      if ($('#adline_position_top').parent().hasClass("radioChecked")) {
        adline_preview.stop(true, true).animate({"top":-40}, 350);
      } else {
        adline_preview.stop(true, true).animate({"bottom":-40}, 350);
      }
    });
    $("#adline_position_top").parent().click(function() {
      SliderBlockPosition('top');
    });
    $("#adline_position_bottom").parent().click(function() {
      SliderBlockPosition('bottom');
    });
    //ShowcaseInit($("#adline_preview table"));
    initColorScheme("adline", function(){ ColorSchemeChange("adline", PreviewParams('adline')); });
  }
  function ShowcaseInit(link){
    var timer;
    if (link.find(".small_price").size() == 0) { return false; }
    link.unbind("mouseenter").mouseenter(function(){
      var el = $(this);
      clearTimeout(timer);
      timer = setTimeout(function(){
       LinkMouseOver(0, $("#showcase"), el);
      }, delay);

    });
    link.unbind("mouseleave").mouseleave(function(e){
      var el = $(this);
      clearTimeout(timer);
      timer = setTimeout(function(){
        CheckShowcaseVisible(el,$("#showcase"), e, "fadeOut");
      }, delay);
    });
  }
  function AdlineCutAd() {
    var popup, CutWords, title, desc, url, title_text, description_text, url_text, out, ad_width, t_w, t_words, d_w, d_words, u_w, u_words;
    popup = $("#adline_preview .tips");

    if (popup && popup.css("display") == 'none') {
      return false;
    }
    CutWords = function (text, len, sep) {
      var res, t, i;
      res = '';
      sep = ' ';
      t = text.split(sep);
      for (i = 0; i < len; i = i + 1) {
        res += t[i];
        if (i === len - 1) {
          res += "...";
        } else {
          res += sep;
        }
      }
      return res;
    };
    if (popup.height() == 0) {
      return false;
    }
    title = $("#adline_preview .tips .title");
    desc = $("#adline_preview .tips .desc");
    url = $("#adline_preview .tips .url");
    out = 1;
    ad_width = parseFloat(popup.find("table").width());
    if (parseFloat(ad_width) < $(window).width()) { return; }
    do {
      title_text = (title !== null) ? title.text() : ' ';
      description_text = (desc !== null) ? desc.text() : ' ';
      url_text = url.text();
      url_text = (url !== null) ? url_text : ' ';
      t_w = title_text.split(' ');
      t_words = t_w.length;
      d_w = description_text.split(' ');
      d_words = d_w.length;
      u_w = url_text.split(' ');
      u_words = u_w.length;
      ad_width = parseFloat(popup.find("table").width());
      if (parseFloat(ad_width) > $(window).width()) {
        if (d_words > 1) {
          description_text = CutWords(description_text, d_words - 1);
          desc.text(description_text);
        } else if (t_words > 1) {
          title_text = CutWords(title_text, t_words - 1);
          title.text(title_text);
        } else {
          if (u_words > 1 && url_text !== ' ' && url_text !== '...') {
            url_text = CutWords(url_text, u_words - 1);
            url.text(url_text.toString());
            if (url.text() === '...') {
              url.text('');
            }
          } else {
            out = 0;
          }
        }
      } else {
        out = 0;
      }
    } while (out);
    return false;
  }
  function AdlinePreview() {
    var params = PreviewParams('adline'), adline_preview = $("#adline_preview .tips");
    adline_preview.css({width: "auto"});
    var left = ($(window).width()-$("#adline_preview .tips").width())/2;
    left = (left<0)?0:left;
    adline_preview.css({left: left});
    if (params.adline_position_top == 'top') {
      adline_preview.css({"top":-40,"bottom":"auto","display":"block"});
      adline_preview.stop(true, true).animate({"top":0}, 350);
      SliderBlockPosition('top');
    } else {
      adline_preview.css({"display":"block",'bottom':'-40px','top':''});
      adline_preview.stop(true, true).animate({"bottom":0}, 350);
      SliderBlockPosition('bottom');
    }
    $("#slider_preview .tips").hide();
    AdlineCutAd();
    ColorSchemeChange("adline", params);
  }
  function clearTextAdsPreview () {
    changeAdNum();
    $(".textads_preview .ads").html("");
    TextAdsPreview();
  }
  function changeAdNum(adsCount) {
    var i, wid, h, maxnum, select, option, select_cont = $("#textads_num_count"), static_div = StaticDiv(), normalsquare,squares = {'small':22500, 'middle':24000},
      aCnt;
    wid = static_div.find("#textads_format input[name='textAds_width']").val();
    wid = parseFloat(wid);
    h = static_div.find("#textads_format input[name='textAds_height']").val();
    h = parseFloat(h);
    normalsquare = (h < 100) ? squares.small : squares.middle;
    normalsquare = (wid > 150 && h >= wid) ? wid * 90 : normalsquare;
    maxnum = Math.floor(parseFloat(wid) * parseFloat(h) / normalsquare);
    maxnum = (maxnum < 1) ? 1 : maxnum;
    select_cont.html("");
    select = w.document.createElement("select");
    $(select).attr("id", "textads_num");
    $(select).attr("name", "textAds_num");
    select_cont.append(select);
    aCnt = adsCount ? adsCount : maxnum;
    for (i = 0; i < maxnum; i++) {
      option = w.document.createElement("option");
      $(option).attr("value", i + 1);
      $(option).html(i + 1);
      $(select).append(option);
    }
    $(select).attr("value", aCnt);
    cuSel({changedEl: "select",visRows: "20",checkZIndex: true,scrollArrows: true});
  }
  function TextAdsForm() {
    var picker = $('#textads_tcol_picker'),
      color = $("#textads_tcol"), minsquare = 120 * 120, minw = 120, minh = 60, i,err = $("#textads_format .err"), textads_size_val;
    picker = $('#textads_tcol_picker');
    color = $("#textads_tcol");
    InitFarbtastic(picker, color, TextAdsPreview);
    picker = $('#textads_dcol_picker');
    color = $("#textads_dcol");
    InitFarbtastic(picker, color, TextAdsPreview);
    picker = $('#textads_ucol_picker');
    color = $("#textads_ucol");
    InitFarbtastic(picker, color, TextAdsPreview);
    picker = $('#textads_pcol_picker');
    color = $("#textads_pcol");
    InitFarbtastic(picker, color, TextAdsPreview);
    picker = $('#textads_bgcol_picker');
    color = $("#textads_bgcol");
    InitFarbtastic(picker, color, TextAdsPreview);
    picker = $('#textads_bcol_picker');
    color = $("#textads_bcol");
    InitFarbtastic(picker, color, TextAdsPreview);
    $("#textads_format .format_input").focus(function() {
      textads_size_val = $(this).val();
    });
    $("#textads_transparent").click(function() {
      $("#textads_bgcol").css({"background": "url(" + $("#yeptyImgPath").val() + "transparent.gif) repeat 0 0"}).attr("value", "");
    });
    $("#textads_frame").parent().click(function() {
      var textads_separate = $(".textads_separate");
      if ($("#textads_frame").attr("checked") == false) {
        textads_separate.hide();
        $(".textads_bcol").hide();
      } else {
        textads_separate.show();
        $(".textads_bcol").show();
      }
    });

    $("#textads_separate").parent().click(function() {
      $(".textads_preview .ads").html("");
      TextAdsPreview();
    });
    $("#textads_format .format_input").blur(function() {
      var wid, h, static_div = StaticDiv();
      wid = static_div.find("#textads_format input[name='textAds_width']").val();
      wid = parseFloat(wid);
      h = static_div.find("#textads_format input[name='textAds_height']").val();
      h = parseFloat(h);
      err.hide();
      if (wid * h < minsquare || wid < minw || h < minh) {
        err.show();
        $(this).attr("value", textads_size_val);
        setTimeout(function() {
          if (err.css("display") !== 'none') {
            err.fadeOut("fast")
          }
        }, 1000);
        return;
      }
      clearTextAdsPreview();
    });
    changeAdNum();
    $("#cuselFrame-textads_num span").live("click", function() {
      setTimeout(function() {
        $(".textads_preview .ads").html("");
        TextAdsPreview();
      }, 30);
    });
    $("#cuselFrame-textads_tsize span, #cuselFrame-textads_dsize span, #cuselFrame-textads_usize span, #cuselFrame-textads_psize span").click(function() {
      setTimeout(function() {
         clearTextAdsPreview();
      }, 30);
    });
    $("#textads_text_size_popup input[type='checkbox']").parent().click(function() {

    });

    color = $("#textads_color_scheme");
    picker = $("#textads_color_scheme_popup");
    color.click(function() {
      picker.fadeIn("normal");
    });
    BackgroundClick(picker, color);
    $("#textads_text_size").click(function() {
      $("#textads_text_size_popup").fadeIn("normal");
    });
    BackgroundClick($("#textads_text_size_popup"), $("#textads_text_size"));
  }

  function StaticDiv() {
    var static_div;
    $(".static_div").each(function() {
      if (!$(this).hasClass(".cloned")) {
        static_div = $(this);
      }
    });
    return static_div;
  }
  function OnlyOneFormatSelected(sel_checkbox){
    var c =$(".static_div .cactive");
    c.find("label").text("Activate!").removeClass("hover");
    c.find(".niceCheck").css("background-position", "0 0");
    c.find("input").attr("checked",false).attr("value",0);
    sel_checkbox.parent().parent().find("label").text("Active!").addClass("hover");
    sel_checkbox.parent().css("background-position", "0px -16px");
    sel_checkbox.attr("checked",true).attr("value",1);
  }

  function TextAdsPreview() {
    var static_div = StaticDiv(), params = PreviewParams('textads'),i,frame_color, preview = static_div.find(".textads_preview .tips"), title,desc, url, wid,scheme = static_div.find("#textads_format .color_scheme"), table = preview.find("table.ads"),pad, pos, i, len, orient, tbody, tr, td,span, ads, clickurl;
    OnlyOneFormatSelected($("#textads_display"));
    w.getShortCode();
    frame_color = (params.textads_frame == '1') ? params.textads_bcol : 'transparent';
    preview.css({"background": "none","width":params.textads_width + "px","height":params.textads_height + "px"});
    pad = (parseFloat(preview.parent().height()) - parseFloat(params.textads_height) - 10) / 2;
    pad = (pad > 0) ? pad : 0;
    preview.css("top", pad);
    table.css({"width":params.textads_width + "px"});
    scheme.css({"background": params.textads_bgcol,"border":"1px solid " + frame_color});
    scheme.find(".title").css("background", params.textads_tcol);
    scheme.find(".desc").css("background", params.textads_dcol);
    scheme.find(".url").css("background", params.textads_ucol);
    scheme.find(".price").css("background", params.textads_pcol);
    static_div.find("#color_scheme_tsize").text(params.textads_tsize);
    static_div.find("#color_scheme_dsize").text(params.textads_dsize);
    static_div.find("#color_scheme_usize").text(params.textads_usize);
    static_div.find("#color_scheme_psize").text(params.textads_psize);
    params.textads_separate = (params.textads_frame == '1') ? params.textads_separate : '0';

    static_div.find("#textads_logo").css({"left":preview.width() - 105});
    if (params.textads_separate == '0') {
      table.css({"border":"1px solid " + frame_color,"background": params.textads_bgcol});
      table.find(".clickurl").css({"border":"none","background": "none"});
    } else {
      table.css({"border":"none","background": "none", "height":"auto"});
      preview.find(".clickurl").css({"border":"1px solid " + frame_color,"background": params.textads_bgcol});
    }

    if (preview.find(".title").size() > 0) {
      if (!preview.hasClass("small_size")) {
        preview.find(".title").css({"color": params.textads_tcol,"font-size":params.textads_tsize + "px","line-height":params.textads_tsize + "px","font-style":(params.textads_tstyle == 1) ? "italic" : "normal"});
        preview.find(".desc").css({"color": params.textads_dcol,"font-size":params.textads_dsize + "px","line-height":params.textads_dsize + "px","font-style":(params.textads_dstyle == 1) ? "italic" : "normal"});
        preview.find(".url").css({"color": params.textads_ucol,"font-size":params.textads_usize + "px","line-height":params.textads_usize + "px","font-style":(params.textads_ustyle == 1) ? "italic" : "normal"});
        preview.find(".price").css({"color": params.textads_pcol,"font-size":params.textads_psize + "px","line-height":params.textads_psize + "px","font-style":(params.textads_pstyle == 1) ? "italic" : "normal"});

      }
      scrollableHeight();
      return false;
    }

    preview.removeClass("small_size");
    ads = ExampleAds();
    orient = (parseFloat(params.textads_width) > parseFloat(params.textads_height)) ? 'h' : 'v';
    tbody = w.document.createElement("tbody");

    table.append(tbody);
    len = (ads.length < parseFloat(params.textads_num)) ? ads.length : parseFloat(params.textads_num);
    var colCount = 0, rowCount = 0, div, tdheight, maxRowCount= 0, minWidth, img, size, src;
    tdheight = [];
    for (i = 0; i < len; i++) {
      minWidth = (ads[i].img)?350:200;
      if (orient == 'v' || i == 0 || (orient == 'h' && rowCount == 1 && typeof(td) !== "undefined" && parseFloat(params.textads_width) / colCount < minWidth ) || (orient == 'h' && rowCount > 1 && (i % colCount) == 0)) {
        tr = w.document.createElement("tr");
        $(tbody).append(tr);
        rowCount++;
      }
      td = w.document.createElement("td");
      td.setAttribute("align", "center");
      $(tr).append(td);
      $(tr).attr("name", rowCount);
      if (rowCount < 2) {
        colCount++;
        if (colCount>0) { maxRowCount =len/colCount; maxRowCount=Math.floor(maxRowCount); }
        maxRowCount=(maxRowCount==0)?1:maxRowCount;
        tdheight[colCount] = 0;
      }
      if (rowCount>maxRowCount && i>0) {
        break;
      }
      div = w.document.createElement("div");
      div.style.cssText = ";width: auto;text-align: left;";
      div.setAttribute("align", "left");
      $(div).attr("class", "clickurl");
      $(div).addClass("textadsClickUrl");
      $(div).attr("href", ads[i].clickUrl);
      $(div).attr("target", "_blank");
      td.appendChild(div);
      clickurl = $(div);

      if (params.textads_separate == '0') {
        $(div).css({"border":"none","background": "none"});
      } else {
        $(div).css({"border":"1px solid " + frame_color,"background": params.textads_bgcol});
      }

      if (orient == 'v') {
        wid = parseFloat(params.textads_width) / colCount;
        $(div).css({"width":wid - 12,"margin-right":"0"});
      }
      if (rowCount == 1) {
        $(div).css({"margin-top":"0"});
      }

      if (ads[i].img && ads[i].img !== '' && ads[i].small_img) {
        span = w.document.createElement("span");
        size = (parseFloat(params.textads_height) >= 90)?70:48;
        if (orient == 'h' || (orient == 'v' && parseFloat(params.textads_width)>=200)) { $(span).css({"float": "left","width":(size+5)+"px","height": size+"px","display": "block"}); } else { $(span).css({"display": "block","height":(size + 2)+"px","text-align": "center"}); }
        $(div).append($(span));
        img = w.document.createElement("img");
        img.setAttribute("alt","image");
        img.className = "img";
        src = (parseFloat(params.textads_height) >= 90)?ads[i].img:ads[i].small_img;
        img.src= $("#yeptyImgPath").val() + src;
        span.appendChild(img);
      }
      span = w.document.createElement("span");
      if ((orient == 'h' || (orient == 'v' && parseFloat(params.textads_width)>=200)) && ads[i].img && ads[i].img !== '' && ads[i].small_img) { $(span).css({"margin-left":(size+5)+"px","min-height":(size-2), "display": "block"});  } else { $(span).css({"display": "block"}); }
      $(div).append($(span));
      td.appendChild(div);
      div = w.document.createElement("div");
      title = div;
      $(div).attr("class", "title");
      $(div).css({"color":params.textads_tcol, "font-size":params.textads_tsize + "px", "line-height":params.textads_tsize + "px", "font-style":(params.textads_tstyle == 1) ? "italic" : "normal"});
      $(span).append($(div));
      $(div).html(ads[i].title);
      div = w.document.createElement("div");
      desc = div;
      $(div).attr("class", "desc");
      $(div).css({"color":params.textads_dcol, "font-size":params.textads_dsize + "px", "line-height":params.textads_dsize + "px", "font-style":(params.textads_dstyle == 1) ? "italic" : "normal"});
      $(span).append($(div));
      $(div).html(ads[i].desc);
      div = w.document.createElement("div");
      url = div;
      if (ads[i].long_description) {
        $(div).attr("class", "price small_price");
        $(div).css({"color":params.textads_pcol, "font-size":params.textads_psize + "px", "line-height":params.textads_psize + "px", "font-style":(params.textads_pstyle == 1) ? "italic" : "normal"});
        $(span).append($(div));
        $(div).html(ads[i].price);
      } else {
        $(div).attr("class", "url");
        $(div).css({"color":params.textads_ucol, "font-size":params.textads_usize + "px", "line-height":params.textads_usize + "px", "font-style":(params.textads_ustyle == 1) ? "italic" : "normal"});
        $(span).append($(div));
        $(div).html(ads[i].url);
      }
      div.onclick = function() {
        w.open($(this).attr("name"));
      };
      if (orient == 'v' && params.textads_separate == '0' && i !== len - 1) {
        td.style.cssText = ";padding-bottom: 10px;";
      }
      //ShowcaseInit(clickurl);
      if ($(url).width() > parseFloat(params.textads_width)) {
        TextAdsCutAd(preview, table, td, title, desc, url, 'url');
      }
      if (table.width() > parseFloat(params.textads_width) || table.height() > parseFloat(params.textads_height)) {
        if (params.textads_num == 1 || parseFloat(params.textads_height) < 90) {
          title.style.cssText += ";font-size: 11px; line-height: 11px;";
          desc.style.cssText += ";font-size: 11px; line-height: 11px; ";
          url.style.cssText += ";font-size: 11px; line-height: 11px;";
          preview.addClass("small_size");
        }
        if (i == 0 || parseFloat(params.textads_width) < 150) {
          TextAdsCutAd(preview, table, td, title, desc, url, 'desc');
          TextAdsCutAd(preview, table, td, title, desc, url, 'title');
          if (i > 0 && (table.width() > parseFloat(params.textads_width) || table.height() > parseFloat(params.textads_height))) {
            if (rowCount < 2) {
              colCount--;
            }
            $(td).remove();
            break;
          }
        } else {
          if ((i % colCount) == 0 && i>0)
          {
          if (rowCount < 2) {
            colCount--;
          }
          $(td).remove();
          break;
          }    
        }
      }
      $(tr).find("td").each(function() {
        tdheight[rowCount] = tdheight[rowCount] < $(this).height() ? $(this).height() : tdheight[rowCount];
      });
    }
    wid = parseFloat(params.textads_width) / colCount;
    table.find(".clickurl").each(function() {
      var i = $(this).closest("tr").attr("name"), pad = $(this).css("padding-top");
      pad = pad.replace("px", "");
      pad = parseFloat(pad);
      if (colCount == 1) {
        $(this).css({"width":wid - 2 - pad * 2,"margin-right":"0"});
      } else {
        $(this).css("width", wid - 7 - pad * 2);
      }
      if (orient == 'h') {
        if (rowCount == 1) {
          $(this).css({"margin-top":"0","height":tdheight[i] - pad * 2 });
        } else {
          $(this).css("height", tdheight[i] - 5 - pad * 2);
        }
      }
    });
    scrollableHeight();
  }

  function TextAdsCutAd(preview, table, td, title, desc, url, type) {
    var ad_width, CutWords, bloc_height,bloc_width, title_text, description_text, url_text, out, ad_height,t_height, d_height, t_w, t_words, d_w, d_words, u_w, u_words;
    title = $(title);
    desc = $(desc);
    url = $(url);
    CutWords = function (text, len, sep) {
      var res, t, i;
      res = '';
      sep = ' ';
      t = text.split(sep);
      for (i = 0; i < len; i = i + 1) {
        res += t[i];
        if (i === len - 1) {
          res += "...";
        } else {
          res += sep;
        }
      }
      return res;
    };
    bloc_width = preview.width();
    bloc_height = preview.height();
    out = 1;
    do {
      title_text = (title !== null) ? title.text() : ' ';
      description_text = (desc !== null) ? desc.text() : ' ';
      url_text = url.text();
      t_height = title.height();
      d_height = desc.height();
      t_w = title_text.split(' ');
      t_words = t_w.length;
      d_w = description_text.split(' ');
      d_words = d_w.length;
      u_w = url_text.split(' ');
      u_words = u_w.length;
      ad_height = table.height();
      ad_width = table.width();
      if (ad_height > bloc_height || ad_width > bloc_width || url.width() > bloc_width) {
        if (u_words > 1 && url_text !== ' ' && url_text !== '...') {
          url_text = CutWords(url_text, u_words - 1);
          url.text(url_text);
          if (url.text() === '...') {
            url.text('');
          }
        } else if ((url_text.length > 13 || url.width() > bloc_width) && type == 'url') {
          url_text = url_text.substring(0, url_text.length - 4);
          url.text(url_text + '...');
        } else if (t_words > 3 && type == 'title') {
          title_text = CutWords(title_text, t_words - 1);
          title.text(title_text);
        } else
        if (d_words > 2 && type == 'desc') {
          description_text = CutWords(description_text, d_words - 1);
          desc.text(description_text);
        } else {
          out = 0;
        }
      } else {
        out = 0;
      }
    } while (out);
  }

  function TagCloudForm() {
    var color, picker, tagcloud_size_val, err = $("#tagcloud_format .err");
    picker = $('#tagcloud_bigcol_picker');
    color = $("#tagcloud_bigcol");
    InitFarbtastic(picker, color, TagCloudPreview);
    picker = $('#tagcloud_lowcol_picker');
    color = $("#tagcloud_lowcol");
    InitFarbtastic(picker, color, TagCloudPreview);
    picker = $('#tagcloud_bgcol_picker');
    color = $("#tagcloud_bgcol");
    InitFarbtastic(picker, color, TagCloudPreview);
    picker = $('#tagcloud_bcol_picker');
    color = $("#tagcloud_bcol");
    InitFarbtastic(picker, color, TagCloudPreview);
    color = $("#tagcloud_format .color_scheme");
    picker = $("#tagcloud_format .color_scheme_popup");
    color.click(function() {
      picker.fadeIn("normal");
    });
    BackgroundClick(picker, color);
    $("#tagcloud_frame").parent().click(function() {
      if ($("#tagcloud_frame").attr("checked") == false) {
        $(".tagcloud_bcol").hide();
      } else {
        $(".tagcloud_bcol").show();
      }
    });
    $("#tagcloud_format .format_input").focus(function() {
      tagcloud_size_val = $(this).val();
    });
    $("#tagcloud_format .format_input").blur(function() {
      var wid,h;
      wid = $("#input[name='tagcloud_width']").val();
      wid = parseFloat(wid);
      h = $("#input[name='tagcloud_height']").val();
      h = parseFloat(h);
      if ($(this).val() < 60 || wid * h < 120 * 120) {
        {
          err.show();
          $(this).attr("value", tagcloud_size_val);
          setTimeout(function() {
            if (err.css("display") !== 'none') {
              err.fadeOut("fast")
            }
          }, 1000);
        }
      }
      else {
        $(".tagcloud_preview .keywords").html("");
        TagCloudPreview();
      }
    });
    $("#tagcloud_transparent").click(function() {
      $("#tagcloud_bgcol").css({"background": "url(" + $("#yeptyImgPath").val() + "transparent.gif) repeat 0 0"}).attr("value", "");
    });
    $("#cuselFrame-tagcloud_type span").click(function() {
      setTimeout(function() {
        $(".tagcloud_preview .keywords").html("");
        TagCloudPreview();
      }, 30)
    });
  }

  function scrollableHeight() {
    var h = $(".static_div:first").height();
    if (h > 1020) {
      $('.scrollable').css("height", h);
    } else {
      $('.scrollable').css("height", 1020);
    }
  }

  function TagCloudPreview() {
    var params = PreviewParams('tagcloud'),h, frame_color,timer, minsize = 12, maxsize = 28, pad, i, o1, size,color, r_percent, rand,
      popup = $("#showcase"),span, td = $(".tagcloud_preview td.keywords"),keywords = ExampleAds();
    OnlyOneFormatSelected($("#tagcloud_display"));
    frame_color = (params.tagcloud_frame == '1') ? params.tagcloud_bcol : 'transparent';
    w.getShortCode();
    $("#tagcloud_color_scheme .smallkey, #tagcloud_color_scheme .midkey").css({"background": params.tagcloud_lowcol});
    $("#tagcloud_color_scheme .bigkey").css("background", params.tagcloud_bigcol);
    $("#tagcloud_color_scheme").css({"background": params.tagcloud_bgcol,"border":"1px solid " + frame_color});
    pad = (parseFloat($(".tagcloud_preview").height()) - parseFloat(params.tagcloud_height) - 10) / 2;
    pad = (pad > 0) ? pad : 0;
    td.closest("table").parent().css({"padding-top": pad});
    td.css({"background":params.tagcloud_bgcol,"border":"1px solid " + frame_color});
    rand = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    td.css({"width":parseFloat(params.tagcloud_width) - 10,"height":"auto"});

    if (td.find(".tagcloud_link").size() !== 0) {
      td.find(".bigcol").css("color", params.tagcloud_bigcol);
      td.find(".lowcol").css("color", params.tagcloud_lowcol);
      scrollableHeight();
      return false;
    }
    for (i = 0; i < keywords.length; i++) {
      r_percent = (100 * (rand(40, 50) - 40)) / 10;
      size = Math.round(((maxsize - minsize) * r_percent) / 100 + minsize);
      color = r_percent >= 30 ? params.tagcloud_bigcol : params.tagcloud_lowcol;
      span = w.document.createElement("span");
      $(span).html(keywords[i].keyword);
      $(span).addClass("tagcloud_link");
      if (r_percent >= 30) {
        $(span).addClass("bigcol");
      } else {
        $(span).addClass("lowcol");
      }
      $(span).css({"font-size":size,"color":color}).attr("id", "tagcloud_link_" + i);
      if (params.tagcloud_type == '2') {
        span.onclick = function() {
          popup = $("#preview_popup");
          LinkClick(popup);
        };
      } else {
        span.onmouseover = function() {
          var id = $(this).attr("id"), el = this, delay = (popup.css("display") == "none")?1:250;
          id = id.replace("tagcloud_link_", "");
          timer = setTimeout(function() {
            LinkMouseOver(id, popup, el);
          }, delay);
        };
      }
      span.onmouseout = function() {
        clearTimeout(timer);
        LinkMouseOut();
      };
      BackgroundClick(popup, $(span), "fadeOut");
      td.append(span);
      if (td.closest("table").height() > parseFloat(params.tagcloud_height)) {
        $(span).remove();
        break;
      }
    }
    o1 = td.position();
    td.closest("table").css("height", params.tagcloud_height + "px");
    td.css("height", "100%");
    $("#tagcloud_logo").css({"left":o1.left + parseFloat(td.closest("table").width()) - 103});
    scrollableHeight();
  }

  function LinkClick(popup) {
    var pw = $(popup).width(), ph = $(popup).height(), ww = $(window).width(), wh = $(window).height();
    $(popup).css({"left":(ww - pw) / 2,"top": (wh - ph) / 2});
    if ($(popup).css("display") == "none") {
      $(popup).stop(true, true).fadeIn("normal");
    }
  }

  function LinkMouseOver(id, popup, el) {
    var ad = ExampleAds(id), pos = ($(el).closest("table").parent().parent().css("position") == "fixed" || $(el).parent().css("position") == "fixed") ? "fixed" : "absolute";
    if (ad.title) {
      popup.find(".title").html(ad.title);
    }
    if (ad.desc) {
      popup.find(".desc").html(ad.desc);
    }
    if (ad.url) {
      popup.find(".url").html(ad.url);
    }
    if (ad.price) {
      popup.find(".price").html(ad.price);
      popup.find(".url").css("display", "none");
    } else {
      popup.find(".url").css("display", "block");
    }
    if (ad.button) {
      popup.find(".btn").html(ad.button);
    }
    if (ad.clickUrl) {
      popup.find(".clickurl").attr("href", ad.clickUrl);
    }
    if (popup.attr("id") == "showcase" && ad.big_img) {
      popup.find(".img").attr("src", $("#yeptyImgPath").val() + ad.big_img);
    }
    if (ad.long_description) {
      popup.find(".long_desc").html(ad.long_description);
      popup.find(".ads_by_yepty").css("display", "none");
      popup.find(".btn").parent().css("display", "");
      popup.find(".img").closest("td").css("display", "");
      popup.find(".clickurl").css("height", "190px");
      popup.css("width", "460px");
      popup.css("background", "#fff");
      popup.find(".ar").css("background", "url("+$("#yeptyImgPath").val()+"arrow.png) no-repeat 0 0");
    } else {
      popup.find(".btn").parent().css("display", "none");
      popup.find(".ads_by_yepty").css("display", "block");
      popup.find(".clickurl").css("height", "auto");
      popup.find(".img").closest("td").css("display", "none");
      popup.css("background", "#f6f5f5");
      popup.find(".ar").css("background", "url("+$("#yeptyImgPath").val()+"newar.png) no-repeat 0 0");
      popup.css("width", "350px");
    }
    popup.css("position", pos);
    popup.onclick = function() {
      w.open(ad.clickUrl);
    };
    var o = $(el).offset(), mode = '', t, l, ar_l, width = $(el).width(), height = $(el).height(), pw = $(popup).width(), ph = $(popup).height(), ww = $(window).width(), wh = $(window).height(), st = $(document).scrollTop(), sl = $(document).scrollLeft();
    if (o.top - ph > st) {
      mode += 't';
    } else {
      mode += 'b';
    }
    if (o.left + width / 2 - pw / 2 < sl) {
      mode += 'l';
    } else {
      if (o.left + width / 2 + pw / 2 > sl + ww) {
        mode += 'r';
      } else {
        mode += 'c';
      }
    }
    l = o.left + width / 2 - pw / 2;
    if (mode === 'br' || mode === 'tr') {
      l = (l > (ww - pw - 5)) ? ww - pw - 5 : l;
    }
    if (mode === 'bl' || mode === 'tl') {
      l = (l > sl) ? l : sl + 5;
    }
    $(popup).css("left", l);
    ar_l = o.left + width / 2 - l - 20 / 2;
    if (mode === 'br' || mode === 'bl' || mode === 'bc') {
      t = o.top + height + 13 + 3;
      if (pos == "fixed") {
        t -= st;
      }
      if ($(el).hasClass("textadsClickUrl")) { t -= 20; }
      $(popup).find(".ar").css({"background-position":"-33px 0","top": -14, left: ar_l});
    }
    if (mode === 'tr' || mode === 'tl' || mode === 'tc') {
      t = o.top - ph - 13;
      if (pos == "fixed") {
        t -= st;
      }
      if ($(el).hasClass("textadsClickUrl")) { t += 20; }
      $(popup).find(".ar").css({"background-position":"0 0","top": ph, left: ar_l});
    }
    $(popup).css("top", t);
    clearTimeout(timer);
    timer = setTimeout(function () {
      if ($(popup).css("display") == "none") {
        $(popup).stop(true, true).fadeIn("normal");
      }
    }, 350);
  }

  function LinkMouseOut() {
    clearTimeout(timer);
  }

  function RelatedTagsForm() {
    var color, picker;
    picker = $('#relatedtags_col_picker');
    color = $("#relatedtags_col");
    InitFarbtastic(picker, color, RelatedTagsPreview);
    color = $("#relatedtags_format .color_scheme");
    picker = $("#relatedtags_format .color_scheme_popup");
    color.click(function() {
      picker.fadeIn("normal");
    });
    BackgroundClick(picker, color, "fadeOut");
    $("#cuselFrame-relatedtags_type span").click(function() {
      setTimeout(function() {
        $(".relatedtags_preview .keywords").html("");
        RelatedTagsPreview();
      }, 30)
    });
    $("#relatedtags_width").blur(function() {
      var err = $("#relatedtags_format .err");
      if (parseFloat($(this).val()) < 200) {
        $(this).attr("value", "200");
        err.show();
        setTimeout(function() {
          if (err.css("display") !== 'none') {
            err.fadeOut("fast")
          }
        }, 1000);
      } else {
        $(".relatedtags_preview td.keywords").html("");
        RelatedTagsPreview();
      }
    });
  }

  function RelatedTagsPreview() {
    var params = PreviewParams('relatedtags'), timer, i, popup = $("#showcase"), span, table = $(".relatedtags_preview table") , td = $(".relatedtags_preview td.keywords"),keywords = ExampleAds();
    w.getShortCode();
    $("#relatedtags_color_scheme .key").css("background", params.relatedtags_col);
    td.css({"width":"auto"});
    $(".relatedtags_preview .line_foot").css({"width":parseFloat(params.relatedtags_width) - 115});
    $(".relatedtags_preview .line").css({"width":parseFloat(params.relatedtags_width) - 80});
    OnlyOneFormatSelected($("#relatedtags_display"));
    scrollableHeight();
    if (td.find(".relatedtags_link").size() !== 0) {
      $(".relatedtags_link").css("color", params.relatedtags_col);
      return false;
    }
    table.css({"width":"auto"});
    for (i = 0; i < keywords.length; i++) {
      span = w.document.createElement("span");
      $(span).html(keywords[i].keyword);
      $(span).addClass("relatedtags_link");
      $(span).css({"font-size":14,"color": params.relatedtags_col}).attr("id", "relatedtags_link_" + i);
      if (params.relatedtags_type == '2') {
        span.onclick = function() {
          var id = $(this).attr("id"), id = id.replace("relatedtags_link_", "");
          popup = $("#preview_popup");
          LinkClick(popup);
        };
      } else {
        span.onmouseover = function() {
          var id = $(this).attr("id"), id = id.replace("relatedtags_link_", ""), self = this, delay = (popup.css("display") == "none")?1:250;
          timer = setTimeout(function() {
            LinkMouseOver(id, popup, self);
          }, delay);
        };
      }
      span.onmouseout = function() {
        clearTimeout(timer);
        LinkMouseOut();
      };
      BackgroundClick(popup, $(span), "fadeOut");
      td.append(span);
      if (td.width()-15 > parseFloat(params.relatedtags_width)) {
        $(span).remove();
        break;
      }
    }
    table.css("width", params.relatedtags_width + "px");

  }

  function tipsy() {
    $('a.tips').tipsy({gravity: 's'});
  }

  window.yeptyPluginAdminScript.viewStyle = {
    "textAds": clearTextAdsPreview,
    "tagCloud": TagCloudPreview,
    "relatedTags": RelatedTagsPreview
  };

})(window);


