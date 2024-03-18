<script lang="ts">
  import type { FilterEntry } from "../api/jsearch/types";

  export let name: string;
  export let entries: FilterEntry[];

  let selected: string = "";
</script>

<div class="flex flex-row">
  <p>{name}</p>
  <select bind:value={selected}>
    {#each entries as entry}
      <option value={entry.value}>{entry.name}</option>
    {/each}
  </select>
</div>
