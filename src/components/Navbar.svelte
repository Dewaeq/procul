<script lang="ts">
    import { link } from "svelte-navigator";
</script>

<header>
    <div class="navbar">
        <nav>
            <a href="/" use:link>Home</a>
        </nav>
        <nav>
            <a href="/register" use:link>Register</a>
            <a href="/about" use:link>About</a>
            <a href="/privacy" use:link>Privacy</a>
        </nav>
    </div>
</header>

<style>
    .navbar {
        color: white;
        background-color: #21252b;
        width: 100vw;
        height: 6vh;
        display: flex;
        justify-content: space-between;
        place-items: center;
    }

    .navbar > nav {
        padding: 0 4em;
        display: flex;
        column-gap: 3em;
    }

    a {
        color: white;
        text-decoration: none;
        font-weight: bolder;
        font-size: 22px;
    }
</style>
