<?php
class YeptyMain {
  var $params;
  var $dbOptionsNames;
  var $defaultWidgetParams;
  var $adsFormates;
  var $shortCodeTag = 'yepty';

  function parentInit() {
    $this->params = array(
      'server' => array(
        'host' => 'shuttle.yepty.com',
        'port' => '',
        'protocol' => 'http:',
        'scriptLoader' => 'Loader.js',
        'scriptPath' => '',
        'imgPath' => WP_PLUGIN_URL . '/yepty/img/'
      ),
      'logo' => array(
        'path' => WP_PLUGIN_URL . '/yepty/img/',
        'big_img' => 'logo.png',
        'small_img' => 'favicon.png'
      )
    );
    $this->dbOptionsNames = array(
      "oldStyle" => 'YeptyPluginAdminDisplayMode',
      "blocksStyles" => 'YeptyPluginStyleBlock_',
      "webmasterId" => 'YeptyPluginWebmasterId',
      "placements" => 'YeptyPluginPlacements'
    );

    $this->defaultWidgetParams = array(
      "adLine" => array(
        "style" => array(
          "display" => false,
          "position" => "top",
          "tcol"=>"202B6F",
          "dcol"=>"1D1D1D",
          "ucol"=>"0FC558",
          "pcol"=>"E63677",
          "bgcol"=>"F6F5F5",
          "bcol"=>"E5E5E5"
        ),
        "placement" => array(
          "main" => true,
          "post" => true,
          "other" => true
        )
      ),
      "inText" => array(
        "style" => array(
          "display" => true,
          "kwLimit" => 0,
          "style" => "double",
          "color" => "1EA1B8",
          "tcol"=>"202B6F",
          "dcol"=>"1D1D1D",
          "ucol"=>"0FC558",
          "pcol"=>"E63677",
          "bgcol"=>"F6F5F5",
          "bcol"=>"E5E5E5"
        ),
        "placement" => array(
          "main" => true,
          "post" => true,
          "other" => true
        )
      ),
      "inImage" => array(
        "style" => array(
          "display" => true,
          "position" => "bl",
          "minX" => 380,
          "minY" => 200,
          "showAds" => true,
          "range" => 20,
          "tcol"=>"202B6F",
          "dcol"=>"1D1D1D",
          "ucol"=>"0FC558",
          "pcol"=>"E63677",
          "bgcol"=>"F6F5F5",
          "bcol"=>"E5E5E5"
        ),
        "placement" => array(
          "main" => true,
          "post" => true,
          "other" => true
        )
      ),
      "slider" => array(
        "style" => array(
          "display" => true,
          "position" => "bl",
          "range" => 50,
          "tcol"=>"202B6F",
          "dcol"=>"1D1D1D",
          "ucol"=>"0FC558",
          "pcol"=>"E63677",
          "bgcol"=>"F6F5F5",
          "bcol"=>"E5E5E5"
        ),
        "placement" => array(
          "main" => true,
          "post" => true,
          "other" => true
        )
      ),
      "textAds" => array(
        "style" => array(
          'display' => false,
          'width' => 728,
          'height' => 90,
          'frame' => true,
          'separate' => true,
          'num' => 5,
          'tcol' => '202B6F',
          'dcol' => '1D1D1D',
          'ucol' => '0FC558',
          'bgcol' => 'F5FFFF',
          'bcol' => 'C1E8EC',
          'pcol' => 'E63677',
          'tsize' => 16,
          'dsize' => 12,
          'usize' => 10,
          'psize' => 13,
          'tstyle' => false,
          'dstyle' => true,
          'ustyle'=> false,
          'pstyle'=> false
        ),
        "placement" => array(
          "main" => true,
          "post" => true,
          "other" => true
        ),
        "position" => array(
          "top" => true,
          "bottom" => true
        )
      ),
      "tagCloud" => array(
        "style" => array(
          'display' => false,
          'width' => 250,
          'height' => 250,
          'bigcol' => '202B6F',
          'lowcol' => '00000b',
          'bgcol' => 'fbfbfb',
          'bcol' => 'ccc',
          'opacity' => 100,
          'frame' => false,
          'type' => 1
        ),
        "placement" => array(
          "main" => true,
          "post" => true,
          "other" => true
        ),
        "position" => array(
          "top" => true,
          "bottom" => true
        )
      ),
      "relatedTags"=> array(
        "style" => array(
          'display' => false,
          'width' => 800,
          'type' => 1,
          'col' => '202B6F'
        ),
        "placement" => array(
          "main" => true,
          "post" => true,
          "other" => true
        ),
        "position" => array(
          "top" => true,
          "bottom" => true
        )
      )
    );
  }

