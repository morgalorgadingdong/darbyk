<script>
    export let type
    export let url
    export let submitType

</script>



<a href="{url}">
    <button class={type} type={submitType}>
        <slot></slot>
    </button>
</a>



<style>
    button {
        background-color: var(--color-primary);
        border: none;
        /* padding: 8px 16px 5px 16px !important; */
        height: fit-content;
        border-radius: 10px;
        min-width: 100px;
        font-family: var(--font-header);
        text-transform: uppercase;
        padding: 10px 40px;
    }

    .button:hover {
        box-shadow: 2px 2px 0 2px #000;
    }

    .primary {
        background-color: var(--color-primary);
        color: var(--color-text);
    }

    .secondary {
        background-color: var(--color-secondary);
        color: var(--color-text);
    }

    .tertiary {
        background-color: rgba(0,0,0,0);
        color: var(--color-text);
    }

    .primary-small {
        background-color: var(--color-primary);
        color: var(--color-text);
        font-size: 14px;
    }

    .secondary-small {
        background-color: var(--color-secondary);
        color: var(--color-text);
    }

    .tertiary-small {
        background-color: rgba(0,0,0,0);
        color: var(--color-text);
    }

    .addToCart {
        background-color: var(--color-primary);
        border-radius: 10px;
        padding: 8px 16px 5px 16px;
        border: 1px solid var(--color-primary);
        transition: all 0.3s ease-in-out;
        font-size: 14px;
    }

    @media (max-width: 768px) {
        button {
            font-size: 14px;
            padding: 8px 16px 5px 16px;
            border-radius: 10px;
        }
    }

</style>