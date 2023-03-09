<script>
	import { resize } from '../lib/index';
</script>

<div
	style="background-color:grey"
	use:resize={{
		borderStyle: '5px solid red',
		handlers: { top: true, right: true, bottom: true, left: true }
	}}
>
	Here be dragons
</div>

<style>
	div {
		height: 100px;
		width: 100px;
		left: 50px;
		right: 50px;
	}
</style>
