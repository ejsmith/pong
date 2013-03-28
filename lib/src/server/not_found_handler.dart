part of pong_server;

class NotFoundHandler {
  List<int> _notFoundPage;
  static final String notFoundPageHtml = """
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
</body></html>""";
  void onRequest(HttpRequest req, HttpResponse res){

    if (_notFoundPage == null)
      _notFoundPage = notFoundPageHtml.codeUnits;
    
    res.statusCode = HttpStatus.NOT_FOUND;
    res.headers.set("Content-Type", "text/html; charset=UTF-8");
    res.contentLength = _notFoundPage.length;
    res.write(_notFoundPage);
    res.close();
  }
}