<script>
    export let title
    export let date
    export let status
    </script>

    <div class="col-12 {status}">
        <h2>{title}</h2>
        <p>{date}</p>
    </div>

    <style>
        .col-12 {
            padding: 10px;
            background-color: #B8BFB6;
            border-radius: 25px;
        }
        .col-12.active {
            background-color: var(--color-primary);
        }
        
    </style>
