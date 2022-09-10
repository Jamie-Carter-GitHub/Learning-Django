var page=1; //keep track of page number for managaing which tasks are shown.

function populatePage(){
	if(page > 1){
		$(previousButton).prop('disabled', false)
	}
    var divs = ['#topLeftTask','#topRightTask','#botLeftTask','#botRightTask'];
	//wait for AJAX to finish
	$.when(getTasks()).done(function (tasks){

		$.each(tasks, function(index, task){
			if(index >= 4){
				$(nextButton).prop('disabled', false)
				return false;
			}
            var strResult="";
            strResult = strResult + 
            "<h3>" + task.taskname + "</h3>" +
            "<p>" + task.taskdesc + "</p>"
            console.log(divs[index]);
			console.log(task.taskname);
            console.log(task.taskdesc);
            $(divs[index]).html(strResult);
		});
		
	});
}

function getTasks()
{
	return $.ajax({
		url: '/todo/api/tasks',
		type: 'GET',
		cache: false,
		dataType: 'json',
	});
}

function previous()
{
	console.log("Previous");
	page--;
	$(previousButton).prop('disabled', true)
	populatePage();
}

function next()
{
	console.log("Next");
	page++;
	$(nextButton).prop('disabled', true)
	populatePage();
}