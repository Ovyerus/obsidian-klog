<script lang="ts">
  import type { Duration as KlogDuration } from "klog.js";

  export let value: KlogDuration;
</script>

<span class="klog-duration klog-value" data-duration-sign={value.sign}>
  {value.toString()}
</span>

<style>
  .klog-duration {
    font-weight: bolder;
    color: var(--color-green);
  }

  .klog-duration[data-duration-sign="-"] {
    color: var(--color-red);
  }
</style>
