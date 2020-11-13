let $filters = $("#filters");
let templatesAvailable = $(".template", ".templates").not(".filter-chooser")
  .length;
console.log(templatesAvailable);
let movies;
$.getJSON("movies.json", function (data) {
  movies = data;
  $(document).trigger("moviesLoaded");
});
$(document).on("moviesLoaded", function () {
  $("#filters")
    .on("change", function () {
      let $this = $(this);
      let $filter = $this.closest(".filter");
      let filterType = $this.find(":selected").data("template-type");
      $(".qualifier", $filter).remove();
      $("div.template." + filterType)
        .clone()
        .addClass("qualifier")
        .appendTo($filter);

      $this.find('option[value=""]').remove();
    })
    .on("click", ".filter-remover", function () {
      $(this).closest(".filter").remove();
    });
  $("#filter-add").click(function () {
    if ($filters.find(".template:last.filter-type").val() === "") {
      return;
    }
    let filterInUse = $filters.children().map(function () {
      return $(this)
        .children(".template")
        .attr("class")
        .match(/\b(template-.+?)\b/g);
    });
  });
});
