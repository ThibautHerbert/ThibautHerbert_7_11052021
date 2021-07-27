<script>

export default {
    name: 'Footer'
}
</script>

<template>
    <footer class="card text-center">
        <div class="card-header">
            A propos
        </div>
        <div class="card-body bg-footer">
            <h5 class="card-title">Un réseau social dédié aux équipes Groupomania</h5>
            <p class="card-text">Pour que nos équipes se connectent plus facilement.</p>
            <img alt="Groupomania logo en blanc" src="../assets/Logos/icon-left-font-monochrome-white.svg">
            <nav class="navbar navbar-expand justify-content-center bg-">  
                <a href="/home" class="nav-link"> Accueil</a>
                <a href="/posts" class="nav-link"> Derniers posts</a>
                <a href="/contact" class="nav-link"> Conditions générales</a>
            </nav>
        </div>
        <div class="card-footer text-muted">
            For Groupomania Group
        </div>
    </footer>
</template>


<style scoped>
.bg-footer{
    background : #2c3e50;
}
.card-body h5,
.card-body p{
    color: white;
}
img{
    max-width: 200px;
}
nav a{
    color: #88BA8E;
}
</style>