<script>
	import { resize } from '../lib/index';
</script>

<table>
	<thead>
		<tr>
			<th use:resize={{ handlers: { right: true } }}> Column 1</th>
			<th use:resize={{ handlers: { right: true } }}> Column 2</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Content 1 1</td>
			<td>Content 1 2</td>
		</tr>
	</tbody>
</table>

<div class="flex">
	<div class="box" use:resize>Here be dragons</div>
	<div class="box" use:resize>Here be dragons</div>
</div>

<style>
	.box {
		width: 500px;
		height: 500px;
		background: grey;
	}
	.box:nth-child(1) {
		background: aqua;
	}

	.flex {
		margin: 1rem;
		display: flex;
	}

	table {
		margin: 1rem;
	}

	th {
		position: relative;
	}
</style>
