var require, define;
(function() {
	var modules = {},
		factories = {};

	(require = function(id) {
		if (id.pop) id=id[0];
		var m = modules[id];

		if (!m) {
			m = { id: id, exports:{} };
			modules[id] = m.module = m;
			m.exports = factories[id].apply(m, factories[id].deps.map(m.require=function(id) {
				return m[id] || require(rel(id, m.id));
			})) || m.exports;
		}

		return m.exports;
	}).config = valueOf;

	(define = function(id, deps, factory) {
		(factories[id] = (typeof(factory = factory || deps)!=='function') ? function(){return factory;} : factory).deps = deps.pop ? deps : [];
	}).amd = {};

	function rel(name, path) {
		name = name.replace(/^(?:\.\/|(\.\.\/))/, path.replace(/[^\/]+$/g,'') + '$1');
		while ( name !== (name=name.replace(/[^\/]+\/\.\.\/?/g, '') ) );
		return name;
	}
})();
