var HTMLPreview = {



	content: '',



	previewform: document.getElementById('previewform'),



	file: function() {

		return location.search.substring(1); //Get everything after the ?

	},



	raw: function() {

		return HTMLPreview.file().replace(/\/\/github\.com/, '//raw.githubusercontent.com').replace(/\/blob\//, '/'); //Get URL of the raw file

	},



	replaceAssets: function() {

		var frame, a, link, script, i, href, src;

		frame = document.querySelectorAll('iframe[src],frame[src]');

		for(i = 0; i < frame.length; ++i) {

			src = frame[i].src; //Get absolute URL

			if(src.indexOf('//raw.githubusercontent.com') > 0 || src.indexOf('//bitbucket.org') > 0) { //Check if it's from raw.github.com or bitbucket.org

				frame[i].src = '//' + location.hostname + location.pathname + '?' + src; //Then rewrite URL so it can be loaded using YQL

			}

		}

		a = document.querySelectorAll('a[href]');

		for(i = 0; i < a.length; ++i) {

			href = a[i].href; //Get absolute URL

			if(href.indexOf('#') > 0) { //Check if it's an anchor

				a[i].href = '//' + location.hostname + location.pathname + location.search + '#' + a[i].hash.substring(1); //Then rewrite URL with support for empty anchor

			}

			else if((href.indexOf('//raw.githubusercontent.com') > 0 || href.indexOf('//bitbucket.org') > 0) && (href.indexOf('.html') > 0 || href.indexOf('.htm') > 0)) { //Check if it's from raw.github.com or bitbucket.org and to HTML files

				a[i].href = '//' + location.hostname + location.pathname + '?' + href; //Then rewrite URL so it can be loaded using YQL

			}

		}

		if(document.querySelectorAll('frameset').length)

			return; //Don't replace CSS/JS if it's a frameset, because it will be erased by document.write()

		link = document.querySelectorAll('link[rel=stylesheet]');

		for(i = 0; i < link.length; ++i) {

			href = link[i].href; //Get absolute URL

			if(href.indexOf('//raw.githubusercontent.com') > 0 || href.indexOf('//bitbucket.org') > 0) { //Check if it's from raw.github.com or bitbucket.org

				HTMLPreview.send(href, 'loadCSS'); //Then load it using YQL

			}

		}
