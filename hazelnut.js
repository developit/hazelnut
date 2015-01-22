(function(g) {
	var modules = {},
		factories = {};

	function require(id) {
		if (id.pop) id=id[0];
		var m = modules[id],
			e = m && m.exports;

		if (!m) {
			m = { id: id, exports:e={} };
			modules[id] = m.module = m;
			e = m.exports = factories[id].apply(m, factories[id].deps.map(m.require=function(id) {
				return m[id] || require(rel(id, m.id));
			})) || e;
		}

		return e;
	}
	(g.require = require).config = valueOf;

	function define(id, deps, factory) {
		(factories[id] = (typeof(factory = factory || deps)!=='function') ? function(){return factory;} : factory).deps = deps.pop ? deps : [];
	}
	(g.define = define).amd = {};

	function rel(name, path) {
		name = name.replace(/^(?:\.\/|(\.\.\/))/, path.replace(/[^\/]+$/g,'') + '$1');
		while ( name !== (name=name.replace(/[^\/]+\/\.\.\/?/g, '') ) );
		return name;
	}
})(this);
