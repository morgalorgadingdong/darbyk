<script>
    export let type
    export let url

</script>



<a href="{url}">
    <button class="btn {type}" >
        <slot></slot>
    </button>
</a>



<style>
    .btn {
        border-radius: 10px;
        min-width: 100px;
        font-family: var(--font-header);
        text-transform: uppercase;
    }

    .btn.primary {
        background-color: var(--color-primary);
        color: var(--color-text);
    }

    .btn.primary:hover {
        background-color: var(--color-secondary);
    }

    .btn.secondary {
        background-color: var(--color-secondary);
        color: var(--color-text);
    }

    .btn.secondary:hover {
        background-color: var(--color-primary);
    }

    .btn.transparent {
        background-color: transparent;
        color: var(--color-text);
    }

    button {
        background-color: var(--color-primary);
        color: var(--color-light);
        border: none;
        padding: 8px 16px 5px 16px;
        height: fit-content;
    }
    
</style>