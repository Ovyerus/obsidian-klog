<script lang="ts">
  import { RangeDashFormat, type Range as KlogRange } from "klog.js";

  export let value: KlogRange;

  $: dash = value.format === RangeDashFormat.NoSpaces ? "-" : " - ";
  $: openIndicator = "?".repeat(value.openRangePlaceholderCharCount);
  $: label = value.end
    ? `From ${value.start.toString()} to ${value.end.toString()}`
    : `In progress since ${value.start.toString()}`;
</script>

<span
  class="klog-range klog-value"
  class:klog-range-open={value.open}
  aria-label={label}
>
  <time class="klog-range-start klog-time" datetime={value.start.toString()}>
    {value.start.toString()}
  </time>
  {dash}
  {#if value.end}
    <time class="klog-range-end klog-time" datetime={value.end.toString()}>
      {value.end.toString()}
    </time>
  {:else}
    <span class="klog-range-open-indicator">{openIndicator}</span>
  {/if}
</span>

<!-- TODO: define semantic CSS variables like a lot of other stuff. -->
<style>
  .klog-range {
    font-weight: bolder;
    color: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
  }

  .klog-range-open {
    text-decoration: underline;
    /* text-decoration-style: dashed; */
    text-underline-offset: 4px;
  }
</style>
