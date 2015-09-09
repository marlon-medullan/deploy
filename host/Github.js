"use strict";

var GithubApi = require( 'github-api' );

class Github {

	constructor ( user, auth ) {

		if ( auth.token ) {
			this._api = new GithubApi( { auth: 'oauth', token: auth.token } );
		}
		else if ( auth.username && auth.password ) {
			this._api = new GithubApi( { auth: 'basic', username: auth.username, password: auth.password } );
		}
		else {
			throw new Error( 'GitHub authentication for ' + user + ' is missing.' );
		}
	}

	getRepos ( callback ) {
		this._api.getUser().repos( function ( err, repos ) {
			if ( repos ) {
				for ( var i = repos.length - 1; i >= 0; --i ) {
					repos[ i ] = repos[ i ].full_name;
				}
			}
			callback( err || null, repos );
		} );
	}

	getBranches ( repo, callback ) {
		throw new Error( 'TestMe' );
		repo = repo.splitFirst( 'repo' );
		this._api.getRepo( repo.left, repo.right ).listBranches( function ( err, branches ) {
			console.log( branches );
			callback( err || null, repos );
		} );
	}

}

Github.static( {

	HostName: 'github.com'

} );

module.exports = Github;