<script>
    // read a file from the file system called "full_model.json"
    // and parse it as JSON
    import head from '../full_model.json';
    // import the page component

    let choices = [];
    let tree_depth = 0;

    let model = head;

    function updateChoice(index) {
        choices[tree_depth] = index;
        model = model.children[index];
        updateTreeDepth("add");
    }

    function updateTreeDepth(operation) {
        if (operation == "add") {
            tree_depth++;
        } else if (operation == "sub" && tree_depth > 0) {
            tree_depth--;
        }
        goToDepth(tree_depth);
    }


    function goToDepth(depth) {
        tree_depth = depth;
        model = head;
        for (let i = 0; i < depth; i++) {
            model = model.children[choices[i]];
        }
    }

</script>

{#if model.question}
<h1>
    Q : {model.question}
</h1>
{/if}

<!-- if there is a value display it -->
{#if model.value}
    <h1>
        Your property is worth : {model.value}
    </h1>
{/if}

<div class="container">
    {#if model.image}
    <img src={model.image} alt="image" />
{/if}
</div>

<div class="container">


{#each model.options as option, index}
    <!-- take only the first index of the option array -->
    <button on:click={() => updateChoice(index)}>
        {option[0]}
    </button>

{/each}

</div>

<div class="container">

<button class="special-button" on:click={() => updateTreeDepth("sub")} >
    Previous question
</button>

{#if model.value}
    <button class="special-button" on:click={() => goToDepth(0)}>
        Start again
    </button>
{/if}
</div>

<!-- from the depth and choice show that to the user -->




<div class="img-container">
    <!-- <img src="tree.svg" alt="tree" /> -->
</div>


<style>
    .container {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        display: flex;
    }
    
    /* put buttons next to eachother */
    button {
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid black;
        background-color: white;
        cursor: pointer;
        display: inline-block;
    }

    button:hover {
        background-color: #f1f1f1;
    }

    button:active {
        background-color: #e1e1e1;
    }

    button:focus {
        outline: none;
    }

    h1 {
        text-align: center;
    }

    p {
        text-align: center;
    }

    img {
        width: 600;
        height: 600;
    }

    .special-button {
        background-color: #4ca2af;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .special-button:hover {
        background-color: #4ca2af;
        color: white;
    }
    

</style>