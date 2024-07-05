<script lang="ts">
  import type { MarkdownViewModeType as ViewMode } from "obsidian";
  import Viewer from "./Viewer.svelte";

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
    <Viewer {data} />
  {/if}
</div>

<style>
  .klog-wrapper {
    max-width: var(--file-line-width);
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .klog-content {
    white-space: pre-wrap;
  }

  .klog-content:not([contenteditable]) {
    user-select: text;
  }
</style>
