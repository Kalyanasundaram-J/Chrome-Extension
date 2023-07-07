// Select the button using a CSS selector or any other method
// var button = document.querySelector('button#target-button');
var xpath = "//*[@id="existing-customer"]/form/button";
var button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

// Trigger a click event on the button
if (button) {
  button.click();
}