  function getWebmasterId() {
    $webmasterId = get_option($this->dbOptionsNames['webmasterId']);
    return $webmasterId ? $this->validateWebmasterId(trim($webmasterId)): $this->___getOldWebmasterId();
  }

  function ___getOldWebmasterId() {
    $oldParams = get_option($this->dbOptionsNames['oldStyle']);
    if ( !$oldParams || !is_string($oldParams)) {
      return false;
    }
    $oldParams = @unserialize($oldParams);
    return isset($oldParams['webmasterId']) ? $this->validateWebmasterId($oldParams['webmasterId']) : false;
  }

  function getBlockStyle($blockId) {
    $blockParams = get_option($this->dbOptionsNames['blocksStyles'] . $blockId);
    if ( !$blockParams || !is_string($blockParams)) {
      return isset($this->defaultWidgetParams[$blockId]) ? $this->defaultWidgetParams[$blockId] : array();
    }
    return @unserialize( $blockParams );
  }

  function validateWebmasterId($webmasterId) {
    $fail = false;
    if (is_string($webmasterId) && $webmasterId && strlen(trim($webmasterId)) > 0) {
      $webmasterId = preg_match('/^\w{3}-\d{5}$/', trim($webmasterId)) ? strtolower(trim($webmasterId)) : $fail;
    } else {
      $webmasterId = $fail;
    }
    return $webmasterId;
  }

  function getPlacements() {
    $placementsParams = get_option( $this->dbOptionsNames['placements'] );
    if ($placementsParams  && is_string($placementsParams)) {
      return unserialize($placementsParams);
    } else {
      return array();
    }
  }

  function createPlacementId($position, $placements, $blockName) {
    return md5(serialize($position) . serialize($placements) . $blockName);
  }

  function buildBlockParams($blockName, &$style) {
    //TODO: refactor client code input params to Params[] = json_encode($style)
    $params = array();
    if (!isset($style['display']) || !$style['display']) {
      return $params;
    }
    switch ($blockName) {
      case 'inText':
        $params = $this->_inTextParams($style);
        break;
      case 'adLine':
        $params = $this->_adLineParams($style);
        break;
      case 'inImage':
        $params = $this->_inImageParams($style);
        break;
      case 'slider':
        $params = $this->_sliderParams($style);
        break;
      case 'textAds':
        $params = $this->_textAdsParams($style);
        break;
      case 'tagCloud':
        $params = $this->_tagCloudParams($style);
        break;
      case 'relatedTags':
        $params = $this->_relatedTagsParams($style);
        break;
    }
    $params['publisher_key'] = $this->getWebmasterId();
    return $params;
  }

