<script lang="ts">
  import { Record as KlogRecord } from "klog.js";
  import { uid } from "uid";
  import { moment } from "obsidian";

  import Summary from "./Summary.svelte";
  import Entry from "./Entry.svelte";
  import { formatMomentDuration } from "../lib";

  export let record: KlogRecord;
  const id = uid();

  $: shouldTotalMoment = moment.duration(
    record.shouldTotal?.toMinutes() ?? 0,
    "minutes",
  );
</script>

<div
  class="klog-record"
  aria-labelledby="{id}-title"
  aria-describedby={record.summary && `${id}-summary`}
  role="listitem"
>
  <h2 class="klog-record-header" id="{id}-title">
    <time
      class="klog-record-date"
      datetime={record.date.toISOString().slice(0, 10)}
    >
      {record.dateString}
    </time>
    {#if record.shouldTotal}
      <!-- TODO: change wording when record sum meets the requirement? -->
      <time
        class="klog-record-should-total"
        aria-label="Should equal {formatMomentDuration(shouldTotalMoment)}"
        datetime={shouldTotalMoment?.toISOString()}
      >
        (
        <span class="klog-record-should-total-value">
          {record.shouldTotal.toString()}!
        </span>
        )
      </time>
    {/if}
  </h2>

  {#if record.summary}
    <Summary position="record" summary={record.summary} id="{id}-summary" />
  {/if}

  <ul class="klog-entries" aria-label="Entries">
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
