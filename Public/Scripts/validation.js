function checkSubmission() {
	var a = $("form[name='patientDetailsForm']").find("span:visible").length;
	if (a === 0) {
		alert("Form Submitted! Check Patient list now ")
	}
}




Array.prototype.next = function() {
	return this[this.current += 10];
};
Array.prototype.prev = function() {
	return this[this.current -=10];
};
Array.prototype.current = 0;

Array.prototype.range = function(start, end) {
	var foo = [];
	for (var i = start; i <= end; i++) {
		foo.push(i);
	}
	return foo;
}