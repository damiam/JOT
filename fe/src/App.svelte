<script lang="ts">
  import search from "./lib/api/jsearch/search";
  import searchFilters from "./lib/api/jsearch/searchFilters";
  import Filter from "./lib/components/Filter.svelte";
  import JobOffer from "./lib/components/JobOffer.svelte";

  let searchTerm = "";
</script>

<main>
  <input bind:value={searchTerm} />
  {#if searchTerm.length > 0}
    {#await searchFilters({ query: searchTerm })}
      <p>Loading filters...</p>
    {:then { data }}
      <div class="flex flex-row">
        {#each Object.entries(data).filter(([, e]) => e.length > 0) as [filterName, filterEntries]}
          <Filter name={filterName} entries={filterEntries} />
        {/each}
      </div>
      {#await search({ query: searchTerm })}
        <p>Loading offers...</p>
      {:then { data }}
        <div class="flex flex-col">
          {#each data as jobOffer}
            <JobOffer {jobOffer} />
          {/each}
        </div>
      {:catch error}
        <p>Error: cannot load offers</p>
      {/await}
    {:catch error}
      <p>Error: cannot load filters</p>
    {/await}
  {/if}
</main>
