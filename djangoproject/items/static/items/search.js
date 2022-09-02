function searchTable()
{
	//set up variables and link to html elements
	var input;
	var filter;
	var table;
	var	tr;
	var td;
	var	i;
	var	txtValue;
	input = document.getElementById("itemInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("itemsTable");
	tr = table.getElementsByTagName("tr");
	
	
    // Hide all rows that do not match the filter
    for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[1];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			}
			else{
				tr[i].style.display = "none";
			}
		}
	}
	
}