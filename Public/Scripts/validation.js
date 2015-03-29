function checkSubmission() {
	var a = $("form[name='patientDetailsForm']").find("span:visible").length;
	if (a === 0) {
		alert("Form Submitted! Check Patient list now ")
	}
}