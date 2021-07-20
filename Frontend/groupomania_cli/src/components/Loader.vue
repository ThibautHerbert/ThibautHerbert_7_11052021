<template>
    <div class="loader" v-if="!isLoaded">
    	<img alt="Groupomania logo en blanc" src="../assets/Logos/icon-left-font-monochrome-white.svg">
		<div class="spinner"></div>
		<p>Chargement...</p>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                isLoaded: false
            }
        },
        /*
        mounted() {
            document.onreadystatechange = () => {
                if(document.readyState == "complete") {
                    this.isLoaded = true;
                }
            }
        }
        */
}
</script>

<style>
                                    /* Loading spinner */
.loader{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	background : #2c3e50;
	padding: 20px;
	border-radius: 20px;
	animation-name: loader;
	animation-duration: 3s;
	animation-timing-function: ease-out;
	animation-fill-mode: forwards;
	animation-iteration-count: 1;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	width: 100%;
	height: 100%;
    
}
.loader img {
    width: 100%;
    height: 100%;
}
.loader p {
    color: white;
}
@keyframes loader{
	0%{
		opacity: 1;
        z-index: 999;
	}
	90%{
		opacity: 1;
        z-index: 999;
	}
	100%{
		opacity: 0;
        z-index: -999;
	}
}
.spinner{
	width: 50px;
	height: 50px;
	background:#D1515A;
    border-radius: 50%;
	position: relative;
	animation: colormix 6s ease-out infinite;
}
@keyframes colormix{
	0%{
		opacity:1;
		transform: scale(1);
	}
	50%{
		opacity:.2;
		transform: scale(.5);
	}
	75%{
		opacity:.8;
	}
	100%{
		opacity:1;
		transform: scale(1);
	}
}
.spinner:before,
.spinner:after{
	content: '';
	display: block;
	border-radius: 50%;
	width: 50px;
	height: 50px;
}
.spinner:after{
	position: absolute;
	border: 4px solid transparent;
	border-top-color: #99e2d0;
	border-bottom-color: #99e2d0;
	top: 0;
    left:0;
	animation: spinny 2s linear infinite;
	}

.spinner:before{
    border-top-color: red;
	border-bottom-color: red;
}
@keyframes spinny{
	0%{
		transform:rotate(0deg) scale(1);
	}
	50% {
		transform:rotate(180deg) scale(1.2);
	}
	100% {
		transform:rotate(360deg)scale(1);
	}
}

</style>