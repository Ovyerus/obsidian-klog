<script lang="ts">
  import { type Entry as KlogEntry, Duration as KlogDuration } from "klog.js";

  import Duration from "./Duration.svelte";
  import Range from "./Range.svelte";
  import Summary from "./Summary.svelte";
  import { uid } from "uid";

  export let entry: KlogEntry;
  $: Value = entry.value instanceof KlogDuration ? Duration : Range;
  $: value = entry.value as any; // Types are a bit pooped and thinks there's an intersection somewhere instead of a union, for some reason...

  const id = uid();
</script>

<li class="klog-entry" aria-describedby={entry.summary && `${id}-summary`}>
  <svelte:component this={Value} {value} />
  {#if entry.summary}
    <Summary position="entry" summary={entry.summary} id="{id}-summary" />
  {/if}
</li>

<style>
  .klog-entry {
    display: flex;
    align-items: center;
  }
</style>
