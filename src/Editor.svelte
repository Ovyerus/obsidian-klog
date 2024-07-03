<script lang="ts">
  import type { MarkdownViewModeType as ViewMode } from "obsidian";

  export let data: string;
  export let onChange: (newData: string) => void;
  export let viewMode: ViewMode = "preview";

  $: onChange(data);
</script>

<div class="klog-wrapper">
  {#if viewMode === "source"}
    <pre
      class="klog-content"
      contenteditable="true"
      bind:textContent={data}
      on:keydown={(e) => {
        if (e.key === "Enter") {
          document.execCommand("insertLineBreak");
          e.preventDefault();
        }
      }}>
    {data}
  </pre>
  {:else}
    <pre class="klog-content">{data}</pre>
  {/if}
</div>

<style>
  .klog-content {
    white-space: pre-wrap;
  }

  .klog-content:not([contenteditable]) {
    user-select: text;
  }
</style>
