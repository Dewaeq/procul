<script>
    import InteractiveMap from "../components/InteractiveMap.svelte";
</script>

<header>
    <h1>Home</h1>
</header>

<main>
    <form action="/station">
        <label for="token">Search station: </label>
        <input name="token" type="text" />
        <br />
        <button type="submit">Search</button>
    </form>

    <InteractiveMap />
</main>
