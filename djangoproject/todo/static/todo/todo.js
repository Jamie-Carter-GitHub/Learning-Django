function populatePage(){
    var divs = ['#topLeftTask','#topRightTask','#botLeftTask','#botRightTask'];
	//wait for AJAX to finish
	$.when(getTasks()).done(function (tasks){

		$.each(tasks, function(index, task){
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

function test()
{
    console.log("loaded");
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