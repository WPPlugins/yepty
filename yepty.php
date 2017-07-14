<?php
/*
    Plugin Name: Yepty
    Plugin URI: http://wordpress.org/extend/plugins/yepty/
    Description: Yepty.
    Author: Yepty.com
    Version: 1.5
    Author URI: http://yepty.com/
    License: GPLv2 or later
*/
/*
    Copyright 2012  yepty.com  (email: support@yepty.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
if (!defined('YEPTY_WIDGET_INIT')) {
  define('YEPTY_WIDGET_INIT', true);
} else {
  return;
}
if (class_exists("YeptyErrorReporter") || class_exists("YeptyMain") || class_exists("YeptyWidget") || class_exists("YeptyAdmnin") || class_exists("YeptyView")) {
  $yeptyErrorCallbackFunction = create_function('$content = ""', '
        $content .= "
            <div style=\"background: none repeat scroll 0 0 #FFFFE4;border: 1px solid #FFBC9F;color: #646974;font-size: 12px;line-height: 20px;margin-bottom: 20px;padding: 3px 7px;text-align: center;\">
                    Yepty plugin conflict namespace. Class YeptyErrorReporter, YeptyWidget, YeptyAdmnin, YeptyMain is all ready exists.
            </div>
        ";
        return $content;
    ');
  add_filter('the_content', $yeptyErrorCallbackFunction, 20);
  add_filter('get_the_excerpt', $yeptyErrorCallbackFunction, 20);
} else {
  require_once "YeptyError.php";
  require_once "YeptyMain.php";
  require_once "YeptyWidget.php";
  require_once "YeptyAdmin.php";
  require_once "YeptyView.php";
  require_once "YeptyJson.php";
  $yepty = new YeptyView(new YeptyWidget(), new YeptyAdmin(), new YeptyErrorReporter());
  if (is_admin()) {
    $yepty->initAdmin();
  } else {
    $yepty->initWidget();
  }
}

