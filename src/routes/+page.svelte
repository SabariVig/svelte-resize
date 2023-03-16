<script>
	import { resize } from '../lib/index';
</script>

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
	.flex {
		display: flex;
	}
</style>
