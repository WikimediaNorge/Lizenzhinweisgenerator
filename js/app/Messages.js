'use strict';

var Polyglot = require( 'node-polyglot' ),
	i18n;

var getParam = function getUrlParameter( sParam ) {
	var sPageURL = decodeURIComponent( window.location.search.substring( 1 ) ),
		sURLVariables = sPageURL.split( '&' ),
		sParameterName,
		i;

	for( i = 0; i < sURLVariables.length; i++ ) {
		sParameterName = sURLVariables[i].split( '=' );

		if( sParameterName[0] === sParam ) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

var lang = getParam( 'lang' );
if( lang === undefined ) {
	lang = 'de';
}

try {
	i18n = require( '../../i18n/' + lang + '.json' );
} catch( e ) {
	i18n = require( '../../i18n/de.json' );
}

module.exports = new Polyglot( { phrases: i18n } );
