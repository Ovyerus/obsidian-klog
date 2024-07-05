<script lang="ts">
  import type { Summary as KlogSummary, SummaryTag } from "klog.js";

  export let summary: KlogSummary;
  export let position: "record" | "entry";

  // TODO: setting to treat/view value tags as nested tags.
  // By default, it only treats them as the name.
  const tag = ({ name, value }: SummaryTag) =>
    `#${name}${value ? `=${value}` : ""}`;
</script>

<p class="klog-summary klog-{position}-summary">
  {#each summary.splitOnTags() as node}
    {#if node.type === "text"}
      <span class="klog-summary-text">{node.value}</span>
    {:else if node.type === "tag"}
      <!-- TODO: figure out how to integrate tags with Obsidian -->
      <span class="klog-summary-tag tag">{tag(node)}</span>
      <!-- <a
        class="klog-summary-tag tag"
        href="#{node.name}"
        target="_blank"
        rel="noopener"
      >
        {tag(node)}
      </a> -->
    {:else}
      <br />
    {/if}
  {/each}
</p>

<style>
  .klog-entry-summary {
    margin: 0;
    margin-inline-start: 1ch;
  }

  .klog-summary-tag {
    font-weight: bolder;
  }
</style>
