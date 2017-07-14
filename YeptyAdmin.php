<?php
class YeptyAdmin extends YeptyMain {
  var $adminMenu;
  var $errorReporter = null;
  var $adZonesLimit = 40;

  function YeptyAdmin() {
    $this->parentInit();
    $this->adminMenu = array(
      array(
        'top' => array(
          "parent_slug" => "options-general.php" ,
          "page_title" => "Yepty Settings",
          "menu_title" => "Yepty",
          "capability" => "manage_options",
          "menu_slug" => "yepty-menu",
          "function" => array(&$this, 'buttonsSettings'),
          "icon_url" => $this->params['logo']['small_img'] ? $this->params['logo']['path'] . $this->params['logo']['small_img'] : '',
          "position" => NULL
        )
      )
    );
  }

  function setErrorObject($errorReporter) {
    $this->errorReporter = $errorReporter;
  }

  function composeMenuBar() {
    if (!is_array($this->adminMenu) || !(count($this->adminMenu) > 0)) {
      return;
    }
    $menuPagesCount = count($this->adminMenu);
    for ($i = 0; $i < $menuPagesCount; $i++) {
      $topMenu = isset($this->adminMenu[$i]['top']) ? $this->adminMenu[$i]['top'] : false;
      if (!is_array($topMenu) || !(count($topMenu) > 0)) {
        continue;
      }
      $page_title = isset($topMenu['page_title']) ? $topMenu['page_title'] : '';
      $menu_title = isset($topMenu['menu_title']) ? $topMenu['menu_title'] : '';
      $capability = isset($topMenu['capability']) ? $topMenu['capability'] : '';
      $menu_slug = isset($topMenu['menu_slug']) ? $topMenu['menu_slug'] : '';
      $function = isset($topMenu['function']) ? $topMenu['function'] : '';
      $icon_url = isset($topMenu['icon_url']) ? $topMenu['icon_url'] : '';
      $position = isset($topMenu['position']) ? $topMenu['position'] : NULL;
      $parent_slug = isset($topMenu['parent_slug']) ? $topMenu['parent_slug'] : false;
      if ($parent_slug) {
        add_submenu_page($parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function);
      } else {
        add_menu_page($page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position);
      }
      $subMenu = isset($this->adminMenu[$i]['sub']) ? $this->adminMenu[$i]['sub'] : false;
      if (!is_array($subMenu) || !(count($subMenu) > 0)) {
        continue;
      }
      $menuSubPagesCount = count($subMenu);
      for ($j = 0; $j < $menuSubPagesCount; $j++) {
        if (!is_array($subMenu[$j]) || !(count($subMenu[$j]) > 0)) {
          continue;
        }
        $parent_slug = isset($subMenu[$j]['parent_slug']) ? $subMenu[$j]['parent_slug'] : '';
        $page_title = isset($subMenu[$j]['page_title']) ? $subMenu[$j]['page_title'] : '';
        $menu_title = isset($subMenu[$j]['menu_title']) ? $subMenu[$j]['menu_title'] : '';
        $capability = isset($subMenu[$j]['capability']) ? $subMenu[$j]['capability'] : '';
        $menu_slug = isset($subMenu[$j]['menu_slug']) ? $subMenu[$j]['menu_slug'] : '';
        $function = isset($subMenu[$j]['function']) ? $subMenu[$j]['function'] : '';
        add_submenu_page($parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function);
      }
    }
  }

  function initMenu() {
    add_action('admin_menu', array(&$this, 'composeMenuBar'), 1);
  }

  function initAjax() {
    add_action( 'wp_ajax_yepty_on_form_request', array(&$this, 'onRequest'));
  }

  function onRequest() {
    if (!is_user_logged_in() || !is_admin() ) {
      wp_die('hacking??');
      return;
    }
    $sel = isset($_REQUEST['sel']) ? trim($_REQUEST['sel']) : '';
    switch ($sel) {
      case 'get_code':
        echo $this->getJavascriptCode($_REQUEST);
        break;
      case 'remove_ad_zone':
        $this->removeAdZone($_REQUEST);
        break;
      case 'load_adZones_list':
        $this->getAdZonesListTpl();
        break;
      case 'get_block_params':
        echo $this->getBlockParams($_REQUEST);
        break;
      case 'blocks_style':
        echo $this->saveBlockStyle($_REQUEST);
        break;
      case 'multi_block_style':
        echo $this->saveBlockStyle($_REQUEST, true);
        break;
      case 'webmaster':
        $this->saveWebmasterId($_REQUEST);
        break;
    }
    die();
  }

