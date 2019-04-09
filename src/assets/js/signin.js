function addTeamRow() {
	const id = 1;
	let html = '';
	html += '<div class="form-group">';
	html += '	<div class="input-group mb-3">';
	html += '		<div class="input-group-prepend">';
	html += `			<span class="input-group-text" id="basic-addon${id}">`;
	html += '				<i class="fas fa-user-friends"></i>';
	html += '			</span>';
	html += '		</div>';
	html += `		<input type="text" class="form-control" placeholder="Équipe ${id}" aria-label="team${id}" aria-describedby="basic-addon${id}">`;
	html += '	</div>';
	html += '</div>';
	$('#signin > .dynamic-content').html(html);
}