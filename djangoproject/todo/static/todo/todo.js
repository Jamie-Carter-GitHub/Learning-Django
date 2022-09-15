var page=0; //keep track of page number for managaing which tasks are shown.
var divs = ['#topLeftTask','#topRightTask','#botLeftTask','#botRightTask'];

function defaultPage(){
	for(i = 0; i < divs.length; i++){
		$(divs[i]).html("<h3>Tasks will show up here once more are added.</h3>");
	}
}

function populatePage(){
	if(page > 0){
		$(previousButton).prop('disabled', false)
	}
	//wait for AJAX to finish
	$.when(getTasks()).done(function (tasks){

		tasks = tasks.slice(page*4);
		$.each(tasks, function(index, task){
			if(index >= 4){
				$(nextButton).prop('disabled', false)
				return false;
			}
            var strResult="";
            strResult = strResult + 
            "<h3>" + task.taskname + "</h3>" +
            "<p>" + task.taskdesc + "</p>" +
			"<a><button onclick='updateTask(" + task.id + ")'>Update Task</button></a>" +
			"<a><button onclick='deleteTask(" + task.id + ")'>Delete Task</button></a>"
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

function getTask(id)
{
	return $.ajax({
		url: '/todo/api/tasks/'+id,
		type: 'GET',
		cache: false,
		dataType: 'json',
	});
}

function previous()
{
	page--;
	$(previousButton).prop('disabled', true)
	defaultPage();
	populatePage();
}

function next()
{
	page++;
	$(nextButton).prop('disabled', true)
	defaultPage();
	populatePage();
}

function updateTask(id)
{
	$.when(getTask(id)).done(function (task){
		console.log(task);
	});
}

function deleteTask(id)
{
	console.log(id);
}