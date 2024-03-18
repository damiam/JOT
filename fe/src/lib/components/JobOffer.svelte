<script lang="ts">
  import type { Offer } from "../api/jsearch/search";

  export let jobOffer: Offer;
</script>

<div class="flex flex-row">
  <p>{jobOffer.employer_name}</p>
</div>
