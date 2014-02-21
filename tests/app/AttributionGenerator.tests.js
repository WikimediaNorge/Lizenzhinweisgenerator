( function( define ) {

define(
	['qunit', 'jquery', 'AttributionGenerator', 'tests/assets'],
	function( QUnit, $, AttributionGenerator, testAssets ) {

QUnit.module( 'AttributionGenerator' );

var testCases = {
	'LRO_Tycho_Central_Peak.jpg': [{
		expected: {
			raw: null,
			text: null,
			html: null
		}
	}],
	'Helene Fischer 2010.jpg': [{
		expected: {
			raw: $( document.createTextNode( 'Fleyx24 (http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg), „Helene Fischer 2010“, http://creativecommons.org/licenses/by-sa/3.0/legalcode/' ) ),
			text: $( '<div class="attribution"><span class="attribution-author">Fleyx24</span> <span class="attribution-url">(http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg)</span>, <span class="attribution-title">„Helene Fischer 2010“</span>, <span class="attribution-licence">http://creativecommons.org/licenses/by-sa/3.0/legalcode/</span></div>' ),
			html: $( '<div class="attribution"><span class="attribution-author"><a href="http://commons.wikimedia.org/wiki/User:Fleyx24">Fleyx24</a></span>, <span class="attribution-title"><a href="http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg">„Helene Fischer 2010“</a></span>, <span class="attribution-licence"><a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode/">CC BY-SA 3.0</a></span></div>' )
		}
	}, {
		options: { editor: 'edited by Editor' },
		expected: {
			raw: $( document.createTextNode( 'Fleyx24 (http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg), „Helene Fischer 2010“ edited by Editor, http://creativecommons.org/licenses/by-sa/3.0/legalcode/' ) ),
			text: $( '<div class="attribution"><span class="attribution-author">Fleyx24</span> <span class="attribution-url">(http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg)</span>, <span class="attribution-title">„Helene Fischer 2010“</span> <span class="attribution-editor">edited by Editor</span>, <span class="attribution-licence">http://creativecommons.org/licenses/by-sa/3.0/legalcode/</span></div>' ),
			html: $( '<div class="attribution"><span class="attribution-author"><a href="http://commons.wikimedia.org/wiki/User:Fleyx24">Fleyx24</a></span>, <span class="attribution-title"><a href="http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg">„Helene Fischer 2010“</a></span> <span class="attribution-editor">edited by Editor</span>, <span class="attribution-licence"><a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode/">CC BY-SA 3.0</a></span></div>' )
		}
	}, {
		options: { licenceOnly: true },
		expected: {
			raw: $( document.createTextNode( 'http://creativecommons.org/licenses/by-sa/3.0/legalcode/' ) ),
			text: $( '<div class="attribution"><span class="attribution-licence">http://creativecommons.org/licenses/by-sa/3.0/legalcode/</span></div>' ),
			html: $( '<div class="attribution"><span class="attribution-licence"><a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode/">CC BY-SA 3.0</a></span></div>' )
		}
	}, {
		options: { licenceLink: false },
		expected: {
			raw: $( document.createTextNode( 'Fleyx24 (http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg), „Helene Fischer 2010“, CC BY-SA 3.0' ) ),
			text: $( '<div class="attribution"><span class="attribution-author">Fleyx24</span> <span class="attribution-url">(http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg)</span>, <span class="attribution-title">„Helene Fischer 2010“</span>, <span class="attribution-licence">CC BY-SA 3.0</span></div>' ),
			html: $( '<div class="attribution"><span class="attribution-author"><a href="http://commons.wikimedia.org/wiki/User:Fleyx24">Fleyx24</a></span>, <span class="attribution-title"><a href="http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg">„Helene Fischer 2010“</a></span>, <span class="attribution-licence">CC BY-SA 3.0</span></div>' )
		}
	}, {
		options: { editor: 'edited by Editor', licenceOnly: true },
		expected: {
			raw: $( document.createTextNode( 'http://creativecommons.org/licenses/by-sa/3.0/legalcode/' ) ),
			text: $( '<div class="attribution"><span class="attribution-licence">http://creativecommons.org/licenses/by-sa/3.0/legalcode/</span></div>' ),
			html: $( '<div class="attribution"><span class="attribution-licence"><a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode/">CC BY-SA 3.0</a></span></div>' )
		}
	}, {
		options: { editor: 'edited by Editor', licenceLink: false },
		expected: {
			raw: $( document.createTextNode( 'Fleyx24 (http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg), „Helene Fischer 2010“ edited by Editor, CC BY-SA 3.0' ) ),
			text: $( '<div class="attribution"><span class="attribution-author">Fleyx24</span> <span class="attribution-url">(http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg)</span>, <span class="attribution-title">„Helene Fischer 2010“</span> <span class="attribution-editor">edited by Editor</span>, <span class="attribution-licence">CC BY-SA 3.0</span></div>' ),
			html: $( '<div class="attribution"><span class="attribution-author"><a href="http://commons.wikimedia.org/wiki/User:Fleyx24">Fleyx24</a></span>, <span class="attribution-title"><a href="http://commons.wikimedia.org/wiki/File:Helene Fischer 2010.jpg">„Helene Fischer 2010“</a></span> <span class="attribution-editor">edited by Editor</span>, <span class="attribution-licence">CC BY-SA 3.0</span></div>' )
		}
	}, {
		options: { licenceOnly: true, licenceLink: false },
		expected: {
			raw: $( document.createTextNode( 'CC BY-SA 3.0' ) ),
			text: $( '<div class="attribution"><span class="attribution-licence">CC BY-SA 3.0</span></div>' ),
			html: $( '<div class="attribution"><span class="attribution-licence">CC BY-SA 3.0</span></div>' )
		}
	}],
	'Statue Andrrea Palladio Vicenza.jpg': [{
		expected: {
			raw: null,
			text: null,
			html: null
		}
	}]
};

QUnit.test( 'generate()', function( assert ) {

	$.each( testCases, function( filename, testCases ) {
		var asset = testAssets[filename];

		$.each( testCases, function( i, testCase ) {
			var options = $.extend( {}, testCase.options || {} );

			$.each( testCase.expected, function( mode, $expected ) {
				var attributionGenerator = new AttributionGenerator( asset, $.extend( options, {
					format: mode === 'html' ? 'html' : 'text'
				} ) );

				var $attribution = attributionGenerator.generate( mode ),
					actualHtml = $( '<div/>' ).append( $attribution ).html(),
					expectedHtml = $( '<div/>' ).append( $expected ).html();

				assert.equal(
					actualHtml,
					expectedHtml,
					'(' + asset.getTitle() + ') Actual result matches expected (' + mode
						+ ').'
				);

			} );
		} );
	} );

} );

} );

}( define ) );
