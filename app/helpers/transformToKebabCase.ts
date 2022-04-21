export default (str: string) => {
	let words = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
	words = words || []
	return words.map(x => x.toLowerCase()).join('-')
}