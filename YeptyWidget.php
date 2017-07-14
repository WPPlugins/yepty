<?php
class YeptyWidget extends YeptyMain {
  var $errorReporter = null;
  var $priority = 16;
  var $defaultPriority = 10;
  var $placeIds = array();
  var $scriptsData = array();
  var $noindexClassName = 'yeptyNoIndexUniqueClass';

  function YeptyWidget() {
    $this->parentInit();
  }

  function setErrorObject($errorReporter) {
    $this->errorReporter = $errorReporter;
  }

  function removeTag($content, $text = '') {
    if ($text !== '') {
      return $content;
    }
    $text = get_the_content('');
    $text = strip_shortcodes( $text );
    remove_filter('the_content', array(&$this, 'displayContentWidget'), $this->defaultPriority - 1);
    $text = apply_filters('the_content', $text);
    add_filter('the_content', array(&$this, 'displayContentWidget'), $this->defaultPriority + 1);
    $text = str_replace(']]>', ']]&gt;', $text);
    $text = strip_tags($text);
    $excerpt_length = apply_filters('excerpt_length', 55);
    $excerpt_more = apply_filters('excerpt_more', ' ' . '[...]');
    $words = preg_split("/[\n\r\t ]+/", $text, $excerpt_length + 1, PREG_SPLIT_NO_EMPTY);
    if ( count($words) > $excerpt_length ) {
      array_pop($words);
      $text = implode(' ', $words);
      $text = $text . $excerpt_more;
    } else {
      $text = implode(' ', $words);
    }
    return $this->displayContentWidget($text, false);
  }

  function loadWidget() {
    add_filter('get_the_excerpt', array(&$this, 'displayContentWidgetExcerpt'), $this->priority);
    add_filter('the_content', array(&$this, 'displayContentWidget'), $this->priority);
    add_action('wp_footer', array(&$this, 'displayFooterWidget'), $this->priority);

    add_action('wp_footer', array(&$this, 'locateWidgetsData'), $this->priority + 1);
    add_action('wp_footer', array(&$this, 'locateWidgetsLoader'), $this->priority + 2);

    add_shortcode($this->shortCodeTag, array(&$this, 'locateShortCode'));
  }

  function displayContentWidgetExcerpt($content = '') {
    return has_excerpt() ? $this->displayContentWidget($content) : $content;
  }

  function displayContentWidget($content = '', $filtered = true) {
    $htmlContent = '';
    $widgetParams = $this->_getBlockWidgetParams();
    remove_filter('wp_trim_excerpt', array(&$this, 'removeTag'), $this->defaultPriority - 1, 2);
    $htmlContent .= $this->_getBlockHTML($widgetParams['top']);
    $htmlContent .= $content;
    $htmlContent .= $this->_getBlockHTML($widgetParams['bottom']);
    if ($filtered === true) {
      add_filter('wp_trim_excerpt', array(&$this, 'removeTag'), $this->priority, 2);
    }
    return $htmlContent;
  }

  function displayFooterWidget() {
    $widgetParams = $this->_getBlockWidgetParams();
    echo $this->_getBlockHTML($widgetParams['footer']);
  }

  function locateShortCode($data) {
    if (empty($data) || !isset($data['blockname']) || !isset($this->defaultWidgetParams[$data['blockname']])) {
      return '';
    }
    $blockName = $data['blockname'];
    $style = $this->buildBlockParams($blockName, $data);
    $placementId = $this->_createUniquePlacementId(md5('shortCode' . $blockName));
    $this->scriptsData[$placementId] = $style;
    return '<div class="' . $this->noindexClassName . '"><div id="yepty_' . $placementId . '"></div></div>';
  }

  function locateWidgetsData() {
    if (empty($this->scriptsData)) {
      return;
    }
    $script = <<<EOF
      <script type='text/javascript'>/* <![CDATA[ */
        (function(w){
          if (!w.YeptyWidget) {w.YeptyWidget = {Params : {}};}
EOF;
    $json = function_exists('json_encode') ? null : new YeptyJson();
    foreach ($this->scriptsData as $id => $styleParams) {
      if (function_exists('json_encode')) {
        $params = json_encode($styleParams);
      } else {
        $params = $json->encode($styleParams);
      }
      $script .= "w.YeptyWidget.Params['{$id}'] = {$params};\n";
    }
    $script .= "})(window);/* ]]> */</script>";
    echo $script;
  }

  function locateWidgetsLoader() {
    if (empty($this->placeIds)) {
      return;
    }
    echo <<<EOF
      <script type='text/javascript'>/* <![CDATA[ */
          (function (w) {
              var jQuery = w.jQuery ? w.jQuery : w.$;
              if (!jQuery) { return;}
              jQuery('.{$this->noindexClassName}').each(function (n, element) {
                  var content = jQuery(element).html();
                  jQuery(element).html('<noindex>' + content + '</noindex>');
              });
          })(window);
       /* ]]> */</script>
EOF;
    echo '<script type="text/javascript" src="' . $this->params['server']['protocol'] . '//' . $this->params['server']['host'] . $this->params['server']['port'] . '/' . $this->params['server']['scriptPath'] . $this->params['server']['scriptLoader'] . '"></script>';
  }

  function _getBlockHTML($params) {
    $html = '';
    if (empty($params)) {
      return $html;
    }
    foreach ($params as $id => $values) {
      $html .= '<div class="' . $this->noindexClassName . '"><div id="yepty_' . $id . '"></div></div>';
      $this->scriptsData[$id] = $values;
    }
    return $html;
  }

  function _getAvailablePlacesIds() {
    $placementIds = array();
    if (is_home() && !is_paged()) {
      $currentPlace = 'main';
    } elseif ((!is_home() || is_paged()) && !is_single() && !is_page()) {
      $currentPlace = 'other';
    } elseif (is_single() || is_page()) {
      $currentPlace = 'post';
    } else {
      return $placementIds;
    }
    $placements = $this->getPlacements();
    if (empty($placements)) {
      return $placementIds;
    }
    foreach ($placements as $id => $params) {
      if (isset($params['placement']) && in_array($currentPlace, $params['placement'])) {
        $placementIds[$id] = $params;
      }
    }
    return $placementIds;
  }

  function _getBlockWidgetParams() {
    $ids = $this->_getAvailablePlacesIds();
    $params = array(
      "top" => array(),
      "bottom" => array(),
      "footer" => array()
    );
    if (empty($ids)) {
      return $params;
    }
    foreach ($ids as $id => $placementParams) {
      $curParam = $this->getBlockStyle($id);
      if (!isset($curParam['name']) || !isset($curParam['style'])) {
        continue;
      }
      $param = $this->buildBlockParams($curParam['name'], $curParam['style']);
      if (empty($param)) {
        continue;
      }

      if (!empty($placementParams['position'])) {
        foreach ($placementParams['position'] as $position) {
          $placementId = $this->_createUniquePlacementId(md5($position . $id));
          $params[$position][$placementId] = $param;
        }
      } else {
        $placementId = $this->_createUniquePlacementId($id);
        $params['footer'][$placementId] = $param;
      }
    }
    return $params;
  }

  function _createUniquePlacementId($id) {
    global $post;
    $key = isset($post) && $post && isset($post->ID) ? md5($id . $post->ID) : $id;
    if (!isset($this->placeIds[$key])) {
      $this->placeIds[$key] = rand(999999, 999999999);
    }
    return $this->placeIds[$key];
  }
}