  function registerAdminScripts() {}

  function registerAdminCSS() {}

  function buttonsSettings() {
    if (!is_user_logged_in() || !is_admin() ) {
      wp_die('hacking??');
      return;
    }
    $this->constructorMainTpl();
  }

  function saveWebmasterId(&$params) {
    $webmasterId = $params['webmasterId'] ? $this->validateWebmasterId($params['webmasterId']) : false;
    if (!$webmasterId) {
      return;
    }
    update_option($this->dbOptionsNames['webmasterId'], $webmasterId);
  }

  function dataTypeValidation($defaultValue, $currentValue) {
    if (is_integer($defaultValue)) {
      return intval($currentValue);
    } elseif (is_float($defaultValue) || is_numeric($defaultValue)) {
      return floatval($currentValue);
    } elseif (is_bool($defaultValue)) {
      return $currentValue === 'true' || $currentValue == '1' ? true : false;
    }
    return $currentValue;
  }

  function saveBlockStyle(&$data, $multiPlacements = false) {
    if (!is_array($data) || !(count($data) > 0) ) {
      return '{"ok": false, "err":"data"}';
    }
    $params = $this->defaultWidgetParams;
    $placementsParams = $this->getPlacements();

    if (count($placementsParams) > $this->adZonesLimit) {
      return '{"ok": false, "err": "limit", "dsc": ' . $this->adZonesLimit . '}';
    }

    foreach ($params as $adType => $values) {
      if (!isset($params[$adType]) || !isset($data[$adType . '_display'])) {
        continue;
      }
      if ($multiPlacements && !$this->dataTypeValidation(false, $data[$adType . '_display'])) {
        continue;
      }
      $style = $params[$adType]['style'];
      $placements = isset($params[$adType]['placement']) ? $params[$adType]['placement'] : array();
      $usedPlacements = array();
      $positions = isset($params[$adType]['position']) ? $params[$adType]['position'] : array();
      $usedPositions = array();

      foreach ($placements as $place => $defaultValue) {
        $key = $multiPlacements ?  '' : $adType;
        $key .= '_' . $place . '_placements';
        if (isset($data[$key])) {
          $placements[$place] = $this->dataTypeValidation($defaultValue, $data[$key]);
          if ($placements[$place]) {
            array_push($usedPlacements, $place);
          }
        }
      }

      foreach ($positions as $position => $defaultValue) {
        $key = $multiPlacements ?  '' : $adType;
        $key .= '_position_' . $position;
        if (isset($data[$key])) {
          $positions[$position] = $this->dataTypeValidation($defaultValue, $data[$key]);
          if ($multiPlacements && $positions[$position]) {
            array_push($usedPositions, $position);
          }
        }
      }

      if ($multiPlacements && (empty($usedPlacements) || empty($usedPositions))) {
        return '{"ok": false, "err": "placements"}';
      }

      foreach ($style as $name => $defaultValue) {
        $key = $adType . '_' . $name;
        if (isset($data[$key])) {
          $style[$name] = $this->dataTypeValidation($defaultValue, $data[$key]);
        }
      }
      $placeId = $multiPlacements ? $this->createPlacementId($positions, $placements, $adType) : $adType;
      update_option($this->dbOptionsNames['blocksStyles'] . $placeId, serialize(array(
        "name" => $adType,
        "style" => $style,
        "position" => $positions,
        "placement" => $placements
      )));
      if (!empty($usedPlacements)) {
        $placementsParams[$placeId] = array("name" => $adType, "placement" => $usedPlacements, "position" => $usedPositions, "m" => $multiPlacements);
      }
    }

    if (!empty($placementsParams)) {
      update_option($this->dbOptionsNames['placements'], serialize($placementsParams));
    }
    return '{"ok": true}';
  }

