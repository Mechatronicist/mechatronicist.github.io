<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<style>
* {
	font-family: Roboto, Arial, sans-serif;
}

body {
	color: white;

	background-color: #101010;
	
	background-image: url('/background.jpeg');
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;

	overflow-x: hidden;
	margin: 0;
}

a {
	text-decoration: none;
	color: white;
}

.box {
	border: 1px solid #20202084;
	border-radius: 5px;

	padding: 1rem;

	background-color: #15151571;
	backdrop-filter: blur(5px);
}

.card {
	flex: 1;

	display: flex;
    flex-direction: column;

    gap: 0.5rem;

    border: 1px solid #202020;
    border-radius: 5px;

    background-color: #19191994;

    padding: 1rem;
	min-width: 200px;

	box-shadow: rgb(14, 14, 14) 1px 1px 10px;
	backdrop-filter: blur(5px);
}

.flex {
	display: flex;
}
.row {
	flex-direction: row;
}
.col {
	flex-direction: column;
}
.gap-05 {
	gap: 0.5rem;
}
.gap-1 {
	gap: 1rem;
}
.center-align {
	align-items: center;
}
.center-justify {
	justify-content: center;
}
.center {
	align-items: center;
	justify-content: center;
}
</style>
