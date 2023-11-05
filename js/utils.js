export const range = (begin, end=null, step=1) => {
	const out = [];
	if(end === null) {
		end = begin;
		begin = 0;
	}
	for(let i=begin; i<end; i+=step) out.push(i);
	return out;
};