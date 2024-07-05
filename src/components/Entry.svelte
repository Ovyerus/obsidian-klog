<script lang="ts">
  import { type Entry as KlogEntry, Duration as KlogDuration } from "klog.js";

  import Duration from "./Duration.svelte";
  import Range from "./Range.svelte";
  import Summary from "./Summary.svelte";

  export let entry: KlogEntry;
  $: Value = entry.value instanceof KlogDuration ? Duration : Range;
  $: value = entry.value as any; // Types are a bit pooped and thinks there's an intersection somewhere instead of a union, for some reason...
</script>

<li class="klog-entry">
  <svelte:component this={Value} {value} />
  {#if entry.summary}
    <Summary position="entry" summary={entry.summary} />
  {/if}
</li>

<style>
  .klog-entry {
    display: flex;
    align-items: center;
  }
</style>
