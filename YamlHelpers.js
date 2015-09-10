"use strict";

var Yaml = require( 'js-yaml' );
var YamlCmd = require( './yamltypes/Cmd' );
var YamlIfFile = require( './yamltypes/IfFile' );
var DeferredYaml = require( './yamltypes/Deferred' );
var Fs = require( 'fs' );

Yaml.DEPLOY_SCHEMA = Yaml.Schema.create( Yaml.DEFAULT_FULL_SCHEMA, [ YamlCmd, YamlIfFile ] );

global.yaml = function ( yaml, vars ) {
	if ( yaml instanceof DeferredYaml ) {
		return yaml.resolve( vars );
	}

	return yaml;
}

global.LoadYaml = function ( file ) {
	var config = Fs.readFileSync( file, 'utf8' );
	return Yaml.load( config, { filename: file, schema: Yaml.DEPLOY_SCHEMA } );
}