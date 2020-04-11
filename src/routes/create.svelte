<script>
  function handleSubmit() {
    // send jam to db
    // generate id for jam
    // return id from server
    // navigate to `jams/id`
    console.log("submitting form");
  }
</script>

<style>
  .sexyform {
    font-size: 16pt;
    width: 60%;
    border: 1px solid #ccc;
    padding: 2vmin;
    border-radius: 1vmin;
  }
  .sexyform input {
    font-size: 14pt;
    padding: 2vmin;
    border-radius: 2vmin;
    font-family: "Roboto", sans-serif;
    color: #555;
    letter-spacing: 0.05em;
  }
  .sexyform textarea {
    font-size: 14pt;
    width: 100%;
    padding: 2vmin;
    border-radius: 1vmin;
    font-family: "Roboto", sans-serif;
    color: #555;
    letter-spacing: 0.05em;
  }
  .sexyform button {
    border-radius: 1vmin;
    padding: 1vmin;
  }
</style>

<svelte:head>
  <title>One Hour Beats - Create Jam</title>
</svelte:head>

<h1>Create Jam!</h1>

<p>Make your very own jam here!</p>

<form on:submit|preventDefault={handleSubmit} class="sexyform">
  <div>
    <label>
      Name of Jam:
      <input />
    </label>
  </div>
  <div>
    <label>Outline of the rules of the jam:</label>
  </div>
  <textarea />
  <div>
    <button type="submit">Create!</button>
  </div>
</form>
