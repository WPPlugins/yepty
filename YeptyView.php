<?php
class YeptyView extends YeptyMain {
  var $widget, $admin, $errorReporter;
  function YeptyView(&$widget, &$admin, &$errorReporter) {
    $this->widget = $widget;
    $this->admin = $admin;
    $this->errorReporter = $errorReporter;
    $this->admin->setErrorObject($this->errorReporter);
    $this->widget->setErrorObject($this->errorReporter);
    $this->parentInit();
  }

  function initWidget() {
    $this->widget->loadWidget();
  }

  function initAdmin() {
    $this->admin->initMenu();
    $this->admin->initAjax();
    $this->admin->registerAdminScripts();
    $this->admin->registerAdminCSS();
  }
}
