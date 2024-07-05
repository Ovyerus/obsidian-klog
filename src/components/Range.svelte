<script lang="ts">
  import type { Range as KlogRange } from "klog.js";

  export let value: KlogRange;
</script>

<span class="klog-range klog-value" class:klog-range-open={value.open}>
  {value.toString()}
</span>

<!-- TODO: settings to configure colour from theme variables -->
<style>
  .klog-range {
    font-weight: bolder;
    /* TODO: use accent instead, and derive colour for open */
    color: var(--color-purple);
  }

  .klog-range-open {
    color: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
    text-decoration: underline;
    text-decoration-style: dotted;
    text-underline-offset: 4px;
  }
</style>
