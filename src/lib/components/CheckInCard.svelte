<script>
    export let title
    export let date
    export let status
    </script>

    <div class="col-12 d-flex justify-content-center flex-wrap {status}">
        <h5 class="col-12 text-center">{title}</h5>
        <p class="col-12 text-center">{date}</p>
    </div>

    <style>
        .col-12 {
            padding: 10px;
            border-radius: 25px;
        }
        .col-12.active {
            background-color: var(--color-primary);
        }

        .col-12.inactive
        {
            background-color: var(--color-secondary);
        }
        
    </style>
