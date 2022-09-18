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
			"<a><button onclick='updateTask(" + task.id + ", " + index +")'>Update Task</button></a>" +
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
	reset();
}

function next()
{
	page++;
	$(nextButton).prop('disabled', true)
	reset();
}

function reset()
{
	defaultPage();
	populatePage();
}

function updateTask(id, div)
{
	$.when(getTask(id)).done(function (task){
		var form="";
		form = form +
		"<div class='container'>" +
		"<h1>Update Task</h1>" +
		"Task Name:<br>" +
		"<textarea rows='2' id='newname" + div +"'>" + task.taskname +"</textarea>" +
		"<br><br>" +
		"Task Description:<br>" +
		"<textarea rows='8' id='newdesc" + div +"'>" + task.taskdesc +"</textarea>" +
		"<br><br>" +
		"<a><button onclick='performUpdate(" + div + ", " + id +")'>Update</button></a>" +
		"<a><button onclick='reset()'>Cancel</button></a>" +
		"<br><br>" +
		"</div>";
		$(divs[div]).html(form);
	});
}

function performUpdate(div, taskId)
{
	//store the information in a JSON object to send accross.
	var name = $("#newname" + div).val();
	var desc = $("#newdesc" + div).val();
	var task = {
		id:taskId,
		taskname:name,
		taskdesc:desc
	};
	
	$.ajax({
		url: '/todo/api/tasks/update',
		type: 'PUT',
		data: JSON.stringify(task),
		contentType: "application/json;charset=utf-8",
		success: function (data) {
			alert("Update Successful!");
			reset();
		},
		error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });

}

function deleteTask(id)
{
	$.ajax({
		url: '/todo/api/tasks/delete/'+id,
		type: 'DELETE',
		cache: false,
		dataType: 'text',
		success: function () {
			alert("Task Deleted!");
			reset();
		},
		error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
	});
}