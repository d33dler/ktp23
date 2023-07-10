<script>
    // read a file from the file system called "full_model.json"
    // and parse it as JSON
    import head from '../full_model.json';
    import axios from 'axios';
    // import the page component

    let choices = [];
    let tree_depth = 0;

    let model = head;
    
    let form = {};

    function updateChoice(index, option) {
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

    let final_price = -1;

    function goToDepth(depth) {
        final_price = -1;
        tree_depth = depth;
        model = head;
        for (let i = 0; i < depth; i++) {
            model = model.children[choices[i]];
        }
    }


    function sendRequest(form) {
        axios.post('http://localhost:8000/', {
            "idx": choices,
            'extra' : {
                'dist_to_center': parseInt(document.getElementById('dist_to_center').value),
                'num_floors': parseInt(document.getElementById('num_floors').value),
                'num_rooms': parseInt(document.getElementById('num_rooms').value),
                'area_m2': parseInt(document.getElementById('area_m2').value),
                'bathroom': parseInt(document.getElementById('bathroom').value)
            }
        })
        .then(function (response) {
            form = response.data;
            final_price = form['message']
            final_price = Math.round(final_price * 100) / 100
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

</script>

{#if model.question}
<h1>
    Question #{tree_depth + 1}
    <br/><br/>
    {model.question}
</h1>
{/if}

{#if final_price != -1} 
    <h1>
        The price of the property is {final_price} euros.
    </h1>
{:else if model.value}
    <!-- extra questions -->
    
    <h1>Last necessary questions!</h1>
    <br/><br/>

    <!-- dist_to_center-->
    <form on:submit|preventDefault={sendRequest}>
    
    <h1>
        How far is the property from the city center?
    </h1>
    <div class='container'>
    <input type="number" id="dist_to_center" name="dist_to_center" min="0" max="100" step="1" value="0">
    m
    </div>
    <br/><br/>

    <!--     num_floors -->
    <h1>
        How many floors does the property have?
    </h1>

    <div class='container'>
    <input type="number" id="num_floors" name="num_floors" min="0" max="10" step="1" value="0">
    </div>

    <br/><br/>

    <!-- num_rooms -->

    <h1>
        How many rooms does the property have?
    </h1>

    <div class='container'>
    <input type="number" id="num_rooms" name="num_rooms" min="0" max="10" step="1" value="0">
    </div>

    <br/><br/>


    <!-- area_m2 -->
    <h1>
        What is the area of the property in square meters?
    </h1>

    <div class='container'>
    <input type="number" id="area_m2" name="area_m2" min="0" max="1000" step="1" value="0">
    m<sup>2</sup>
    </div>

    <br/><br/>

    <!-- bathroom  -->
    <h1>
        How many bathrooms does the property have?
    </h1>

    <div class='container'>
    <input type="number" id="bathroom" name="bathroom" min="0" max="10" step="1" value="0">
    </div>

    <br/><br/>
    
    <div class='container'>
    <button class='special-button' type="submit">Submit</button>
    </div>

    </form>
{/if}

<div class="container">
{#if model.image}
    <img src={model.image} alt="image" />
{/if}
</div>

<div class="container">


{#each model.options as option, index}
    <!-- take only the first index of the option array -->
    <button on:click={() => updateChoice(index, option)}>
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
