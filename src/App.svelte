<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import Navbar from "./components/Navbar.svelte";
    import About from "./routes/About.svelte";
    import Home from "./routes/Home.svelte";
    import Privacy from "./routes/Privacy.svelte";
    import Register from "./routes/Register.svelte";
    import Station from "./routes/Station.svelte";
    import { getParam } from "./services/Utils";
</script>

<Router>
    <Navbar />

    <main>
        <Route path="/" component={Home} />
        <Route path="register" component={Register} />
        <Route path="privacy" component={Privacy} />
        <Route path="about" component={About} />
        <Route path="station" let:location>
            <Station token={getParam("token", location.search) ?? ""} />
        </Route>

        <Route>
            <h3>Default</h3>
            <p>No Route could be matched.</p>
        </Route>
    </main>

    <footer>
        <p>Dewaeq 2022</p>
    </footer>
</Router>
