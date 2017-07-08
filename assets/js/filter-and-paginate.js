function filterAndPaginate(container, options) {
  var target = options.target,
      filter = options.filter,
      pagination = options.pagination;

  $(filter).click(function() {
    filterResults(this);
    loadPagination(this);
  });

  filterResults();
  loadPagination();

  function filterResults(clicked) {
    var filter = getFilterString(clicked);

    container.hide();
    container.children(target).hide();
    container.children(target + filter).show();

    container.show();
  }

  function getFilterString(clicked) {
    var filterString = '';

    if (typeof clicked != 'undefined') {
      filterString = $(clicked).data('filter');
    }

    return filterString;
  }

  function loadPagination(clicked) {
    var filter = getFilterString(clicked),
        items = container.children(target + filter),
        itemNumber = items.length,
        itemsPerPage = 6;

    items.slice(itemsPerPage).hide();

    $(pagination).pagination({
        items: itemNumber,
        itemsOnPage: itemsPerPage,
        prevText: '❮',
        nextText: '❯',
        onPageClick: function(pageNumber) {
          var showFrom = itemsPerPage * (pageNumber - 1);
          var showTo = showFrom + itemsPerPage;
          items.hide().slice(showFrom, showTo).show();
        }
    });

    container.show();
  }
}
