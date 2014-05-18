var runQuery = function(queryString){
	var query = queryString;
	var corpus = 17;
	var startYear = 1800;
	var endYear = 2008;
	var smoothing = 3;
	var caseSensitive = false;
	var params = {
		content: query,
		year_start: startYear,
		year_end:endYear,
		corpus: corpus,
		smoothing: smoothing,
		case_insensitive: caseSensitive
	};
	var script_id = null;
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', "https://books.google.com/ngrams/graph?content=china&year_start=1800&year_end=2008&corpus=17&smoothing=3&case_insensitive=false&direct_url=t4%3B%2Cchina%3B%2Cc0%3B%2Cs0%3B%3BChina%3B%2Cc0%3B%3Bchina%3B%2Cc0%3B%3BCHINA%3B%2Cc0");

	return $.get(
		"http://books.google.com/ngrams/graph",
		params,
		function(data){
			return data;
		},
		"html");
};