  function getShortCode(&$data) {
    if (empty($data) || !isset($data['blockName']) || !isset($this->defaultWidgetParams[$data['blockName']])) {
      return 'wrong block name';
    }
    $blockName = $data['blockName'];
    $defaultParams = $this->defaultWidgetParams[$data['blockName']]['style'];
    $shortCodeParams = '';
    $params = array('publisher_key' => $this->getWebmasterId());
    $params[strtolower($blockName)] = '1';
    foreach ($defaultParams as $key => $defaultValue) {
      $paramsKey = $blockName . '_' . $key;
      $value = isset($data[$paramsKey]) ? $this->dataTypeValidation($defaultValue, $data[$paramsKey]) : $defaultValue;
      $shortCodeParams .= $key . "=";
      $shortCodeParams .= is_numeric($value) || is_bool($value) ?  $value : "'" . $value . "'";
      $shortCodeParams .= " ";
    }
    $shortCodeParams .= "blockName='" . $blockName . "'";
    return "[" . $this->shortCodeTag . " " . $shortCodeParams . "]";
  }
  function getJavascriptCode(&$data) {
    if (empty($data) || !isset($data['blockName']) || !isset($this->defaultWidgetParams[$data['blockName']])) {
      return 'wrong block name';
    }
    $blockName = $data['blockName'];
    $defaultParams = $this->defaultWidgetParams[$data['blockName']]['style'];
    $shortCodeParams = '';
    foreach ($defaultParams as $key => $defaultValue) {
      $paramsKey = $blockName . '_' . $key;
      $value = isset($data[$paramsKey]) ? $this->dataTypeValidation($defaultValue, $data[$paramsKey]) : $defaultValue;
      $key = ($key == 'display')?'':'_'.$key;
      $shortCodeParams .= "'".strtolower($data['blockName']).$key. "':";
      $shortCodeParams .= "'" . $value . "'";
      $shortCodeParams .= ", ";
    }
    $code_id = rand(999999, 999999999);
    $shortCodeParams .= "'publisher_key':'". $this->getWebmasterId()."'";
     return '<!--yepty code start--><noindex><div id="yepty_'.$code_id.'"><script type="text/javascript">(function(w) { if (!w.YeptyWidget) { w.YeptyWidget = {};} if (!w.YeptyWidget.Params) { w.YeptyWidget.Params = {}; } w.YeptyWidget.Params[\''.$code_id.'\'] = {'.$shortCodeParams.'} })(window);</script><script type="text/javascript" src="' . $this->params['server']['protocol'] . '//' . $this->params['server']['host'] . $this->params['server']['port'] . '/' . $this->params['server']['scriptPath'] . $this->params['server']['scriptLoader'] . '"></script></div></noindex><!--yepty code end -->';
  }
  function getAdZonesList() {
    $placements = $this->getPlacements();
    $adZones = array();
    if (empty($placements)) {
      return $adZones;
    }
    foreach ($placements as $id => $values) {
      if (!$values['m']) {
        continue;
      }
      $values['id'] = $id;
      array_push($adZones, $values);
    }
    return $adZones;
  }

  function getBlockParams(&$data) {
    $blockId = isset($data['id']) ? $data['id'] : '';
    $params = $this->getBlockStyle($blockId);
    if (function_exists('json_encode')) {
      $jsonParams = json_encode($params);
    } else {
      $json = new YeptyJson();
      $jsonParams = $json->encode($params);
    }
    return $jsonParams;
  }

  function removeAdZone(&$data) {
    if (!isset($data['id'])) {
      return;
    }
    $placements = $this->getPlacements();
    $newPlacements = array();
    if (!empty($placements)) {
      foreach ($placements as $id => $values) {
        if ($id !== $data['id']) {
          $newPlacements[$id] = $values;
        }
      }
      update_option($this->dbOptionsNames['placements'], serialize($newPlacements));
    }
    delete_option($this->dbOptionsNames['blocksStyles'] . $data['id']);
  }

  function getAdZonesListTpl() {
    $adZones = $this->getAdZonesList();
    include "templates/adZonesList.phtml";
  }

  function constructorMainTpl() {

    $webmasterId = $this->getWebmasterId();

    $inTextParams = $this->getBlockStyle('inText');
    $adLineParams = $this->getBlockStyle('adLine');
    $inImageParams = $this->getBlockStyle('inImage');
    $sliderParams = $this->getBlockStyle('slider');

    $textAdsParams = $this->defaultWidgetParams['textAds'];
    $tagCloudParams = $this->defaultWidgetParams['tagCloud'];
    $relatedTagsParams = $this->defaultWidgetParams['relatedTags'];

    $logoSRC = $this->params['logo']['big_img'] ? $this->params['logo']['path'] . $this->params['logo']['big_img'] : '';
    $imgPath = $this->params['server']['imgPath'];

    $scriptPath = $this->params['server']['protocol'] . "//" . $this->params['server']['host'] . $this->params['server']['port'] .'/'.$this->params['server']['scriptPath'];

    include "templates/header.phtml";
    include "templates/promo.phtml";
    include "templates/webmasterIdForm.phtml";
    include "templates/mainConstructor.phtml";
    include "templates/adZonesConstructor.phtml";
    include "templates/footer.phtml";
  }
}
