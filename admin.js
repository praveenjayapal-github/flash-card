$(document).ready(function () {
  // Load categories into dropdown
  $.getJSON("categories.json", function (categories) {
    categories.forEach(function (category) {
      $("#category-select").append(`<option value="${category}">${category}</option>`);
    });
  });

  // Drag-and-drop logic
  const dropZone = $("#drop-zone");

  dropZone.on("dragover", function (e) {
    e.preventDefault();
    dropZone.addClass("dragover");
  });

  dropZone.on("dragleave", function () {
    dropZone.removeClass("dragover");
  });

  dropZone.on("drop", function (e) {
    e.preventDefault();
    dropZone.removeClass("dragover");

    const files = e.originalEvent.dataTransfer.files;
    handleFiles(files);
  });

  function handleFiles(files) {
    $("#preview").empty();

    Array.from(files).forEach(file => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = $("<img>").attr("src", e.target.result).addClass("preview-img");
          $("#preview").append(img);
        };
        reader.readAsDataURL(file);
      }
    });

    // TODO: Save files to server and update JSON
  }
});