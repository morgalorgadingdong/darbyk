<script>
    export let user;
    export let feedback;
</script>

<div>
    <h2>Latest Feedback</h2>
    {#if feedback}
        <ul>
            {#each feedback as item}
                <li>
                    <a href="/feedback/{item.id}">
                        {item.text}
                    </a>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No feedback yet.</p>
    {/if}
</div>