  function _inTextParams(&$style) {
    $params = array();
    $params['intext'] = '1';
    $params['intext_keywords'] = isset($style['kwLimit']) ? $style['kwLimit'] : 0;
    $params['intext_style'] = isset($style['style']) ? $style['style'] : '';
    $params['intext_color'] = isset($style['color']) ? $style['color'] : '';
    $params['intext_tcol'] = isset($style['tcol']) ? $style['tcol'] : '';
    $params['intext_dcol'] = isset($style['dcol']) ? $style['dcol'] : '';
    $params['intext_ucol'] = isset($style['ucol']) ? $style['ucol'] : '';
    $params['intext_pcol'] = isset($style['pcol']) ? $style['pcol'] : '';
    $params['intext_bgcol'] = isset($style['bgcol']) ? $style['bgcol'] : '';
    $params['intext_bcol'] = isset($style['bcol']) ? $style['bcol'] : '';
    return $params;
  }
  function _adLineParams(&$style) {
    $params = array();
    $params['adline'] = '1';
    $params['adline_position'] = isset($style['position']) ? $style['position'] : 'top';
    $params['adline_tcol'] = isset($style['tcol']) ? $style['tcol'] : '';
    $params['adline_dcol'] = isset($style['dcol']) ? $style['dcol'] : '';
    $params['adline_ucol'] = isset($style['ucol']) ? $style['ucol'] : '';
    $params['adline_pcol'] = isset($style['pcol']) ? $style['pcol'] : '';
    $params['adline_bgcol'] = isset($style['bgcol']) ? $style['bgcol'] : '';
    $params['adline_bcol'] = isset($style['bcol']) ? $style['bcol'] : '';
    return $params;
  }
  function _inImageParams(&$style) {
    $params = array();
    $params['inimage'] = '1';
    $params['inimage_minx'] = isset($style['minX']) ? $style['minX'] : 0;
    $params['inimage_miny'] = isset($style['minY']) ? $style['minY'] : '';
    $params['inimage_show_ads'] = isset($style['showAds']) && $style['showAds'] ? '1' : '0';
    $params['inimage_range'] = isset($style['range']) ? $style['range'] : '';
    $params['inimage_position'] = isset($style['position']) ? $style['position'] : '';
    $params['inimage_tcol'] = isset($style['tcol']) ? $style['tcol'] : '';
    $params['inimage_dcol'] = isset($style['dcol']) ? $style['dcol'] : '';
    $params['inimage_ucol'] = isset($style['ucol']) ? $style['ucol'] : '';
    $params['inimage_pcol'] = isset($style['pcol']) ? $style['pcol'] : '';
    $params['inimage_bgcol'] = isset($style['bgcol']) ? $style['bgcol'] : '';
    $params['inimage_bcol'] = isset($style['bcol']) ? $style['bcol'] : '';
    return $params;
  }
  function _sliderParams(&$style) {
    $params = array();
    $params['slider'] = '1';
    $params['slider_range'] = isset($style['range']) ? $style['range'] : '';
    $params['slider_position'] = isset($style['position']) ? $style['position'] : '';
    $params['slider_tcol'] = isset($style['tcol']) ? $style['tcol'] : '';
    $params['slider_dcol'] = isset($style['dcol']) ? $style['dcol'] : '';
    $params['slider_ucol'] = isset($style['ucol']) ? $style['ucol'] : '';
    $params['slider_pcol'] = isset($style['pcol']) ? $style['pcol'] : '';
    $params['slider_bgcol'] = isset($style['bgcol']) ? $style['bgcol'] : '';
    $params['slider_bcol'] = isset($style['bcol']) ? $style['bcol'] : '';
    return $params;
  }
  function _textAdsParams(&$style) {
    $params = array();
    $params['textads'] = '1';
    $params['textads_width'] = $style['width'];
    $params['textads_height'] = $style['height'];
    $params['textads_frame'] = $style['frame'] ? '1' : '0';
    $params['textads_separate'] = $style['separate'] ? '1' : '0';
    $params['textads_num'] = $style['num'];
    $params['textads_tcol'] = $style['tcol'];
    $params['textads_dcol'] = $style['dcol'];
    $params['textads_ucol'] = $style['ucol'];
    $params['textads_pcol'] = $style['pcol'];
    $params['textads_bgcol'] = $style['bgcol'];
    $params['textads_bcol'] = $style['bcol'];
    $params['textads_tsize'] = $style['tsize'];
    $params['textads_dsize'] = $style['dsize'];
    $params['textads_usize'] = $style['usize'];
    $params['textads_psize'] = $style['psize'];
    $params['textads_tstyle'] = $style['tstyle'] ? '1' : '0';
    $params['textads_dstyle'] = $style['dstyle'] ? '1' : '0';
    $params['textads_ustyle'] = $style['ustyle'] ? '1' : '0';
    $params['textads_pstyle'] = $style['pstyle'] ? '1' : '0';
    return $params;
  }
  function _tagCloudParams(&$style) {
    $params = array();
    $params['tagcloud'] = '1';
    $params['tagcloud_width'] = $style['width'];
    $params['tagcloud_height'] = $style['height'];
    $params['tagcloud_frame'] = $style['frame'] ? '1' : '0';
    $params['tagcloud_bigcol'] = $style['bigcol'];
    $params['tagcloud_lowcol'] = $style['lowcol'];
    $params['tagcloud_bgcol'] = $style['bgcol'];
    $params['tagcloud_bcol'] = $style['bcol'];
    $params['tagcloud_type'] = $style['type'];
    return $params;
  }
  function _relatedTagsParams(&$style) {
    $params = array();
    $params['relatedtags'] = '1';
    $params['relatedtags_width'] = $style['width'];
    $params['relatedtags_type'] = $style['type'];
    $params['relatedtags_col'] = $style['col'];
    return $params;
  }
}
