import "./lib/jquery-3.4.1.min.js";

/* --- EVENTS DECLARATION --- */

// Feature : "Remove message"
$("#dialog").on("click", "button", removeMessage);

// Feature : "Add new message"
$("#send-btn").click(createNewMessage);

// Feature : "Change message alignment"
$("button", $("#align-btns")).click(changeAlignment);

// Feature : "Select discussion item"
$("a.list-group-item").click(switchListItem);

/* --- FUNCTIONS DECLARATION --- */

/**
 * Removes a message from the page, if a "trash" button is clicked
 */
function removeMessage() {
  // 'this' still represent the clicked button
  // So we can reuse the same code as before.
  $(this).closest("div.col-8").remove();
}

/**
 * Creates a new message on the page, when the "send" button is clicked
 * @param {Event} event The event that triggers the call
 */
function createNewMessage(event) {
  const $message = $("#message");
  // Getting the "New message" value
  const msgValue = $message.val();
  if (msgValue === "") {
    $message.addClass("is-invalid");
  } else {
    getTemplate("new-message")
      .then($)
      .then(($template) => renderTemplate($template, msgValue));
  }
  event.preventDefault();
}

function renderTemplate($template, content) {
  const $message = $("#message");
  // Get the correct alignment
  const alignment = getAlignmentClass($message);

  // Insert the value in the tempalte
  $("div.msg-content", $template).text(content);
  $("small.text-info", $template).text(getCurrentTime());
  if (alignment) $template.addClass(alignment);

  // Add the template to the page
  $("#dialog").find("div.row").append($template);
  $message.val("");
}

/**
 * Switch the selected list item, when a discussion list item is clicked.
 */
function switchListItem() {
  // Change the active state to the clicked item
  $("a.list-group-item.active").removeClass("active");
  // Add the 'active' class to the clicked list item
  $(this).addClass("active");
  // Clear the unread notification for the clicked item
  $("span.badge", this).text("");
}

/**
 * Change the alignment of the "New message" textarea,
 * when an alignment button is clicked
 *
 * @param {Event} event The event that triggered the call
 */
function changeAlignment(event) {
  // Change the active state when a button is clicked
  $("button", $("#align-btns")).removeClass("active");
  $(this).addClass("active").blur();
  // React to the adequate clicked button
  if ($("i", this).hasClass("fa-align-right")) {
    $("#message").removeClass("text-left text-center").addClass("text-right");
  } else if ($("i", this).hasClass("fa-align-center")) {
    $("#message").removeClass("text-right text-left").addClass("text-center");
  } else {
    $("#message").removeClass("text-right text-center");
  }
  // Prevent the default submit behavior
  event.preventDefault();
}

/**
 * Get the alignment class name applied to the given element.
 * If it's the default alignement (left), returns null.
 *
 * @param {Object} $ele A jQuery element
 */
function getAlignmentClass($ele) {
  if ($ele.hasClass("text-right")) {
    return "text-right";
  } else if ($ele.hasClass("text-center")) {
    return "text-center";
  } else {
    return null;
  }
}

/**
 * Returns the current time in a HH:MM formatted string
 */
function getCurrentTime() {
  const date = new Date();
  return date.toLocaleTimeString("fr-CH", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getTemplate(name) {
  return $.get(`templates/${name}.html`).then($);
}
