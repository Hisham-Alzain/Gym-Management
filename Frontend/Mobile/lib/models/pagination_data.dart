class PaginationData {
  final int? from;
  final int? to;
  final int total;
  final int firstPage;
  final int currentPage;
  final int lastPage;
  final bool hasMorePages;
  final List<int> pageNumbers;
  final String firstPageUrl;
  final String currentPageUrl;
  final String lastPageUrl;
  final String? nextPage;
  final String? prevPage;
  final String path;

  PaginationData({
    this.from,
    this.to,
    required this.total,
    required this.firstPage,
    required this.currentPage,
    required this.lastPage,
    required this.hasMorePages,
    required this.pageNumbers,
    required this.firstPageUrl,
    required this.currentPageUrl,
    required this.lastPageUrl,
    this.nextPage,
    this.prevPage,
    required this.path,
  });

  PaginationData.fromJson(Map<String, dynamic> json)
      : from = json['from'] != null ? json['from'] as int : 0,
        to = json['to'] != null ? json['to'] as int : 0,
        total = json['total'] as int,
        firstPage = json['first_page'] as int,
        currentPage = json['current_page'] as int,
        lastPage = json['last_page'] as int,
        hasMorePages = json['has_more_pages'] as bool,
        pageNumbers = [
          for (var pageNumber in json['pageNumbers']) (pageNumber),
        ],
        firstPageUrl = json['first_page_url'] as String,
        currentPageUrl = json['current_page_url'] as String,
        lastPageUrl = json['last_page_url'] as String,
        nextPage =
            json['next_page'] != null ? json['next_page'] as String : null,
        prevPage =
            json['prev_page'] != null ? json['prev_page'] as String : null,
        path = json['path'] as String;

  PaginationData.empty()
      : from = 0,
        to = 0,
        total = 0,
        firstPage = 0,
        currentPage = 0,
        lastPage = 0,
        hasMorePages = false,
        pageNumbers = [],
        firstPageUrl = '',
        currentPageUrl = '',
        lastPageUrl = '',
        nextPage = '',
        prevPage = '',
        path = '';
}
