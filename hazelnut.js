(function(g) {
	var modules = {},
		factories = {};

	function makeRequireFn(relId, module) {
		return function requireFn(id) {
			return id==='exports' ? module.exports : (id==='module' ? module : (id==='require' ? requireFn : require(rel(id, relId))));
		};
	}

	function require(id) {
		if (id.pop) id=id[0];
		var m = modules[id];
		if (!(id in factories)) throw Error(id + ' not defined');

		if (!m) {
			m = { id: id, exports: {} };
			modules[id] = m;
			var requireFn = makeRequireFn(id, m);
			m.exports = factories[id].apply(m, factories[id].deps.map(requireFn)) || m.exports;
		}

		return m.exports;
	}
	g.require = require;
	require.config = valueOf;
	//require.modules = modules;
	//require.factories = factories;

	function define(id, deps, factory) {
		if (id in factories) throw new Error(id + ' already defined');
		if (!factory)
			(factory = deps).deps = [];
		else
			factory.deps = deps;
		factories[id] = factory;
	}
	define.amd = true;
	g.define = define;

	function rel(name, path) {
		name = name.replace(/^(?:\.\/|(\.\.\/))/, path.replace(/[^\/]+$/g,'') + '$1');
		while ( name !== (name=name.replace(/[^\/]+\/\.\.\/?/g, '') ) );
		return name;
	}
})(this);
