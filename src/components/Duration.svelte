<script lang="ts">
  import type { Duration as KlogDuration } from "klog.js";
  import { moment } from "obsidian";

  import { formatMomentDuration } from "../lib";

  export let value: KlogDuration;

  $: momentDuration = moment.duration(value.toMinutes(), "minutes");
</script>

<time
  class="klog-duration klog-value"
  data-duration-sign={value.sign}
  datetime={momentDuration.toISOString()}
  aria-label="Duration of {formatMomentDuration(momentDuration)}"
>
  {value.toString()}
</time>

<style>
  .klog-duration {
    font-weight: bolder;
    color: var(--color-green);
  }

  .klog-duration[data-duration-sign="-"] {
    color: var(--color-red);
  }
</style>
