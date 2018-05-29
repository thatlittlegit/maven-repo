const handlebars = require('jstransformer-handlebars');
const got = require('got');
const map = require('lodash.map');
const marked = require('marked');
const pAll = require('p-all');
const fs = require('pify')(require('fs'));

pAll([
	() => got('https://gh.thatlittlegit.tk/maven-repo/index'),
	() => fs.readFile(require('path').join(__dirname, '..', 'README.md'), 'utf-8'),
	() => fs.readFile('index.html', 'utf-8')
]).then(results => {
	let ret = {};
	results[0]	
		.body
		.split('\n')
		.map(x => x.split('\t'))
		.forEach((x) => {
			ret[x[1]] ? ret[x[1]].versions.push([x[0], x[1], x[2]]) : ret[x[1]] = {
				key: x[1],
				versions: [[x[0], x[1], x[2]]]
			};
		});
	delete ret[undefined];

	return [map(ret, x => {
		x.versions.reverse();
		return x;
	}), results[1], results[2]];
})
	.then(results => [results[0], marked(results[1]), results[2]])
	.then(results =>
		handlebars.compile(results[2], {
			helpers: {
				ifequal(conditional, options) {
					return options.hash.value == conditional ? options.fn(this) : options.inverse(this);
				},
				arrval: (conditional, options) => conditional[Number(options.hash.value)]
			}
		})({
			libs: results[0],
			documentation: results[1]
		})
	)
	.then(out => fs.writeFile(require('path').join(__dirname, '..', 'index.html'), out))
	.catch(console.error);