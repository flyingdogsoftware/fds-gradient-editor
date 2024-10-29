<svelte:options tag="fds-gradient-editor" />

<script>
  import { writable } from 'svelte/store';
  import {  onMount } from 'svelte'; // Correct import for Svelte
  import {get_current_component} from 'svelte/internal'
  let host = get_current_component()
  const gradient = writable([]);

  export let value = "";


  function refresh() {
    const stops = value.split("\n").map((line) => {
        const [position, rgb] = line.split(":");
        const [r, g, b] = rgb.split(",").map(Number);
        const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
          .toString(16)
          .slice(1)}`;
        return { position: parseFloat(position), color: hexColor };
      });
      gradient.set(stops);
  }

 $: if (value) { refresh()  }
  function updateGradient() {
    gradient.update((stops) => {
      const updatedValue = stops
        .map((stop) => `${stop.position}:${parseInt(stop.color.slice(1, 3), 16)},${parseInt(stop.color.slice(3, 5), 16)},${parseInt(stop.color.slice(5, 7), 16)}`)
        .join("\n"); 
        value=updatedValue
        host.dispatchEvent(new CustomEvent('change', {detail: {value:updatedValue}}))
      return stops;
    });
  }

  function addStop() {
    gradient.update((stops) => {
      stops.push({ position: 50, color: "#000000" });
      return stops;
    });
    updateGradient();
  }

  function removeStop(index) {
    gradient.update((stops) => {
      stops.splice(index, 1);
      return stops;
    });
    updateGradient();
  }

  function changeColor(index, color) {
    gradient.update((stops) => {
      stops[index].color = color;
      return stops;
    });
    updateGradient();
  }

  function changePosition(index, position) {
    gradient.update((stops) => {
      stops[index].position = position;
      return stops;
    });
    updateGradient();
  }
</script>

<div class="gradient-editor">
  <!-- Display the gradient -->
  <div
    class="gradient-display"
    style={`background: linear-gradient(to right, ${$gradient
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ")});`}
  ></div>

  <!-- Controls for managing color stops -->
  {#each $gradient as stop, index}
    <div class="color-stop">
      <input
        type="color"
        value={stop.color}
        on:input={(e) => changeColor(index, e.target.value)}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={stop.position}
        on:input={(e) => changePosition(index, parseFloat(e.target.value))}
      />
      <!-- Trash icon for removing a stop -->
      <button on:click={() => removeStop(index)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .470-.53Zm5.058 0a.5.5 0 0 1 .470.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.470M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>
      </button>
    </div>
  {/each}

  <!-- Add a new color stop with "+" -->
  <button on:click={addStop}>+</button>
</div>

<style>
  .gradient-editor {
    padding: 10px;
  }

  .gradient-display {
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
  }

  .color-stop {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }

  .color-stop input[type='color'] {
    margin-right: 10px;
  }

  .color-stop input[type='range'] {
    width: 150px;
  }
</style>
