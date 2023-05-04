import "./lib/jquery-3.6.4.min.js";

/* DOM REFERENCES */

const $alignButtons = $("#align-btns");
const $message = $("#message");

/* EVENT HANDLERS */

// Feature 1 - Switch List Item

$("a.list-group-item").on("click", switchListItem);

// Feature 2 - Change Alignment


$("button", $alignButtons).on("click", changeAlignment);

// Feature 3 - Create New Message


$("#send-btn").on("click", createNewMessage);

// Feature 4 : "Remove message"

$("#dialog").on("click", "button", removeMessage)

/* BUSINESS FUNCTIONS */

function switchListItem(event) {
  const $target = $(event.currentTarget);
  // Change the active state to the clicked item
  $("a.list-group-item.active").removeClass("active");
  $target.addClass('active');
  // Clear the unread notification for the clicked item
  $('span.badge', $target).text("");
}

function changeAlignment(event) {
  const $target = $(event.currentTarget);
  // Change the active state when a button is clicked
  $("button.active", $alignButtons).removeClass("active");
  $target.addClass("active");
  // Check what button has been clicked
  const btnId = $target.attr("id");
  if (btnId === "align-left-btn") {
    $("#message").removeClass("text-end text-center").addClass("text-start")
  } else if (btnId === "align-center-btn") {
    $("#message").removeClass("text-end text-start").addClass("text-center");
  } else if (btnId === "align-right-btn") {
    $("#message").removeClass("text-start text-center").addClass("text-end");
  }
}

function createNewMessage(event) {
  const msgValue = $message.val();
  if (msgValue === "") {
    $message.addClass('is-invalid');
  } else {
    getTemplate("new-message")
      .then($)
      .then(($template) => renderTemplate($template, msgValue));
  }
  event.preventDefault();
}

function renderTemplate($template, content) {
  const alignment = getTextareaAlignment($message);

  $("div.msg-content", $template).text(content);
  $("small.text-primary", $template).text(getCurrentTime());
  $template.addClass(alignment);

  $("#dialog").find("div.row").append($template);
  $message.val("");
}


function getTextareaAlignment($textarea) {
  if ($textarea.hasClass("text-start")) {
    return "text-class";
  } else if ($textarea.hasClass("text-center")) {
    return "text-center";
  } else {
    return "text-end";
  }
}

function getCurrentTime() {
  const date = new Date();
  return date.toLocaleTimeString("fr-CH", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function removeMessage(event) {
  $(event.currentTarget).closest("div.col-8").remove()
}

function getTemplate(name) {
  return $.get(`templates/${name}.html`).then($);
}
