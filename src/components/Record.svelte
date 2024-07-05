<script lang="ts">
  import { Record as KlogRecord } from "klog.js";

  import Summary from "./Summary.svelte";
  import Entry from "./Entry.svelte";

  export let record: KlogRecord;
</script>

<div class="klog-record">
  <!-- TODO: ARIA to read everything in plain English -->
  <h2 class="klog-record-header">
    <span class="klog-record-date">{record.dateString}</span>
    {#if record.shouldTotal}
      <span class="klog-record-should-total">
        (
        <span class="klog-record-should-total-value">
          {record.shouldTotal.toString()}!
        </span>
        )
      </span>
    {/if}
  </h2>

  {#if record.summary}
    <Summary position="record" summary={record.summary} />
  {/if}

  <ul class="klog-entries">
    {#each record.entries as entry}
      <Entry {entry} />
    {/each}
  </ul>
</div>

<style>
  .klog-entries {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .klog-record-should-total {
    display: inline-flex;
  }

  .klog-record-should-total-value {
    color: var(--color-yellow);
  }
</style>
